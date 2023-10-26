from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = ["first_name", "last_name", "employee_id", "id"]


class ServiceEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
        "purchased_here",
        "date_time",
        "id"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["import_href", "vin", "sold", "id"]
