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

def get_data(filters):
	if filters.get("from_date","start_date"):
		from_date = filters.get("from_date")
		to_date = filters.get("to_date")
		weigh_bridge = frappe.db.sql("""select ocmt.dms_date, ocmt.car, ocmt.chassis_number, ot.cash_discount_to_customer,
				ot.manufacturer_share_basic, ot.manufacturer_share_gst, ot.dealer_share_basic, ot.dealer_share_gst,
				ot.additional_discount_for_exchange_customers, ot.manufacturer_share_basic_on_exchange, 
				ot.manufacturer_share_gst_on_exchnage,
				ot.dealer_share_basic_on_exchnage, ot.dealer_share_gst_on_exchnage, 
				ot.additional_discount_for__poi__corporate_customers,
				ot.manufacturer_share_basic_on_poi_corporate, ot.manufacturer_share_gst_on_poi_corporate, ot.dealer_share_basic_on_poi_corporate,
				ot.dealer_share_gst_on_poi_corporate from `tabOEM Claim Management Table` ocmt, 
				`tabManufacturer Scheme Master` ot
				where ocmt.claimed = 0 and (ocmt.car = ot.car) and ocmt.dms_date between '%s' and '%s';"""%(from_date,to_date), as_list=1)

		return weigh_bridge
