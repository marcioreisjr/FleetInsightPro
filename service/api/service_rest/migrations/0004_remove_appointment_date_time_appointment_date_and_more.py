# Generated by Django 4.0.3 on 2023-10-25 04:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0003_automobilevo_import_href'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='appointment',
            name='date_time',
        ),
        migrations.AddField(
            model_name='appointment',
            name='date',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='appointment',
            name='time',
            field=models.CharField(max_length=50, null=True),
        ),
    ]
