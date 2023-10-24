from django.urls import path
from .views import api_list_salespeople, api_delete_salesperson

urlpatterns = [
    path('salespeople/', api_list_salespeople, name="api_list_salespeople"),
    path('salespeople/<int:id>/', api_list_salespeople, name="api_list_salespeople"),
    path('salespeople/<int:id>/', api_delete_salesperson, name="api_delete_salesperson")
]
