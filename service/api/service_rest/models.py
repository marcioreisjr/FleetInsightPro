from django.db import models

# Service model


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class AutomobileVO(models.Model):
    import_href = models.CharField(
        max_length=200, blank=True, null=True, unique=True)
    vin = models.CharField(max_length=50)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.vin}"


class Appointment(models.Model):
    reason = models.CharField(max_length=100)
    # created", "canceled", or "finished
    status = models.CharField(max_length=50)
    vin = models.CharField(max_length=50)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.SET("Former Technician"))
    purchased_here = models.BooleanField(default=False)
    date_time = models.CharField(max_length=50, null=True)

    def __str__(self):
        return f"{self.id}: {self.customer} - {self.date_time} - {self.status}"
