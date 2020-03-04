// Copyright (c) 2016, Hardik Gadesha and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Customer Price List"] = {
	"filters": [
		{
            "fieldname": "valid_from",
            "label": __("Valid From"),
            "fieldtype": "Date",
	    "default": frappe.datetime.month_start()
        },
	{
            "fieldname": "valid_upto",
            "label": __("Valid Upto"),
            "fieldtype": "Date",
	    "default": frappe.datetime.month_end()
        },
	{
            "fieldname": "booking_type",
            "label": __("Booking Type"),
            "fieldtype": "Select",
            "options": "\nINDIVIDUAL\nCORPORATE\nTAXI\nCSD"
        }
	]
};
