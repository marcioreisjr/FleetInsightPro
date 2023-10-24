from django.views.decorators.http import require_http_methods
from .models import Technician, Appointment, AutomobileVO
from .encoders import TechnicianEncoder, ServiceEncoder, AutomobileVOEncoder
from django.http import JsonResponse, HttpResponseBadRequest
import json


"""
Views to be implemented:
+-----------------------------+-------+----------------------------------------+
| Action                      | Method| URL                                    |
+-----------------------------+-------+----------------------------------------+
| List technicians            | GET   | http://localhost:8080/api/technicians/ |
| Create a technician         | POST  | http://localhost:8080/api/technicians/ |
| Delete a specific technician| DELETE| http://localhost:8080/api/technicians/:id/ |
| List appointments           | GET   | http://localhost:8080/api/appointments/ |
| Create an appointment       | POST  | http://localhost:8080/api/appointments/ |
| Delete an appointment       | DELETE| http://localhost:8080/api/appointments/:id/ |
| Set appointment status to "canceled"| PUT| http://localhost:8080/api/appointments/:id/cancel/ |
| Set appointment status to "finished"| PUT| http://localhost:8080/api/appointments/:id/finish/ |
+-----------------------------+-------+----------------------------------------+
"""


@require_http_methods(["GET", "POST"])
def api_technician_list(request):
    """
    Create a new technician or list all technicians
    Create/list from a JSON payload as follows:
    {
        "first_name": "John",
        "last_name": "Doe",
        "employee_id": "1234"
    }
    """
    if request.method == "GET":
        technician = Technician.objects.all()
        return JsonResponse({"technician": technician},
                            encoder=TechnicianEncoder,
                            safe=False)
    elif request.method == "POST":
        try:
            data = json.loads(request.body)
            technician = Technician.objects.create(**data)
            return JsonResponse({"technician": technician},
                                encoder=TechnicianEncoder,
                                safe=False)
        except Exception as e:
            response = JsonResponse({"message": str(e)})
            response.status_code = 400
            return response


@require_http_methods(["GET", "DELETE"])
def api_technician_details(request, id):
    """
    Create a new technician or list all technicians
    Create/list from a JSON payload as follows:
    {
        "first_name": "John",
        "last_name": "Doe",
        "employee_id": "1234"
    }
    """
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=id)
            return JsonResponse(technician,
                                encoder=TechnicianEncoder,
                                safe=False)
        except:  # noqa
            response = JsonResponse({"message": "Technician not found"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            technician = Technician.objects.get(id=id)
            technician.delete()
            return JsonResponse(technician,
                                encoder=TechnicianEncoder,
                                safe=False)
        except:  # noqa
            response = JsonResponse({"message": "Technician not found"})
            response.status_code = 404
            return response
