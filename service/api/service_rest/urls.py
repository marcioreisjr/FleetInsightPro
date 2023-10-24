from django.urls import path
from .views import api_technician_list, api_technician_details


urlpatterns = [
    path('technicians/', api_technician_list, name='api_technician_list'),
    path('technicians/<int:id>/', api_technician_details,
         name='api_technician_details'),
]
