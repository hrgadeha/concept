# -*- coding: utf-8 -*-
# Copyright (c) 2020, Hardik Gadesha and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class OEMClaimManagement(Document):
	pass


@frappe.whitelist(allow_guest=True)
def customSI(company,car,date):
	data = frappe.db.sql("""select car,cash_discount_to_customer,manufacturer_share_basic,manufacturer_share_gst,
				dealer_share_basic,dealer_share_gst,additional_discount_for_exchange_customers,
				manufacturer_share_basic_on_exchange,manufacturer_share_gst_on_exchnage,dealer_share_basic_on_exchnage,
				dealer_share_gst_on_exchnage,additional_discount_for__poi__corporate_customers,
				manufacturer_share_basic_on_poi_corporate,manufacturer_share_gst_on_poi_corporate,
				dealer_share_basic_on_poi_corporate,dealer_share_gst_on_poi_corporate
				from `tabManufacturer Scheme Master` where company = '{0}' and car = '{1}' 
				and '{2}' between valid_from and valid_to;""".format(company,car,date),as_list=1)
	return data

