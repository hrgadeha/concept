# Copyright (c) 2013, Hardik Gadesha and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import msgprint, _

def execute(filters=None):
        conditions, filters = get_conditions(filters)
        columns = get_column()
        data = get_data(conditions,filters)
        return columns,data

def get_column():
        return [_("DMS Date") + ":Date:150",
                _("Car") + ":Link/Item:180",
		_("Chassis Number") + ":Link/Serial No:150",
		_("Cash Discount To Customer") + ":Currency:250",
                _("Manufacturer Share Basic") + ":Currency:250",
		_("Manufacturer Share GST") + ":Currency:250",
		_("Dealer Share Basic") + ":Currency:150",
		_("Dealer Share GST") + ":Currency:150",
		_("Additional Discount For Exchange Customers") + ":Currency:280",
		_("Manufacturer Share Basic On Exchange") + ":Currency:250",
		_("Manufacturer Share GST On Exchnage") + ":Currency:250",
		_("Dealer Share Basic On Exchnage") + ":Currency:250",
		_("Dealer Share GST On Exchnage") + ":Currency:250",
		_("Additional Discount For  POI / Corporate Customers") + ":Currency:250",
		_("Manufacturer Share Basic On POI / Corporate") + ":Currency:250",
		_("Manufacturer Share GST On POI / Corporate") + ":Currency:250",
		_("Dealer Share Basic On POI / Corporate") + ":Currency:250",
		_("Dealer Share GST On POI / Corporate") + ":Currency:250"]

def get_data(conditions,filters):
	oem = frappe.db.sql("""select ocmt.dms_date, ocmt.car, ocmt.chassis_number,
			IF(ocmt.cash_discount = 1, ot.cash_discount_to_customer, 0), 
			IF(ocmt.cash_discount = 1, ot.manufacturer_share_basic, 0), 
			IF(ocmt.cash_discount = 1, ot.manufacturer_share_gst, 0), 
			IF(ocmt.cash_discount = 1, ot.dealer_share_basic, 0), 
			IF(ocmt.cash_discount = 1, ot.dealer_share_gst, 0), 

			IF(ocmt.exchange_benefits = 1, ot.additional_discount_for_exchange_customers, 0), 
                        IF(ocmt.exchange_benefits = 1, ot.manufacturer_share_basic_on_exchange, 0), 
                        IF(ocmt.exchange_benefits = 1, ot.manufacturer_share_gst_on_exchnage, 0), 
                        IF(ocmt.exchange_benefits = 1, ot.dealer_share_basic_on_exchnage, 0), 
                        IF(ocmt.exchange_benefits = 1, ot.dealer_share_gst_on_exchnage, 0),

 			IF(ocmt.poi_corporate_benefits = 1, ot.additional_discount_for__poi__corporate_customers, 0), 
                        IF(ocmt.poi_corporate_benefits = 1, ot.manufacturer_share_basic_on_poi_corporate, 0), 
                        IF(ocmt.poi_corporate_benefits = 1, ot.manufacturer_share_gst_on_poi_corporate, 0), 
                        IF(ocmt.poi_corporate_benefits = 1, ot.dealer_share_basic_on_poi_corporate, 0), 
                        IF(ocmt.poi_corporate_benefits = 1, ot.dealer_share_gst_on_poi_corporate, 0)
			from `tabOEM Claim Management Table` ocmt, `tabManufacturer Scheme Master` ot
			where ocmt.docstatus = 1 and ((ocmt.car = ot.car and ot.scheme_applied_on = 'Variant') or 
			(ocmt.car_group = ot.car_group and ot.scheme_applied_on = 'Group'))
			and (ocmt.dms_date between ot.valid_from and ot.valid_to) and ocmt.claimed = 0
			%s;"""%conditions, filters, as_list=1)

	return oem

def get_conditions(filters):
	conditions = ""
	if filters.get("from_date","to_date"):
		conditions += " and ocmt.dms_date between %(from_date)s and %(to_date)s"

	if filters.get("claim"):
		conditions += " and ocmt.manual_claimed = 1"

	return conditions, filters
