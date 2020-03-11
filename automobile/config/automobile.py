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
				}
                        ]
                },
		{
                        "label": _("Transaction"),
                        "items": [
                                {
                                        "type": "doctype",
                                        "name": "Sales Order",
                                        "label": "Sales Order",
                                        "description": _("Sales Order"),
                                        "onboard": 1
                                }
                        ]
                }
]

