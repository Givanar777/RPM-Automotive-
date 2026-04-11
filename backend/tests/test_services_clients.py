"""
Backend API tests for RPM Automotive - Services and Clients endpoints
Tests CRUD operations for service records including the new mileage field
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://design-refresh-262.preview.emergentagent.com')

# Test credentials
ADMIN_EMAIL = "admin@rpm.com"
ADMIN_PASSWORD = "admin123"
TEST_CLIENT_PHONE = "8315551234"

class TestHealthAndAuth:
    """Health check and authentication tests"""
    
    def test_health_check(self):
        """Test API health endpoint"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        print("SUCCESS: Health check passed")
    
    def test_admin_login(self):
        """Test admin login and get token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200
        data = response.json()
        assert "token" in data
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        print(f"SUCCESS: Admin login successful, token received")
        return data["token"]
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "wrong@example.com",
            "password": "wrongpass"
        })
        assert response.status_code == 401
        print("SUCCESS: Invalid credentials correctly rejected")


class TestClientsAPI:
    """Client endpoint tests"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Get auth token before each test"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code == 200:
            self.token = response.json()["token"]
            self.headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.token}"
            }
        else:
            pytest.skip("Authentication failed")
    
    def test_get_clients_list(self):
        """Test GET /api/clients returns list of clients"""
        response = requests.get(f"{BASE_URL}/api/clients", headers=self.headers)
        assert response.status_code == 200
        data = response.json()
        assert "clients" in data
        assert isinstance(data["clients"], list)
        print(f"SUCCESS: Got {len(data['clients'])} clients")
    
    def test_get_client_by_phone(self):
        """Test GET /api/clients/{phone} returns client with service_records"""
        response = requests.get(f"{BASE_URL}/api/clients/{TEST_CLIENT_PHONE}", headers=self.headers)
        if response.status_code == 404:
            pytest.skip(f"Test client {TEST_CLIENT_PHONE} not found")
        assert response.status_code == 200
        data = response.json()
        assert "name" in data
        assert "phone" in data
        assert "service_records" in data
        assert isinstance(data["service_records"], list)
        print(f"SUCCESS: Got client {data['name']} with {len(data['service_records'])} service records")
    
    def test_update_client(self):
        """Test PATCH /api/clients/{phone} updates client info"""
        # First get the client
        response = requests.get(f"{BASE_URL}/api/clients/{TEST_CLIENT_PHONE}", headers=self.headers)
        if response.status_code == 404:
            pytest.skip(f"Test client {TEST_CLIENT_PHONE} not found")
        
        # Update notes
        update_data = {"notes": f"Updated via test at {time.time()}"}
        response = requests.patch(f"{BASE_URL}/api/clients/{TEST_CLIENT_PHONE}", 
                                  headers=self.headers, json=update_data)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print("SUCCESS: Client updated successfully")


