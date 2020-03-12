// Copyright (c) 2020, Hardik Gadesha and contributors
// For license information, please see license.txt

frappe.ui.form.on('Automobile Settings', {
	// refresh: function(frm) {

	// }
});

frappe.ui.form.on('Automobile Settings', {
	insert_standard_service_item(frm) {
	    if(frm.doc.item_inserted === 0){
    frappe.call({
        "method": "automobile.automobile.doctype.automobile_settings.automobile_settings.createItem",
        args: {
        },
        callback:function(r){
            frm.set_value("item_inserted",1);
            frm.save();
    }
});
}
    if(frm.doc.item_inserted == 1){
        msgprint("Service Item Already Added");
    }
}
});

