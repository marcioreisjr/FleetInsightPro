# Generated by Django 4.0.3 on 2023-10-24 20:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='appointment',
            old_name='vim',
            new_name='vin',
        ),
    ]
