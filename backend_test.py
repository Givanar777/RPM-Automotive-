import requests
import sys
import json
from datetime import datetime

class RPMAutomotiveAPITester:
    def __init__(self, base_url="https://5f980cdc-9948-4975-b45a-48f486f7763c.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def test_health_endpoint(self):
        """Test /api/health endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/health", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                expected_keys = ["status", "service"]
                has_keys = all(key in data for key in expected_keys)
                success = has_keys and data.get("status") == "ok"
                details = f"Status: {response.status_code}, Data: {data}" if success else f"Missing keys or wrong status: {data}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
            
            self.log_test("Health Endpoint", success, details)
            return success
            
        except Exception as e:
            self.log_test("Health Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_create_lead(self):
        """Test POST /api/leads endpoint"""
        test_lead = {
            "name": "Test Customer",
            "phone": "8315551234",
            "email": "test@example.com",
            "vehicle": "2020 Toyota Camry",
            "service_type": "Oil Change / Maintenance",
            "message": "Need oil change service",
            "source": "website"
        }
        
        try:
            response = requests.post(
                f"{self.base_url}/api/leads",
                json=test_lead,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            success = response.status_code == 200
            
            if success:
                data = response.json()
                expected_keys = ["success", "lead"]
                has_keys = all(key in data for key in expected_keys)
                success = has_keys and data.get("success") is True
                details = f"Status: {response.status_code}, Lead created with ID: {data.get('lead', {}).get('id', 'N/A')}" if success else f"Missing keys or wrong response: {data}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
            
            self.log_test("Create Lead", success, details)
            return success, test_lead["phone"] if success else None
            
        except Exception as e:
            self.log_test("Create Lead", False, f"Exception: {str(e)}")
            return False, None

    def test_get_leads(self):
        """Test GET /api/leads endpoint"""
        try:
            response = requests.get(f"{self.base_url}/api/leads", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                expected_keys = ["leads", "total"]
                has_keys = all(key in data for key in expected_keys)
                success = has_keys and isinstance(data.get("leads"), list)
                details = f"Status: {response.status_code}, Found {data.get('total', 0)} leads" if success else f"Missing keys or wrong format: {data}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
            
            self.log_test("Get Leads", success, details)
            return success
            
        except Exception as e:
            self.log_test("Get Leads", False, f"Exception: {str(e)}")
            return False

    def test_update_lead(self, phone):
        """Test PATCH /api/leads/{phone} endpoint"""
        if not phone:
            self.log_test("Update Lead", False, "No phone number provided")
            return False
            
        update_data = {
            "status": "contacted",
            "notes": "Customer contacted via phone"
        }
        
        try:
            response = requests.patch(
                f"{self.base_url}/api/leads/{phone}",
                json=update_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            success = response.status_code == 200
            
            if success:
                data = response.json()
                success = data.get("success") is True
                details = f"Status: {response.status_code}, Update successful" if success else f"Wrong response: {data}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
            
            self.log_test("Update Lead", success, details)
            return success
            
        except Exception as e:
            self.log_test("Update Lead", False, f"Exception: {str(e)}")
            return False

    def test_delete_lead(self, phone):
        """Test DELETE /api/leads/{phone} endpoint"""
        if not phone:
            self.log_test("Delete Lead", False, "No phone number provided")
            return False
            
        try:
            response = requests.delete(f"{self.base_url}/api/leads/{phone}", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                success = data.get("success") is True
                details = f"Status: {response.status_code}, Delete successful" if success else f"Wrong response: {data}"
            else:
                details = f"Status: {response.status_code}, Response: {response.text}"
            
            self.log_test("Delete Lead", success, details)
            return success
            
        except Exception as e:
            self.log_test("Delete Lead", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all backend API tests"""
        print("🚀 Starting RPM Automotive Backend API Tests")
        print(f"Testing against: {self.base_url}")
        print("=" * 60)
        
        # Test health endpoint
        health_ok = self.test_health_endpoint()
        
        # Test lead creation
        create_ok, test_phone = self.test_create_lead()
        
        # Test getting leads
        get_ok = self.test_get_leads()
        
        # Test updating lead (if creation was successful)
        update_ok = self.test_update_lead(test_phone) if test_phone else False
        
        # Test deleting lead (if creation was successful)
        delete_ok = self.test_delete_lead(test_phone) if test_phone else False
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All backend tests PASSED!")
            return True
        else:
            print("⚠️  Some backend tests FAILED!")
            failed_tests = [result for result in self.test_results if not result["success"]]
            print("\nFailed tests:")
            for test in failed_tests:
                print(f"  - {test['test']}: {test['details']}")
            return False

def main():
    tester = RPMAutomotiveAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())