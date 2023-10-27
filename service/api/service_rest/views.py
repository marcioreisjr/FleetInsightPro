from django.views.decorators.http import require_http_methods
from .models import Technician, Appointment, AutomobileVO
from .encoders import TechnicianEncoder, ServiceEncoder
from django.http import JsonResponse
import json


@require_http_methods(["GET", "POST"])
def api_appointment_list(request):
    """
    Create a new appointment or list all appointments from a JSON payload as
    follows:
    {
        "reason": "Oil change",
        "status": "active",  # active, canceled, finished -- for GET only
        "date": "10/10/2023",
        "time": "13:30",
        "vin": "ZZZ123...",
        "customer": "Charles Darwin",
        "technician": {Technician},
        "purchased_here",  # for GET only
        "id"  # for GET only
    }
    """
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse({"appointments": appointments},
                            encoder=ServiceEncoder,
                            safe=False)
    elif request.method == "POST":
        try:
            data = json.loads(request.body)
            technician = Technician.objects.get(
                employee_id=data["technician"])
            data["technician"] = technician
            all_vins = AutomobileVO.objects.all().values_list('vin', flat=True)
            data["purchased_here"] = True if data["vin"] in all_vins else False
            data["status"] = "created"
            appointment = Appointment.objects.create(**data)
            return JsonResponse({"appointment": appointment},
                                encoder=ServiceEncoder,
                                safe=False)
        except Exception as e:
            response = JsonResponse({"message": str(e)})
            response.status_code = 400
            return response


@require_http_methods(["GET", "PUT", "DELETE"])
def api_appointment_details(request, id):
    """
    GET - get appointment details
    PUT - update appointment details
    DELETE - delete appointment
    """
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=id)
            return JsonResponse(appointment,
                                encoder=ServiceEncoder,
                                safe=False)
        except Exception as e:
            response = JsonResponse({"message": str(e)})
            response.status_code = 400
            return response
    elif request.method == "PUT":
        try:
            data = json.loads(request.body)
            appointment = Appointment.objects.get(id=id)
            for key, value in data.items():
                if key == "technician":
                    technician = Technician.objects.get(employee_id=value)
                    appointment.technician = technician
                else:
                    setattr(appointment, key, value)
            appointment.save()
            return JsonResponse({"appointment": appointment},
                                encoder=ServiceEncoder,
                                safe=False)
        except Exception as e:
            response = JsonResponse({"message": str(e)})
            response.status_code = 400
            return response
    elif request.method == "DELETE":
        try:
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return JsonResponse({"appointment": appointment},
                                encoder=ServiceEncoder,
                                safe=False)
        except Exception as e:
            response = JsonResponse({"message": str(e)})
            response.status_code = 400
            return response


@require_http_methods(["PUT"])
def api_appointment_cancel(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        if appointment.status != "created":
            raise Exception(
                f"Cannot cancel a {appointment.status.lower()} appointment")
        appointment.status = "canceled"
        appointment.save()
        return JsonResponse({"appointment": appointment},
                            encoder=ServiceEncoder,
                            safe=False)
    except Exception as e:
        response = JsonResponse({
            "message": str(e),
            "status": "canceled",
        })
        response.status_code = 200
        return response


@require_http_methods(["PUT"])
def api_appointment_finish(request, id):
    try:
        appointment = Appointment.objects.get(id=id)
        if appointment.status != "created":
            raise Exception(
                f"Cannot finish a {appointment.status.lower()} appointment")
        appointment.status = "finished"
        appointment.save()
        return JsonResponse({"appointment": appointment},
                            encoder=ServiceEncoder,
                            safe=False)
    except Exception as e:
        response = JsonResponse({
            "message": str(e),
            "status": "finished",
        })
        response.status_code = 200
        return response


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
            upcoming = Technician.objects.filter(
                employee_id=data["employee_id"])
            if upcoming.exists():
                raise Exception("Technician ID already exists")
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
