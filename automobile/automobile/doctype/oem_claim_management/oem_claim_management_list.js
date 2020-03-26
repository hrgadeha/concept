frappe.listview_settings['OEM Claim Management'] = {
	add_fields: ["status"],
	get_indicator: function(doc) {
		if (doc.status === "Draft"){
			return [__("Draft"), "red", "status,=,Draft"];
		}
		else if (doc.status === "Claim Pending") {
                        return [__("Claim Pending"), "orange", "status,=,Claim Pending"];
                }
		else if (doc.status === "Claim Completed") {
                        return [__("Claim Completed"), "green", "status,=,Claim Completed"];
                }
	}
};

