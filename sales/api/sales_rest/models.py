from django.db import models

# Create your models here.

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, blank=True, null=True, unique=True)
    vin = models.CharField(max_length=50, unique=True, null=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
            return self.vin

class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

    def __str__(self):
        return self.employee_id

class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    phone_number = models.CharField(max_length=100, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Sale(models.Model):
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    price = models.PositiveIntegerField()

    def __str__(self):
         return f"{self.customer.first_name} {self.customer.last_name} - {self.automobile.vin} - {self.price}"
