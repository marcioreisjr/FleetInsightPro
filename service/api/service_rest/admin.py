from django.contrib import admin
from .models import Technician, AutomobileVO, Appointment

# Register your models here.
@admin.register(Technician)
class Technician(admin.ModelAdmin):
    list_display = (
        "first_name",
        "last_name",
        "employee_id"
    )

@admin.register(AutomobileVO)
class AutomobileVO(admin.ModelAdmin):
    list_display = (
        "import_href",
        "vin",
        "sold"
    )

@admin.register(Appointment)
class Appointment(admin.ModelAdmin):
    list_display = (
        "reason",
        "status",
        "customer",
        "technician",
        "purchased_here",
        "date_time"
    )
