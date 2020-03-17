frappe.ui.form.on("Item Price", "onload", function(frm) {
    cur_frm.set_query("gst_cess_accoun", function() {
        return {
            "filters": {
                "account_type": "Tax",
                "is_group": 0
                }
        };
    });
});

frappe.ui.form.on("Item Price", "onload", function(frm) {
    cur_frm.set_query("sgst_14_account", function() {
        return {
            "filters": {
                "account_type": "Tax",
                "is_group": 0
                }
        };
    });
});

frappe.ui.form.on("Item Price", "onload", function(frm) {
    cur_frm.set_query("cgst_14_account", function() {
        return {
            "filters": {
                "account_type": "Tax",
                "is_group": 0
                }
        };
    });
});

frappe.ui.form.on("Item Price", "onload", function(frm) {
    cur_frm.set_query("sgst_9_account", function() {
        return {
            "filters": {
                "account_type": "Tax",
                "is_group": 0
                }
        };
    });
});

frappe.ui.form.on("Item Price", "onload", function(frm) {
    cur_frm.set_query("cgst_9_account", function() {
        return {
            "filters": {
                "account_type": "Tax",
                "is_group": 0
                }
        };
    });
});

cur_frm.add_fetch('gst_cess_accoun',  'tax_rate',  'gst_cess');
cur_frm.add_fetch('sgst_14_account',  'tax_rate',  'sgst_14');
cur_frm.add_fetch('cgst_14_account',  'tax_rate',  'cgst_14');
cur_frm.add_fetch('sgst_9_account',  'tax_rate',  'sgst_9');
cur_frm.add_fetch('cgst_9_account',  'tax_rate',  'cgst_9');

