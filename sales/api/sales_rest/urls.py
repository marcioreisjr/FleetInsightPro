from django.urls import path
from .views import api_list_salespeople, api_list_customers, api_list_sales, delete_customer, delete_salesperson, delete_sale

urlpatterns = [
    path('salespeople/', api_list_salespeople, name="api_list_salespeople"),
    path('salespeople/<int:id>/', delete_salesperson, name="delete_salesperson"),
    path('customers/', api_list_customers, name="api_list_customers"),
    path('customers/<int:id>/', delete_customer, name="delete_customer"),
    path('sales/', api_list_sales, name="api_list_sales"),
    path('sales/<int:id>/', delete_sale, name="delete_sale"),
]
