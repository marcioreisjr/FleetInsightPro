from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, Salesperson, Customer, Sale

# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
    ]

class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]

@require_http_methods(["GET", "POST"])
def api_list_salespeople(request, id=None):
    if request.method == "GET":
        if id is not None:
            salespeople = Salesperson.objects.filter(id=id)
        else:
            salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        print('content:', content)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id"
    ]

@require_http_methods(["GET", "POST"])
def api_list_customers(request, id=None):
    if request.method == "GET":
        if id is not None:
            customers = Customer.objects.filter(id=id)
        else:
            customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        print('content:', content)
        customers = Customer.objects.create(**content)
        return JsonResponse(
            customers,
            encoder=CustomerEncoder,
            safe=False,
        )

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "salesperson",
        "customer",
        "price",
        "id"
    ]

@require_http_methods(["GET", "POST"])
def api_list_sales(request, id=None):
    if request.method == "GET":
        if id is not None:
            sales = Sale.objects.filter(id=id)
        else:
            sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        print('content:', content)
        salesperson = Sale.objects.create(**content)
        return JsonResponse(
            sales,
            encoder=SaleEncoder,
            safe=False,
        )


# @require_http_methods(["DELETE"])
# def api_delete_salesperson(request, id):
#     print('test-api_delete_salesperson')
#     if request.method == "DELETE":
#         content = json.loads(request.body)
#         print('content:', content)
#         try:
#             id = content["id"]
#             salesperson = Salesperson.objects.get(id=id)
#         except Salesperson.DoesNotExist:
#             return JsonResponse(
#                 {"message": "Invalid salesperson ID"},
#                 status=400,
#             )
#         salesperson.delete()
#         return JsonResponse(
#             {"message": "Salesperson deleted successfully"}
#         )

# @require_http_methods(["DELETE"])
# def api_delete_salesperson(request, id):
#     try:
#         salesperson = Salesperson.objects.get(id=id)
#         salesperson.delete()
#         return JsonResponse(
#             {"message": "Salesperson deleted successfully"}
#         )
#     except Salesperson.DoesNotExist:
#         return JsonResponse(
#             {"message": "Invalid salesperson ID"},
#             status=400,
#         )
