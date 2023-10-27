import json
from service_rest.models import Technician, Appointment
from django.test import TransactionTestCase, Client


class Tests(TransactionTestCase):

    # ###TECHNICIANS ENDPOINTS
    def test_technicians_list(self):
        Technician.objects.create(first_name="first", last_name="last", employee_id=1111)

        client = Client()
        response = client.get("/api/technicians/")
        data = response.json()

        self.assertEqual(response.status_code, 200, msg="Did not get a 200 OK for list salespeople.")
        self.assertTrue('technicians' in data, msg="Did not give response with salespeople field.")
        self.assertEqual(len(data['technicians']), 1, msg="Did not return correct number of salespeople.")

    def test_technician_create(self):
        client = Client()
        body = {
            "first_name": "first",
            "last_name": "last",
            "employee_id": 1
        }
        response = client.post("/api/technicians/", json.dumps(body), content_type='application/json')
        data = response.json()

        self.assertEqual(response.status_code, 200, msg="Did not get a 200 OK for the path projects/")

    def test_technician_delete(self):
        technician = Technician.objects.create(first_name="first", last_name="last", employee_id=1)

        client = Client()
        response1 = client.delete(f"/api/technicians/{technician.id}/")
        response2 = client.delete(f"/api/technicians/{technician.employee_id}/")
        okay_response = response1.status_code == 200 or response2.status_code == 200
        self.assertTrue(okay_response, msg="Did not get a 200 OK for technicians delete.")

        response = client.delete(f"/api/technicians/{technician.id}/")
        self.assertTrue(response.status_code == 404 or response.status_code == 400, msg="Did not get a 404 OK technicians delete of an unknown id.")

    ####APPOINTMENT ENDPOINTS
    def test_appointment_list(self):
        tech = Technician.objects.create(first_name="first", last_name="last", employee_id=1)
        Appointment.objects.create(date_time="2023-04-20T14:39:00.000Z", reason="reason code 1", vin="2222", customer="Warren Longmire", technician=tech)

        client = Client()
        response = client.get("/api/appointments/")
        data = response.json()

        self.assertEqual(response.status_code, 200, msg="Did not get a 200 OK for list appointment.")
        self.assertTrue('appointments' in data, msg="Did not give response with appointment field.")
        self.assertEqual(len(data['appointments']), 1, msg="Did not return correct number of appointment.")

    def test_appointment_create(self):
        tech = Technician.objects.create(first_name="first", last_name="last", employee_id=1)

        client = Client()
        body = {
            "date_time": "2023-04-20T14:39:00.000Z",
            "reason": "broken glass. everywhere.",
            "vin": "2222",
            "customer": "Warren Longmire",
            "technician": f"{tech.id}",
        }

        response1 = client.post("/api/appointments/", json.dumps(body), content_type='application/json')
        body["technician"] = f"{tech.employee_id}"
        response2 = client.post("/api/appointments/", json.dumps(body), content_type='application/json')
        okay_response = response1.status_code == 200 or response2.status_code == 200
        self.assertTrue(okay_response, msg="Did not get a 200 OK for the path projects/")

        body["technician"] = "3"
        response = client.post("/api/appointments/", json.dumps(body), content_type='application/json')
        self.assertTrue(response.status_code == 404 or response.status_code == 400, msg="Did not get a 400 appointments create with an unknown tech.")

    def test_appointment_delete(self):
        tech = Technician.objects.create(first_name="first", last_name="last", employee_id=1)
        appointment = Appointment.objects.create(date_time="2023-04-20T14:39:00.000Z", reason="reason code 1", vin="2222", customer="Warren Longmire", technician=tech)

        client = Client()
        response = client.delete(f"/api/appointments/{appointment.id}/")
        self.assertEqual(response.status_code, 200, msg="Did not get a 200 OK for appointment delete.")

        response = client.delete(f"/api/appointments/{appointment.id}/")
        self.assertTrue(response.status_code == 404 or response.status_code == 400, msg="Did not get a 400 delete an unknown appointment.")

    def test_appointment_cancel(self):
        tech = Technician.objects.create(first_name="first", last_name="last", employee_id=1)
        appointment = Appointment.objects.create(date_time="2023-04-20T14:39:00.000Z", reason="reason code 1", vin="2222", customer="Warren Longmire", technician=tech)

        client = Client()
        response = client.put(f"/api/appointments/{appointment.id}/cancel/")
        self.assertEqual(response.status_code, 200, msg="Did not get a 200 OK for appointment PUT.")
        self.assertEqual(response.json()["status"], "canceled", msg="Did not get change status to canceled.")

    def test_appointment_finish(self):
        tech = Technician.objects.create(first_name="first", last_name="last", employee_id=1)
        appointment = Appointment.objects.create(date_time="2023-04-20T14:39:00.000Z", reason="reason code 1", vin="2222", customer="Warren Longmire", technician=tech)

        client = Client()
        response = client.put(f"/api/appointments/{appointment.id}/finish/")
        self.assertEqual(response.status_code, 200, msg="Did not get a 200 OK for appointment PUT.")
        self.assertEqual(response.json()["status"], "finished", msg="Did not get change status to finished.")
