frappe.ui.form.on('Lead', {
    onload(frm) {
		if(frm.doc.buyer_type_ == 'First Time'){
		    frm.set_value("currently_are_you_using_any_4_wheeler","No");
		    frm.set_value("exchange_require","No");
		    frm.set_df_property('currently_are_you_using_any_4_wheeler',  'read_only',1);
		    frm.set_df_property('exchange_require',  'read_only',1);
		}
		if(frm.doc.buyer_type_ == 'Exchange Buyer'){
		    frm.set_value("currently_are_you_using_any_4_wheeler","Yes");
		    frm.set_value("exchange_require","Yes");
		    frm.set_df_property('currently_are_you_using_any_4_wheeler',  'read_only',1);
		    frm.set_df_property('exchange_require',  'read_only',1);
		}
		if(frm.doc.buyer_type_ == 'Additional Car Buyer'){
		    frm.set_value("currently_are_you_using_any_4_wheeler","Yes");
		    frm.set_value("exchange_require","No");
		    frm.set_df_property('currently_are_you_using_any_4_wheeler',  'read_only',1);
		    frm.set_df_property('exchange_require',  'read_only',1);
		}
	},
	buyer_type_(frm) {
		if(frm.doc.buyer_type_ == 'First Time'){
		    frm.set_value("currently_are_you_using_any_4_wheeler","No");
		    frm.set_value("exchange_require","No");
		    frm.set_df_property('currently_are_you_using_any_4_wheeler',  'read_only',1);
		    frm.set_df_property('exchange_require',  'read_only',1);
		}
		if(frm.doc.buyer_type_ == 'Exchange Buyer'){
		    frm.set_value("currently_are_you_using_any_4_wheeler","Yes");
		    frm.set_value("exchange_require","Yes");
		    frm.set_df_property('currently_are_you_using_any_4_wheeler',  'read_only',1);
		    frm.set_df_property('exchange_require',  'read_only',1);
		}
		if(frm.doc.buyer_type_ == 'Additional Car Buyer'){
		    frm.set_value("currently_are_you_using_any_4_wheeler","Yes");
		    frm.set_value("exchange_require","No");
		    frm.set_df_property('currently_are_you_using_any_4_wheeler',  'read_only',1);
		    frm.set_df_property('exchange_require',  'read_only',1);
		}
	}
});

frappe.ui.form.on('Lead', {
	"validate": function(frm,cdt,cdn) {
		var dn = frm.doc.follow_up_table;
		var date = "";
		var folloup_by = "";
		for (var j in dn){
			date = dn[j].date;
			folloup_by = dn[j].folloup_by;
			}
		frm.set_value("contact_date",date);
		frm.set_value("contact_by",folloup_by);
        }
});

frappe.ui.form.on("Lead", {
  get_notes: function(frm) {
	cur_frm.clear_table("follow_up_table");
	cur_frm.refresh_fields();
    frappe.call({
    "method": "automobile.automobile.doctype.follow_up_table.follow_up_table.getRemarks",
args: {
lead: frm.doc.name
},
callback:function(r){
	var len=r.message.length;
	console.log(r);
	for (var i=0;i<len;i++){
	        var row = frm.add_child("follow_up_table");
		row.document_link = r.message[i][0];
		row.date = r.message[i][1];
		row.folloup_by = frappe.session.user;
		row.note = r.message[i][2];
	}
		cur_frm.refresh_fields();
	}
    });
}
});