class TestServicesAPI:
    """Service record endpoint tests with mileage field"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Get auth token before each test"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code == 200:
            self.token = response.json()["token"]
            self.headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.token}"
            }
        else:
            pytest.skip("Authentication failed")
    
    def test_create_service_record_with_mileage(self):
        """Test POST /api/services creates record with mileage field"""
        service_data = {
            "client_phone": TEST_CLIENT_PHONE,
            "vehicle": "2020 BMW 328i",
            "service_type": "TEST_Oil Change",
            "description": "Full synthetic oil change with filter",
            "date": "2026-01-10",
            "mileage": 45000,
            "cost": 89.99,
            "technician": "Test Tech",
            "notes": "Test service record"
        }
        response = requests.post(f"{BASE_URL}/api/services", headers=self.headers, json=service_data)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "record" in data
        record = data["record"]
        assert record["mileage"] == 45000
        assert record["cost"] == 89.99
        assert record["service_type"] == "TEST_Oil Change"
        assert "id" in record
        print(f"SUCCESS: Service record created with ID {record['id']} and mileage {record['mileage']}")
        return record["id"]
    
    def test_get_service_records(self):
        """Test GET /api/services returns list of records"""
        response = requests.get(f"{BASE_URL}/api/services", headers=self.headers)
        assert response.status_code == 200
        data = response.json()
        assert "records" in data
        assert isinstance(data["records"], list)
        print(f"SUCCESS: Got {len(data['records'])} service records")
    
    def test_get_service_records_by_client(self):
        """Test GET /api/services?client_phone={phone} filters by client"""
        response = requests.get(f"{BASE_URL}/api/services?client_phone={TEST_CLIENT_PHONE}", headers=self.headers)
        assert response.status_code == 200
        data = response.json()
        assert "records" in data
        # All records should be for the specified client
        for record in data["records"]:
            assert record["client_phone"] == TEST_CLIENT_PHONE
        print(f"SUCCESS: Got {len(data['records'])} service records for client {TEST_CLIENT_PHONE}")
    
    def test_update_service_record(self):
        """Test PATCH /api/services/{id} updates record including mileage"""
        # First create a record
        service_data = {
            "client_phone": TEST_CLIENT_PHONE,
            "vehicle": "2020 BMW 328i",
            "service_type": "TEST_Brake Inspection",
            "description": "Brake pad inspection",
            "date": "2026-01-11",
            "mileage": 46000,
            "cost": 50.00,
            "technician": "Test Tech",
            "notes": "To be updated"
        }
        create_response = requests.post(f"{BASE_URL}/api/services", headers=self.headers, json=service_data)
        assert create_response.status_code == 200
        record_id = create_response.json()["record"]["id"]
        
        # Update the record
        update_data = {
            "mileage": 46500,
            "cost": 75.00,
            "notes": "Updated - brake pads replaced"
        }
        response = requests.patch(f"{BASE_URL}/api/services/{record_id}", headers=self.headers, json=update_data)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print(f"SUCCESS: Service record {record_id} updated")
        
        # Verify update by getting client records
        verify_response = requests.get(f"{BASE_URL}/api/clients/{TEST_CLIENT_PHONE}", headers=self.headers)
        if verify_response.status_code == 200:
            records = verify_response.json().get("service_records", [])
            updated_record = next((r for r in records if r["id"] == record_id), None)
            if updated_record:
                assert updated_record["mileage"] == 46500
                assert updated_record["cost"] == 75.00
                print(f"SUCCESS: Verified mileage updated to {updated_record['mileage']}")
        
        return record_id
    
    def test_delete_service_record(self):
        """Test DELETE /api/services/{id} removes record"""
        # First create a record to delete
        service_data = {
            "client_phone": TEST_CLIENT_PHONE,
            "vehicle": "Test Vehicle",
            "service_type": "TEST_To Delete",
            "description": "This will be deleted",
            "date": "2026-01-12",
            "mileage": 10000,
            "cost": 10.00,
            "technician": "Test",
            "notes": "Delete me"
        }
        create_response = requests.post(f"{BASE_URL}/api/services", headers=self.headers, json=service_data)
        assert create_response.status_code == 200
        record_id = create_response.json()["record"]["id"]
        
        # Delete the record
        response = requests.delete(f"{BASE_URL}/api/services/{record_id}", headers=self.headers)
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print(f"SUCCESS: Service record {record_id} deleted")
        
        # Verify deletion - record should not exist in client's records
        verify_response = requests.get(f"{BASE_URL}/api/clients/{TEST_CLIENT_PHONE}", headers=self.headers)
        if verify_response.status_code == 200:
            records = verify_response.json().get("service_records", [])
            deleted_record = next((r for r in records if r["id"] == record_id), None)
            assert deleted_record is None
            print("SUCCESS: Verified record no longer exists")


class TestCleanup:
    """Cleanup test data"""
    
    @pytest.fixture(autouse=True)
    def setup(self):
        """Get auth token"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        if response.status_code == 200:
            self.token = response.json()["token"]
            self.headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.token}"
            }
        else:
            pytest.skip("Authentication failed")
    
    def test_cleanup_test_records(self):
        """Clean up TEST_ prefixed service records"""
        response = requests.get(f"{BASE_URL}/api/services", headers=self.headers)
        if response.status_code == 200:
            records = response.json().get("records", [])
            deleted_count = 0
            for record in records:
                if record.get("service_type", "").startswith("TEST_"):
                    del_response = requests.delete(f"{BASE_URL}/api/services/{record['id']}", headers=self.headers)
                    if del_response.status_code == 200:
                        deleted_count += 1
            print(f"SUCCESS: Cleaned up {deleted_count} test records")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
