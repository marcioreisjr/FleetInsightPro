from django.views.decorators.http import require_http_methods
from .models import Technician, Appointment, AutomobileVO
from .encoders import TechnicianEncoder, ServiceEncoder, AutomobileVOEncoder
from django.http import JsonResponse
import json


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
        technicians = Technician.objects.all()
        return JsonResponse({"technicians": technicians},
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
