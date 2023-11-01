from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, Salesperson, Customer, Sale

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
        "sold",
        "id"
    ]

# View List of Salespeople, Create a Salesperson, Delete a Salesperson

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
        try:
            content = json.loads(request.body)
            newSalesperson = Salesperson.objects.filter(
                employee_id=content["employee_id"]
            )
            if newSalesperson.exists():
                raise Exception("Salesperson ID already exists")
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                {"salesperson": salesperson},
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Exception as e:
            response = JsonResponse({"message": str(e)})
            response.status_code=400
            return response

@require_http_methods("DELETE")
def delete_salesperson(request, id):
    try:
        salesperson = Salesperson.objects.get(id=id)
        salesperson.delete()
        return JsonResponse(
            {"message": "salesperson deleted successfully"},
            status = 200,
        )
    except Salesperson.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid customer ID"},
            status = 404,
        )

# View List of Customers, Create a Customer, Delete a Customer

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
        customers = Customer.objects.create(**content)
        return JsonResponse(
            customers,
            encoder=CustomerEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def delete_customer(request, id):
    if request.method == "DELETE":
        try:
            customer = Customer.objects.get(id=id)
            customer.delete()
            return JsonResponse(
                {"message": "customer deleted successfully"},
                status = 200,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer ID"},
                status = 404,
            )

# View List of Sales, Create a Sale, Delete a Sale

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "salesperson",
        "customer",
        "automobile",
        "price",
        "id"
    ]
    encoders = {
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder,
            safe=False
        )
    else: # request is "POST"
        try:
            content = json.loads(request.body)
            vin = content['automobile']
            automobile = AutomobileVO.objects.get(vin=vin)
            content['automobile'] = automobile
            salesperson_id = content['salesperson']
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content['salesperson'] = salesperson
            customer_id = content['customer']
            customer = Customer.objects.get(id=customer_id)
            content['customer'] = customer
            sale = Sale.objects.create(**content)
            return JsonResponse(
                {"sale": sale},
                encoder=SaleEncoder,
                safe=False,
            )
        except Exception as e:
            response = JsonResponse({"message": str(e)})
            response.status_code = 400
            return response

@require_http_methods(["DELETE"])
def delete_sale(request, id):
    try:
        sale = Sale.objects.get(id=id)
        sale.delete()
        return JsonResponse(
            {"message": "sale deleted successfully"},
            status = 200,
        )
    except Sale.DoesNotExist:
        return JsonResponse(
            {"message": "Invalid sale ID"},
            status = 404,
        )
