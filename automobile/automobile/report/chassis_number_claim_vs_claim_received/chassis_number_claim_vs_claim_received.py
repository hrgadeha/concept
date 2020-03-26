# Copyright (c) 2013, Hardik Gadesha and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import msgprint, _

def execute(filters=None):
	columns = get_column()
	data = get_data(filters)
	return columns,data

def get_column():
        return [_("Invoice Date") + ":Date:150",
                _("Car") + ":Link/Item:180",
		_("Chassis Number") + ":Link/Serial No:150",
		_("Claimed") + ":Check:100",
		_("Claim Received") + ":Check:130"]

def get_data(filters):
	if filters.get("from_date","start_date"):
		from_date = filters.get("from_date")
		to_date = filters.get("to_date")
		si = frappe.db.sql("""select si.posting_date, sitem.item_code, si.serial, si.oem_claimed, si.oem_claim_received
				 from `tabSales Invoice` si, `tabSales Invoice Item` sitem where 
				si.name = sitem.parent and sitem.is_base_item = 1 
				and si.posting_date between '%s' and '%s';"""%(from_date,to_date), as_list=1)

		return si
