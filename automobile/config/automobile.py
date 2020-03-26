from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
                        "label": _("Master"),
                        "items": [
                                {
                                        "type": "doctype",
                                        "name": "Insurance Company",
                                        "label": "Insurance Company",
                                        "description": _("Insurance Company"),
                                        "onboard": 1
                                },
				{
                                        "type": "doctype",
                                        "name": "Bank",
                                        "label": "Bank",
                                        "description": _("Bank"),
                                        "onboard": 1
                                },
				{
                                        "type": "doctype",
                                        "name": "Serial No",
                                        "label": "Chassis Number",
                                        "description": _("Serial No"),
                                        "onboard": 1
                                }
                        ]
                },
		{
                        "label": _("Scheme Master"),
                        "items": [
                                {
                                        "type": "doctype",
                                        "name": "Manufacturer Scheme Master",
                                        "label": "Manufacturer Scheme Master",
                                        "description": _("Manufacturer Scheme Master"),
                                        "onboard": 1
                                },
				{
                                        "type": "doctype",
                                        "name": "OEM Claim Management",
                                        "label": "OEM Claim Management",
                                        "description": _("OEM Claim Management"),
                                        "onboard": 1
				},
				{
                                        "type": "doctype",
                                        "name": "Received OEM Claim",
                                        "label": "Received OEM Claim",
                                        "description": _("Received OEM Claim"),
                                        "onboard": 1
                                }
                        ]
                },
		{
                        "label": _("Inventory Master"),
                        "items": [
                                {
                                        "type": "doctype",
                                        "name": "Item",
                                        "label": "Car List",
                                        "description": _("Item"),
                                        "onboard": 1
                                },
                                {
                                        "type": "doctype",
                                        "name": "Item Price",
                                        "label": "Monthly Car Price",
                                        "description": _("Item Price"),
                                        "onboard": 1
                                }
                        ]
                },
		{
                        "label": _("Transaction"),
                        "items": [
                                {
                                        "type": "doctype",
                                        "name": "Sales Order",
                                        "label": "Booking",
                                        "description": _("Sales Order"),
                                        "onboard": 1
                                },
				{
                                        "type": "doctype",
                                        "name": "Sales Invoice",
                                        "label": "Invoice",
                                        "description": _("Sales Invoice"),
                                        "onboard": 1
                                },
				{
                                        "type": "doctype",
                                        "name": "Delivery Note",
                                        "label": "Gate Pass",
                                        "description": _("Delivery Note"),
                                        "onboard": 1
                                }
                        ]
                },
		{
			"label": _("Reports"),
			"items": [
				{
                                        "type": "report",
                                        "is_query_report": True,
                                        "name": "Price List",
                                        "doctype": "Item Price"
                                },
				{
                                        "type": "report",
                                        "is_query_report": True,
                                        "name": "Customer Price List",
                                        "doctype": "Item Price"
                                },
				{
					"type": "report",
					"is_query_report": True,
					"name": "OEM Claim Management Summery",
					"doctype": "OEM Claim Management"
				},
				{
                                        "type": "report",
                                        "is_query_report": True,
                                        "name": "Chassis Number To Be Claim From Manufacturer",
                                        "doctype": "Sales Invoice"
                                },
				{
                                        "type": "report",
                                        "is_query_report": True,
                                        "name": "Chassis Number Claim Vs Claim Received",
                                        "doctype": "Sales Invoice"
                                }
			]
        	},
		{
                        "label": _("Setting"),
                        "items": [
                                {
                                        "type": "doctype",
                                        "name": "Automobile Settings",
                                        "label": "Automobile Settings",
                                        "description": _("Automobile Settings"),
                                        "onboard": 1
                                }
                        ]
                },
]

