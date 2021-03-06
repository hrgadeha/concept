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
        return [_("Item Code") + ":Link/Item:150",
                _("Item Name") + ":Data:150",
                _("Ex Showroom") + ":Currency:150",
		_("Handling Charges") + ":Currency:150",
		_("INSURANCE") + ":Currency:180",
		_("RTO Tax") + ":Currency:150",
		_("M Tax") + ":Currency:150",
		_("Ex Warrenty") + ":Currency:150",
		_("RSA 1 Year") + ":Currency:150",
		_("Basic Kit") + ":Currency:150",
		_("fasTAG") + ":Currency:150",
		_("TCS") + ":Currency:150",
		_("On Road Price") + ":Currency:150"]

def get_data(conditions,filters):
        invoice = frappe.db.sql("""select item_code,item_name,
					ex_showroom,handling_charges,
					(insurance_own_damage * ((100 - tariff_less) / 100)) + insurance_tp_and_others + insurance_zero_dep +
					((insurance_own_damage * ((100 - tariff_less) / 100)) + insurance_tp_and_others + insurance_zero_dep) * 0.18,
					(IF(booking_type="CORPORATE", price_list_rate * 0.12, price_list_rate * 0.06) +
					passing_charges +
					regi_charges +
					crtm_charges),
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
					regi_charges +
					crtm_charges +
					(case
                                            when price_list_rate > 299999 and price_list_rate < 499999 then (price_list_rate * 0.0175) + mtax_fix_component
					    when price_list_rate > 499999 and price_list_rate < 999999 then (price_list_rate * 0.02) + mtax_fix_component
					    when price_list_rate > 999999 and price_list_rate < 1999999 then (price_list_rate * 0.0225) + mtax_fix_component
					    when price_list_rate > 2999999 then (price_list_rate * 0.025) + mtax_fix_component
					    when price_list_rate < 299999 then (price_list_rate * 0.001) + mtax_fix_component
                                        end) +
					ex_warrenty + rsa_1_year + basic_kit + fastag +
					IF(ex_showroom > 1000000, ex_showroom * 0.01, 0.0)
					)
				from `tabItem Price` where selling = 1 %s;"""%conditions, filters, as_list=1)
        return invoice

def get_conditions(filters):
	conditions = ""
	if filters.get("valid_from"): conditions += " and valid_from >= %(valid_from)s"
	if filters.get("valid_upto"): conditions += " and valid_upto <= %(valid_upto)s"
	if filters.get("booking_type"): conditions += "and booking_type = %(booking_type)s"

	return conditions, filters
