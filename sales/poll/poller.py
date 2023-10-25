import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO

def get_automobile():
    """
    This function gets the automobiles from the inventory-api and updates the AutomobileVO table.
    """
    response = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles/")
    content = json.loads(response.content)
    print('#########-test_1-########')
    # print(f'content: {content}')
    for automobile in content["automobiles"]:
        # print("in get_bin:", bin)
        AutomobileVO.objects.update_or_create(
            defaults={
                "vin": automobile["vin"],
                "sold": automobile["sold"],
            },
        )

def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            # Do not copy entire file
            get_automobile()
            print('#########-test_2-########')
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(60)


if __name__ == "__main__":
    poll()
