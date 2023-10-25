from django.urls import path
from .views import api_technician_list, api_technician_details, \
    api_appointment_list, api_appointment_details, api_appointment_cancel, \
    api_appointment_finish


urlpatterns = [
    path('technicians/', api_technician_list, name='api_technician_list'),
    path('technicians/<int:id>/', api_technician_details,
         name='api_technician_details'),
    path('appointments/', api_appointment_list, name='api_appointment_list'),
    path('appointments/<int:id>/', api_appointment_details,
         name='api_appointment_details'),
    path('appointments/<int:id>/cancel/', api_appointment_cancel,
         name='api_appointment_cancel'),
    path('appointments/<int:id>/finish/', api_appointment_finish,
         name='api_appointment_finish'),
]

# http://localhost:8080/api/appointments/:id/cancel/
# http://localhost:8080/api/appointments/:id/finish/
