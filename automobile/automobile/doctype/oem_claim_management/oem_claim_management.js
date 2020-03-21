// Copyright (c) 2020, Hardik Gadesha and contributors
// For license information, please see license.txt

frappe.ui.form.on('OEM Claim Management', {
	// refresh: function(frm) {

	// }
});

frappe.ui.form.on('OEM Claim Management', 'claimed', function(frm) {
    $.each(frm.doc.oem_claim_management_table || [], function(i, d) {
		 d.claimed = 1;
		});
		refresh_field("items");
		frm.save("Update");
});
