frappe.listview_settings['Received OEM Claim'] = {
	add_fields: ["status"],
	get_indicator: function(doc) {
		if (doc.status === "Received") {
                        return [__("Received"), "green", "status,=,Received"];
                }
	}
};

