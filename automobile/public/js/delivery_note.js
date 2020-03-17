frappe.ui.form.on('Delivery Note', {
	validate(frm) {
		frm.set_value("set_warehouse",frm.doc.set_source_warehouse);
		$.each(frm.doc.items || [], function(i, d) {
	if(d.is_base_item == 1){
		 d.serial_no = frm.doc.serial;
	}
		});
		refresh_field("items");
	}
});
