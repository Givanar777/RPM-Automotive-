"""
Password Reset Flow Tests - Iteration 6
Tests for forgot-password, verify-reset-token, and reset-password endpoints
"""
import pytest
import requests
import os
from pymongo import MongoClient
from datetime import datetime, timezone, timedelta

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.environ.get('DB_NAME', 'rpm_automotive')

# Test credentials
ADMIN_EMAIL = "admin@rpm.com"
ADMIN_PASSWORD = "admin123"
TEST_NEW_PASSWORD = "newpassword123"


@pytest.fixture(scope="module")
def mongo_client():
    """MongoDB client for direct DB access to read reset tokens"""
    client = MongoClient(MONGO_URL)
    yield client[DB_NAME]
    client.close()


@pytest.fixture(scope="module")
def api_session():
    """Shared requests session"""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


class TestHealthCheck:
    """Basic health check to ensure API is running"""
    
    def test_health_endpoint(self, api_session):
        response = api_session.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        print("✓ Health check passed")


class TestForgotPassword:
    """Tests for POST /api/auth/forgot-password"""
    
    def test_forgot_password_valid_email(self, api_session, mongo_client):
        """Test forgot-password with valid admin email creates reset token"""
        # Clean up any existing reset tokens for admin
        mongo_client.password_resets.delete_many({"email": ADMIN_EMAIL})
        
        response = api_session.post(
            f"{BASE_URL}/api/auth/forgot-password",
            json={"email": ADMIN_EMAIL}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "message" in data
        print(f"✓ Forgot password response: {data['message']}")
        
        # Verify token was created in DB
        reset_record = mongo_client.password_resets.find_one({"email": ADMIN_EMAIL})
        assert reset_record is not None, "Reset token should be created in DB"
        assert "token" in reset_record
        assert "expires_at" in reset_record
        print(f"✓ Reset token created in DB for {ADMIN_EMAIL}")
    
    def test_forgot_password_nonexistent_email(self, api_session):
        """Test forgot-password returns success even for non-existent email (no enumeration)"""
        response = api_session.post(
            f"{BASE_URL}/api/auth/forgot-password",
            json={"email": "nonexistent@example.com"}
        )
        
        # Should return 200 to prevent email enumeration
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print("✓ Non-existent email returns success (no enumeration)")
    
    def test_forgot_password_invalid_email_format(self, api_session):
        """Test forgot-password with invalid email format"""
        response = api_session.post(
            f"{BASE_URL}/api/auth/forgot-password",
            json={"email": "not-an-email"}
        )
        # FastAPI/Pydantic should still accept it (no strict validation on email format)
        # The endpoint should handle it gracefully
        assert response.status_code in [200, 422]
        print("✓ Invalid email format handled")


class TestVerifyResetToken:
    """Tests for GET /api/auth/verify-reset-token"""
    
    def test_verify_valid_token(self, api_session, mongo_client):
        """Test verify-reset-token with valid token returns email"""
        # First create a reset token
        mongo_client.password_resets.delete_many({"email": ADMIN_EMAIL})
        api_session.post(f"{BASE_URL}/api/auth/forgot-password", json={"email": ADMIN_EMAIL})
        
        # Get the token from DB
        reset_record = mongo_client.password_resets.find_one({"email": ADMIN_EMAIL})
        assert reset_record is not None
        token = reset_record["token"]
        
        # Verify the token
        response = api_session.get(f"{BASE_URL}/api/auth/verify-reset-token?token={token}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] == True
        assert data["email"] == ADMIN_EMAIL
        print(f"✓ Valid token verified, email: {data['email']}")
    
    def test_verify_invalid_token(self, api_session):
        """Test verify-reset-token with invalid token returns 400"""
        response = api_session.get(f"{BASE_URL}/api/auth/verify-reset-token?token=invalid_token_12345")
        
        assert response.status_code == 400
        data = response.json()
        assert "detail" in data
        print(f"✓ Invalid token rejected: {data['detail']}")
    
    def test_verify_expired_token(self, api_session, mongo_client):
        """Test verify-reset-token with expired token returns 400"""
        # Create an expired token directly in DB
        expired_token = "expired_test_token_12345"
        mongo_client.password_resets.delete_many({"token": expired_token})
        mongo_client.password_resets.insert_one({
            "email": "test@example.com",
            "token": expired_token,
            "created_at": (datetime.now(timezone.utc) - timedelta(hours=2)).isoformat(),
            "expires_at": (datetime.now(timezone.utc) - timedelta(hours=1)).isoformat(),
        })
        
        response = api_session.get(f"{BASE_URL}/api/auth/verify-reset-token?token={expired_token}")
        
        assert response.status_code == 400
        data = response.json()
        assert "expired" in data["detail"].lower() or "invalid" in data["detail"].lower()
        print(f"✓ Expired token rejected: {data['detail']}")
        
        # Cleanup
        mongo_client.password_resets.delete_many({"token": expired_token})


class TestResetPassword:
    """Tests for POST /api/auth/reset-password"""
    
    def test_reset_password_success(self, api_session, mongo_client):
        """Test reset-password with valid token updates password"""
        # Create a fresh reset token
        mongo_client.password_resets.delete_many({"email": ADMIN_EMAIL})
        api_session.post(f"{BASE_URL}/api/auth/forgot-password", json={"email": ADMIN_EMAIL})
        
        # Get the token from DB
        reset_record = mongo_client.password_resets.find_one({"email": ADMIN_EMAIL})
        token = reset_record["token"]
        
        # Reset password
        response = api_session.post(
            f"{BASE_URL}/api/auth/reset-password",
            json={"token": token, "password": TEST_NEW_PASSWORD}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print(f"✓ Password reset successful: {data['message']}")
        
        # Verify token is deleted after use
        reset_record_after = mongo_client.password_resets.find_one({"email": ADMIN_EMAIL})
        assert reset_record_after is None, "Token should be deleted after successful reset"
        print("✓ Reset token deleted after use")
    
    def test_login_with_new_password(self, api_session):
        """Test login with new password after reset"""
        response = api_session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": TEST_NEW_PASSWORD}
        )
        
        assert response.status_code == 200
        data = response.json()
        assert "token" in data
        assert data["email"] == ADMIN_EMAIL
        print(f"✓ Login with new password successful")
    
    def test_reset_password_invalid_token(self, api_session):
        """Test reset-password with invalid token returns 400"""
        response = api_session.post(
            f"{BASE_URL}/api/auth/reset-password",
            json={"token": "invalid_token_xyz", "password": "newpassword123"}
        )
        
        assert response.status_code == 400
        data = response.json()
        assert "detail" in data
        print(f"✓ Invalid token rejected: {data['detail']}")
    
    def test_reset_password_short_password(self, api_session, mongo_client):
        """Test reset-password rejects passwords shorter than 6 chars"""
        # Create a fresh reset token
        mongo_client.password_resets.delete_many({"email": ADMIN_EMAIL})
        api_session.post(f"{BASE_URL}/api/auth/forgot-password", json={"email": ADMIN_EMAIL})
        
        # Get the token from DB
        reset_record = mongo_client.password_resets.find_one({"email": ADMIN_EMAIL})
        token = reset_record["token"]
        
        # Try to reset with short password
        response = api_session.post(
            f"{BASE_URL}/api/auth/reset-password",
            json={"token": token, "password": "12345"}  # Only 5 chars
        )
        
        assert response.status_code == 400
        data = response.json()
        assert "6 characters" in data["detail"]
        print(f"✓ Short password rejected: {data['detail']}")
    
    def test_token_cannot_be_reused(self, api_session, mongo_client):
        """Test that reset token cannot be reused after successful reset"""
        # Create a fresh reset token
        mongo_client.password_resets.delete_many({"email": ADMIN_EMAIL})
        api_session.post(f"{BASE_URL}/api/auth/forgot-password", json={"email": ADMIN_EMAIL})
        
        # Get the token from DB
        reset_record = mongo_client.password_resets.find_one({"email": ADMIN_EMAIL})
        token = reset_record["token"]
        
        # First reset should succeed
        response1 = api_session.post(
            f"{BASE_URL}/api/auth/reset-password",
            json={"token": token, "password": "firstnewpass123"}
        )
        assert response1.status_code == 200
        print("✓ First reset succeeded")
        
        # Second reset with same token should fail
        response2 = api_session.post(
            f"{BASE_URL}/api/auth/reset-password",
            json={"token": token, "password": "secondnewpass123"}
        )
        assert response2.status_code == 400
        print("✓ Token reuse rejected")


class TestCleanup:
    """Cleanup and restore original admin password"""
    
    def test_restore_admin_password(self, api_session, mongo_client):
        """Restore admin password to original value"""
        # Create a reset token
        mongo_client.password_resets.delete_many({"email": ADMIN_EMAIL})
        api_session.post(f"{BASE_URL}/api/auth/forgot-password", json={"email": ADMIN_EMAIL})
        
        # Get the token
        reset_record = mongo_client.password_resets.find_one({"email": ADMIN_EMAIL})
        if reset_record:
            token = reset_record["token"]
            
            # Reset to original password
            response = api_session.post(
                f"{BASE_URL}/api/auth/reset-password",
                json={"token": token, "password": ADMIN_PASSWORD}
            )
            assert response.status_code == 200
            print(f"✓ Admin password restored to original: {ADMIN_PASSWORD}")
        
        # Verify login with original password works
        response = api_session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        )
        assert response.status_code == 200
        print("✓ Login with original password verified")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
