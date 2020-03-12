# -*- coding: utf-8 -*-
# Copyright (c) 2020, Hardik Gadesha and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import msgprint
from frappe.model.document import Document

class AutomobileSettings(Document):
	pass

@frappe.whitelist(allow_guest=True)
def createItem():
	item = frappe.get_doc({
	"doctype": "Item",
	"item_code": "CRTM Charges",
	"item_name": "CRTM Charges",
	"item_group": "Services",
	"stock_uom": "Nos",
	"is_sales_item": 1,
	"description": "CRTM Charges"
	})
	item.insert()
	item.save()

	item = frappe.get_doc({
        "doctype": "Item",
        "item_code": "Extended Warranty",
        "item_name": "Extended Warranty",
        "item_group": "Services",
        "stock_uom": "Nos",
        "is_sales_item": 1,
        "description": "Extended Warranty"
        })
        item.insert()
        item.save()

	item = frappe.get_doc({
        "doctype": "Item",
        "item_code": "INSURANCE GST",
        "item_name": "INSURANCE GST",
        "item_group": "Services",
        "stock_uom": "Nos",
        "is_sales_item": 1,
        "description": "INSURANCE GST"
        })
        item.insert()
        item.save()

	item = frappe.get_doc({
        "doctype": "Item",
        "item_code": "INSURANCE Own Damage",
        "item_name": "INSURANCE Own Damage",
        "item_group": "Services",
        "stock_uom": "Nos",
        "is_sales_item": 1,
        "description": "INSURANCE Own Damage"
        })
        item.insert()
        item.save()

	item = frappe.get_doc({
        "doctype": "Item",
        "item_code": "INSURANCE TP & Others",
        "item_name": "INSURANCE TP & Others",
        "item_group": "Services",
        "stock_uom": "Nos",
        "is_sales_item": 1,
        "description": "INSURANCE TP & Others"
        })
        item.insert()
        item.save()

	item = frappe.get_doc({
        "doctype": "Item",
        "item_code": "INSURANCE Zero Dep",
        "item_name": "INSURANCE Zero Dep",
        "item_group": "Services",
        "stock_uom": "Nos",
        "is_sales_item": 1,
        "description": "INSURANCE Zero Dep"
        })
        item.insert()
        item.save()

	item = frappe.get_doc({
        "doctype": "Item",
        "item_code": "M. Tax",
        "item_name": "M. Tax",
        "item_group": "Services",
        "stock_uom": "Nos",
        "is_sales_item": 1,
        "description": "M. Tax"
        })
        item.insert()
        item.save()

	item = frappe.get_doc({
        "doctype": "Item",
        "item_code": "Passing Charges",
        "item_name": "Passing Charges",
        "item_group": "Services",
        "stock_uom": "Nos",
        "is_sales_item": 1,
        "description": "Passing Charges"
        })
        item.insert()
        item.save()

	item = frappe.get_doc({
        "doctype": "Item",
        "item_code": "REGI. CHARGES",
        "item_name": "REGI. CHARGES",
        "item_group": "Services",
        "stock_uom": "Nos",
        "is_sales_item": 1,
        "description": "REGI. CHARGES"
        })
        item.insert()
        item.save()

	item = frappe.get_doc({
        "doctype": "Item",
        "item_code": "RTO Tax",
        "item_name": "RTO Tax",
        "item_group": "Services",
        "stock_uom": "Nos",
        "is_sales_item": 1,
        "description": "RTO Tax"
        })
        item.insert()
        item.save()

	item = frappe.get_doc({
        "doctype": "Item",
        "item_code": "RSA CHARGES (1 YEAR)",
        "item_name": "RSA CHARGES (1 YEAR)",
        "item_group": "Services",
        "stock_uom": "Nos",
        "is_sales_item": 1,
        "description": "RSA CHARGES (1 YEAR)"
        })
        item.insert()
        item.save()

	item = frappe.get_doc({
        "doctype": "Item",
        "item_code": "Handling Charges",
        "item_name": "Handling Charges",
        "item_group": "Services",
        "stock_uom": "Nos",
        "is_sales_item": 1,
        "description": "Handling Charges"
        })
        item.insert()
        item.save()
