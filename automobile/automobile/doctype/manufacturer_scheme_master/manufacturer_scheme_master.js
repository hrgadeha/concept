// Copyright (c) 2020, Hardik Gadesha and contributors
// For license information, please see license.txt

frappe.ui.form.on('Manufacturer Scheme Master', {
	// refresh: function(frm) {

	// }
});

frappe.ui.form.on('Manufacturer Scheme Master',  {
    scheme_applied_on: function(frm) {
        if(frm.doc.scheme_applied_on == "Group"){
        	frm.set_df_property('car_group',  'reqd',1);
		frm.set_df_property('car',  'reqd',0);
    }
	if(frm.doc.scheme_applied_on == "Variant"){
                frm.set_df_property('car_group',  'reqd',0);
                frm.set_df_property('car',  'reqd',1);
    }
}
});
