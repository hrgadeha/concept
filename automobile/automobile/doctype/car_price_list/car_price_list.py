# -*- coding: utf-8 -*-
# Copyright (c) 2019, Hardik Gadesha and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class CarPriceList(Document):
	pass

@frappe.whitelist(allow_guest=True)
def getPrice(car,valid_from,valid_till,booking_type,zone):
	mt = frappe.db.sql("""select price_list_rate,ex_showroom,passing_charges,basic_kit,ex_warrenty,cc,handling_charges,regi_charges, 
				rsa_1_year,fastag from `tabItem Price`
				where item_code = %s and valid_from = %s and valid_upto = %s and 
				booking_type = %s and zone = %s;""",(car,valid_from,valid_till,booking_type,zone),as_list=1)
	return mt

