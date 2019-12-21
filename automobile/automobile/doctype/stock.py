from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
import json

@frappe.whitelist(allow_guest=True)
def transferStock(doc,method):
	for d in doc.items:
		if d.is_base_item == 1:
			mt = frappe.get_doc({
			"doctype": "Stock Entry",
			"company": doc.company,
			"stock_entry_type": "Material Transfer",
			"posting_date": doc.transaction_date,
			"from_warehouse": doc.set_warehouse,
			"to_warehouse": "Allotted - C",
			"so" : doc.name,
			"items": [
			{
				"item_code": d.item_code,
				"qty": d.qty,
				"uom": d.uom,
				"s_warehouse": doc.set_warehouse,
				"t_warehouse": "Allotted - C"
			}
			]
			})
			mt.insert()
			mt.save()
			mt.submit()

@frappe.whitelist(allow_guest=True)
def updateSO(doc,method):
	if doc.so:
		doc_or = frappe.get_doc("Sales Order", doc.so)
		doc_or.se = doc.name
		doc_or.save()

@frappe.whitelist(allow_guest=True)
def cancelSO(doc,method):
        if doc.se:
                doc_or = frappe.get_doc("Stock Entry", doc.se)
                doc_or.cancel()

@frappe.whitelist(allow_guest=True)
def getPrice(selling_price_list,item_code,from_date):
	mt = frappe.db.sql("""select price_list_rate,cc from `tabItem Price` where price_list = %s and item_code = %s and 
				%s between valid_from and valid_upto;""",(selling_price_list,item_code,from_date),as_list=1)
	return mt

