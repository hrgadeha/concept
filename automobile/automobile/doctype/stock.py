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
			"to_warehouse": doc.set_source_warehouse,
			"so" : doc.name,
			"items": [
			{
				"item_code": d.item_code,
				"qty": d.qty,
				"uom": d.uom,
				"s_warehouse": doc.set_warehouse,
				"t_warehouse": doc.set_source_warehouse,
				"serial_no": d.serial_no
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
def getAlloted(company):
        mt = frappe.db.sql("""select name from `tabWarehouse` where company = '{0}' and warehouse_name LIKE 'Allotted%'
				;""".format(company),as_list=1)
        return mt if mt else ""

@frappe.whitelist(allow_guest=True)
def getPrice(selling_price_list,item_code,from_date):
	mt = frappe.db.sql("""select price_list_rate,cc from `tabItem Price` where price_list = %s and item_code = %s and 
				%s between valid_from and valid_upto;""",(selling_price_list,item_code,from_date),as_list=1)
	return mt if mt else ""

@frappe.whitelist(allow_guest=True)
def SerailNO(company,item_code):
	mt = frappe.db.sql("""select name,warehouse from `tabSerial No` where company = '{0}' and item_code = '{1}' and warehouse LIKE 'Free%'
                                ORDER BY allotted_date asc limit 1;""".format(company,item_code),as_list=1)
	if mt:
		return mt if mt else ""

	else:
		st = frappe.db.sql("""select name,warehouse from `tabSerial No` where company = '{0}' and item_code = '{1}' and warehouse LIKE 'In Transit%'
                                ORDER BY allotted_date asc limit 1;""".format(company,item_code),as_list=1)

		return st if st else ""

@frappe.whitelist(allow_guest=True)
def get_data(selling_price_list,item_code,from_date):
        invoice = frappe.db.sql("""select item_code,item_name,price_list_rate,
					((price_list_rate * 0.28) + (price_list_rate * (gst_cess/100))),
					ex_showroom,handling_charges,
					(insurance_own_damage * ((100 - tariff_less) / 100)),insurance_tp_and_others,insurance_zero_dep,
					((insurance_own_damage * ((100 - tariff_less) / 100)) + insurance_tp_and_others + insurance_zero_dep) * 0.18,
					IF(booking_type="CORPORATE", price_list_rate * 0.12, price_list_rate * 0.06),
					passing_charges,
					regi_charges,
					(case
                                            when price_list_rate > 299999 and price_list_rate < 499999 then (price_list_rate * 0.0175) + mtax_fix_component
					    when price_list_rate > 499999 and price_list_rate < 999999 then (price_list_rate * 0.02) + mtax_fix_component
					    when price_list_rate > 999999 and price_list_rate < 1999999 then (price_list_rate * 0.0225) + mtax_fix_component
					    when price_list_rate > 2999999 then (price_list_rate * 0.025) + mtax_fix_component
					    when price_list_rate < 299999 then (price_list_rate * 0.001) + mtax_fix_component
                                        end),
					ex_warrenty,rsa_1_year,basic_kit,fastag,
					IF(ex_showroom > 1000000, ex_showroom * 0.01, 0.0),
					(ex_showroom + handling_charges +
					IF(cc >= 1001 and cc <= 1500,((ex_showroom * 0.95) * (0.03283 * (100 - tariff_less)) / 100),((ex_showroom * 0.95) * (0.0344 * (100 - tariff_less)) / 100)) +
					(case
						 when cc <= 1000 then 8240
						 when cc >= 1001 and cc <= 1500 then 12488
						 when cc >= 1501 then 27259
					end) +
					((ex_showroom * 0.95) * 0.006) +
					(IF(cc >= 1001 and cc <= 1500,((ex_showroom * 0.95) * (0.03283 * (100 - tariff_less)) / 100),((ex_showroom * 0.95) * (0.0344 * (100 - tariff_less)) / 100)) + 
                                        (case
                                                 when cc <= 1000 then 8240
                                                 when cc >= 1001 and cc <= 1500 then 12488
                                                 when cc >= 1501 then 27259
                                        end) + 
                                        (ex_showroom * 0.95) * 0.006) * 0.18 +
					IF(booking_type="CORPORATE", price_list_rate * 0.12, price_list_rate * 0.06) +
					passing_charges +
					IF(booking_type="TAXI",3350 ,2600) +
					(case
                                            when price_list_rate > 299999 and price_list_rate < 499999 then (price_list_rate * 0.0175) + mtax_fix_component
					    when price_list_rate > 499999 and price_list_rate < 999999 then (price_list_rate * 0.02) + mtax_fix_component
					    when price_list_rate > 999999 and price_list_rate < 1999999 then (price_list_rate * 0.0225) + mtax_fix_component
					    when price_list_rate > 2999999 then (price_list_rate * 0.025) + mtax_fix_component
					    when price_list_rate < 299999 then (price_list_rate * 0.001) + mtax_fix_component
                                        end) +
					ex_warrenty + rsa_1_year + basic_kit + fastag +
					IF(ex_showroom > 1000000, ex_showroom * 0.01, 0.0)
					),gst_cess_accoun,gst_cess,
					sgst_14_account, sgst_14,
					cgst_14_account, cgst_14,
					sgst_9_account, sgst_9,
					cgst_9_account, cgst_9,tariff_less,crtm_charges,mtax_fix_component,brand
				from `tabItem Price` where selling = 1 and price_list = %s and item_code = %s and 
                                %s between valid_from and valid_upto;""",(selling_price_list,item_code,from_date),as_list=1)
        return invoice
