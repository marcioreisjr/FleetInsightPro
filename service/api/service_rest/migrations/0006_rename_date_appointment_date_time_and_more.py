# Generated by Django 4.0.3 on 2023-10-26 01:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0005_appointment_purchased_here'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appointment',
            old_name='date',
            new_name='date_time',
        ),
        migrations.RemoveField(
            model_name='appointment',
            name='time',
        ),
    ]