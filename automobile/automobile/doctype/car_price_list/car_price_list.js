// Copyright (c) 2019, Hardik Gadesha and contributors
// For license information, please see license.txt

frappe.ui.form.on("Car Price List",{
    onload: function(frm){
	if(frm.doc.__islocal){
            var d = new Date();
            frm.set_value('valid_from',new Date(d.getFullYear(),d.getMonth(),1));
            frm.set_value('valid_till',new Date(d.getFullYear(), d.getMonth() + 1, 0));
    }
}
});

frappe.ui.form.on("Car Price List", {
  calculate_charges: function(frm) {
    frappe.call({
    "method": "automobile.automobile.doctype.car_price_list.car_price_list.getPrice",
args: {
car: frm.doc.car,
valid_from: frm.doc.valid_from,
valid_till: frm.doc.valid_till,
booking_type: frm.doc.booking_type,
zone: frm.doc.zone
},
callback:function(r){
	var len=r.message.length;
	var t = 0.0
	if(r.message.length > 0){
	console.log("1")
	for (var i=0;i<len;i++){
                frm.set_value("basic_price", r.message[i][0]);
		frm.set_value("ex_showroom", r.message[i][1]);
		frm.set_value("passing_charges", r.message[i][2]);
		frm.set_value("basic_kit", r.message[i][3]);
		frm.set_value("ex_warrenty", r.message[i][4]);
		frm.set_value("cc", r.message[i][5]);
		frm.set_value("handling_charges", r.message[i][6]);
		frm.set_value("regi_charges", r.message[i][7]);
		frm.set_value("rsa_1_year", r.message[i][8]);
		frm.set_value("fastag", r.message[i][9]);
        }
	}
	if(r.message.length <= 0){
	console.log("2")
                frm.set_value("basic_price", t);
                frm.set_value("ex_showroom", t);
                frm.set_value("passing_charges", t);
                frm.set_value("ex_warrenty", t);
                frm.set_value("basic_kit", t);
                frm.set_value("cc", t);
		frm.set_value("handling_charges", t);
                frm.set_value("regi_charges", t);
		frm.set_value("rsa_1_year", t);
                frm.set_value("fastag", t);
	}
	}
    });
}
});

