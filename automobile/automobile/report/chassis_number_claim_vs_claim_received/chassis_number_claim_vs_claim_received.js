// Copyright (c) 2016, Hardik Gadesha and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Chassis Number Claim Vs Claim Received"] = {
	"filters": [
			{
            			"fieldname": "from_date",
            			"label": __("From DMS Date"),
            			"fieldtype": "Date",
	    			"default": frappe.datetime.month_start()
        		},
			{
        			"fieldname": "to_date",
            			"label": __("To DMS Date"),
            			"fieldtype": "Date",
	    			"default": frappe.datetime.month_end()
        		}
	]
};
