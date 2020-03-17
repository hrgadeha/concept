var gt = 0.0;

frappe.ui.form.on("Sales Order", {    
refresh: function(me) {
    if(me.doc.docstatus != 1){
        //frm.set_df_property('discount_value',  'read_only', 0);
		//frm.set_df_property('foc_amount',  'read_only', 0);
		//frm.set_df_property('tariff_less',  'read_only', 0);
    		me.page.sidebar.remove(); // this removes the sidebar
    		me.page.wrapper.find(".layout-main-section-wrapper").removeClass("col-md-10"); // this removes class "col-md-10" from content block, which sets width to 83%
    	}
}
});

frappe.ui.form.on("Sales Order", {
  get_data: function(frm) {
	if(frm.doc.car_template){
	cur_frm.clear_table("items");
	cur_frm.clear_table("taxes");
	var total = 0;

    frappe.call({
    "method": "automobile.automobile.doctype.stock.get_data",
args: {
selling_price_list: frm.doc.selling_price_list,
item_code: frm.doc.car_template,
from_date: frm.doc.transaction_date
},
callback:function(r){
            frm.set_value("gt",0.0);
            frm.set_value("discount_value",0);
            frm.set_value("discount_settled",0);
            frm.set_value("foc_amount",0);
            frm.set_value("tariff_less",r.message[0][30]);
            frm.set_value("od",r.message[0][6]);
            frm.set_value("tariff",r.message[0][30]);
	    var row = frm.add_child("items");
			row.item_code = r.message[0][0];
			row.item_name = r.message[0][1];
			row.description = r.message[0][1];
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.is_base_item = 1;
			row.serial_no= frm.doc.serial;
			row.price_list_rate = r.message[0][2];
       		row.rate = r.message[0][2];
		cur_frm.refresh_field("items");
		
	if(r.message[0][33] == "Hyundai"){
	    
	    var ttt = ((r.message[0][27] + r.message[0][29]) / 100) + 1;
		var row = frm.add_child("items");
			row.item_code = "Handling Charges";
			row.item_name = "Handling Charges";
			row.description = r.message[0][1];
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][5] / ttt;
       		row.rate = r.message[0][5] / ttt;
		cur_frm.refresh_field("items");
		
	}	
	
	if(r.message[0][33] != "Hyundai"){
		var tt = ((r.message[0][23] + r.message[0][25] + r.message[0][21]) / 100) + 1;
		console.log(tt);
		var row = frm.add_child("items");
			row.item_code = "Handling Charges";
			row.item_name = "Handling Charges";
			row.description = r.message[0][1];
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][5] / tt;
       		row.rate = r.message[0][5] / tt;
		cur_frm.refresh_field("items");
		
	}
		
	if(!frm.doc.self_insurance){
	    
		var row = frm.add_child("items");
			row.item_code = "INSURANCE Own Damage";
			row.item_name = "INSURANCE Own Damage";
			row.description = "INSURANCE Own Damage";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][6];
       		row.rate = r.message[0][6];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE TP & Others";
			row.item_name = "INSURANCE TP & Others";
			row.description = "INSURANCE TP & Others";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][7];
       		row.rate = r.message[0][7];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE Zero Dep";
			row.item_name = "INSURANCE Zero Dep";
			row.description = "INSURANCE Zero Dep";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][8];
       		row.rate = r.message[0][8];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE GST";
			row.item_name = "INSURANCE GST";
			row.description = "INSURANCE GST";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][9];
       		row.rate = r.message[0][9];
		cur_frm.refresh_field("items");
		
	}
	
	if(!frm.doc.self_rto_){
	
		var row = frm.add_child("items");
			row.item_code = "RTO Tax";
			row.item_name = "RTO Tax";
			row.description = "RTO Tax";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][10];
       		row.rate = r.message[0][10];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "Passing Charges";
			row.item_name = "Passing Charges";
			row.description = "Passing Charges";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = (r.message[0][11] / 1.18);
       		row.rate = (r.message[0][11] / 1.18);
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "REGI. CHARGES";
			row.item_name = "REGI. CHARGES";
			row.description = "REGI. CHARGES";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][12];
       		row.rate = r.message[0][12];
		cur_frm.refresh_field("items");
		
    }	
    
        var row = frm.add_child("items");
			row.item_code = "CRTM Charges";
			row.item_name = "CRTM Charges";
			row.description = "CRTM Charges";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][31];
       		row.rate = r.message[0][31];
		cur_frm.refresh_field("items");
		
	if(!frm.doc.self_mtax){	
		
		var row = frm.add_child("items");
			row.item_code = "M. Tax";
			row.item_name = "M. Tax";
			row.description = "M. Tax";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][13];
       		row.rate = r.message[0][13];
		cur_frm.refresh_field("items");
		
	}	
		
	if(!frm.doc.no_extended_warranty){	
		
		var row = frm.add_child("items");
			row.item_code = "Extended Warranty";
			row.item_name = "Extended Warranty";
			row.description = "Extended Warranty";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][14];
       		row.rate = r.message[0][14];
		cur_frm.refresh_field("items");
		
	}	
	
	if(!frm.doc.no_rsa){
		
		var row = frm.add_child("items");
			row.item_code = "RSA CHARGES (1 YEAR)";
			row.item_name = "RSA CHARGES (1 YEAR)";
			row.description = "RSA CHARGES (1 YEAR)";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][15];
       		row.rate = r.message[0][15];
		cur_frm.refresh_field("items");
		
	}	
	
	if(!frm.doc.no_basic_kit){
		
		var row = frm.add_child("items");
			row.item_code = "BASIC KIT";
			row.item_name = "BASIC KIT";
			row.description = "BASIC KIT";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][16];
       		row.rate = r.message[0][16];
       		frm.set_value("std_foc",r.message[0][16]);
		cur_frm.refresh_field("items");
		
	}	
	
	if(!frm.doc.no_fastag){
		
		var row = frm.add_child("items");
			row.item_code = "FasTAG";
			row.item_name = "FasTAG";
			row.description = "FasTAG";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][17];
       		row.rate = r.message[0][17];
		cur_frm.refresh_field("items");
		
	}	
		
	if(!frm.doc.self_rto_ && r.message[0][33] != "Hyundai"){
	    
		var tt = ((r.message[0][23] + r.message[0][25] + r.message[0][21]) / 100) + 1;
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][22];
 			row.description = r.message[0][22];
 			row.rate = r.message[0][23];
 			row.tax_amount =  (r.message[0][2] * (r.message[0][23] / 100)) + (r.message[0][5] / tt * (r.message[0][23] / 100));
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][24];
 			row.description = r.message[0][24];
 			row.rate = r.message[0][25];;
 			row.tax_amount =  (r.message[0][2] * (r.message[0][25] / 100)) + (r.message[0][5] / tt * (r.message[0][25] / 100));
		cur_frm.refresh_field("taxes");
		
		
			var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][20];
 			row.description = r.message[0][20];
 			row.rate = r.message[0][21];
 			row.tax_amount = (r.message[0][2] * (r.message[0][21] / 100)) + (r.message[0][5] / tt * (r.message[0][21] / 100));
		cur_frm.refresh_field("taxes");
		
	}
	
	if(!frm.doc.self_rto_ && r.message[0][33] == "Hyundai"){	
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][22];
 			row.description = r.message[0][22];
 			row.rate = r.message[0][23];
 			row.tax_amount =  r.message[0][2] * (r.message[0][23] / 100);
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][24];
 			row.description = r.message[0][24];
 			row.rate = r.message[0][25];;
 			row.tax_amount =  r.message[0][2] * (r.message[0][25] / 100);
		cur_frm.refresh_field("taxes");
		
		
			var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][20];
 			row.description = r.message[0][20];
 			row.rate = r.message[0][21];
 			row.tax_amount = r.message[0][2] * (r.message[0][21] / 100);
		cur_frm.refresh_field("taxes");
		
	}
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = "BS-07 - TCS Payable - C";
 			row.description = "TCS";
 			row.rate = 1;
 			row.tax_amount = r.message[0][18];
		cur_frm.refresh_field("taxes");
		
	if(!frm.doc.self_rto_ && r.message[0][33] == "Hyundai"){	
		
		var ttt = ((r.message[0][27] + r.message[0][29]) / 100) + 1;
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][26];
 			row.description = r.message[0][26];
 			row.rate = r.message[0][27];
 			row.tax_amount =  ((r.message[0][11] / ttt) * (r.message[0][27] / 100)) + ((r.message[0][5] / ttt) * (r.message[0][27] / 100));
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][28];
 			row.description = r.message[0][28];
 			row.rate = r.message[0][29];
 			row.tax_amount =  ((r.message[0][11] / ttt) * (r.message[0][27] / 100)) + ((r.message[0][5] / ttt) * (r.message[0][27] / 100));
		cur_frm.refresh_field("taxes");
	}
	
	if(!frm.doc.self_rto_ && r.message[0][33] != "Hyundai"){	
		
		var ttt = ((r.message[0][27] + r.message[0][29]) / 100) + 1;
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][26];
 			row.description = r.message[0][26];
 			row.rate = r.message[0][27];
 			row.tax_amount =  (r.message[0][11] / ttt) * (r.message[0][27] / 100);
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][28];
 			row.description = r.message[0][28];
 			row.rate = r.message[0][29];
 			row.tax_amount =  (r.message[0][11] / ttt) * (r.message[0][27] / 100);
		cur_frm.refresh_field("taxes");
	}
	
		frm.save();
}
    });
}
}
});



frappe.ui.form.on('Sales Order',  'after_save',  function(frm) {
    if(frm.doc.gt == 0){
        frm.set_value("gt",frm.doc.grand_total);
    }
});
/*-----------------------------------------------------------------------------------------------------------------------------------*/


frappe.ui.form.on("Sales Order", {
  foc_amount: function(frm) {
    //frm.set_value("gt",frm.doc.grand_total);
    var b = ((frm.doc.od / (100 - frm.doc.tariff)) * (frm.doc.tariff_less - frm.doc.tariff)) + frm.doc.foc_amount;
    var a = (frm.doc.od / (100 - frm.doc.tariff)) * (frm.doc.tariff_less - frm.doc.tariff);
    var c = b + (a * 0.18);
    if(!frm.doc.no_basic_kit){
    if(c < frm.doc.discount_value){
    if(frm.doc.foc_amount <= frm.doc.std_foc){
	cur_frm.clear_table("items");
	cur_frm.clear_table("taxes");
	var total = 0;

    frappe.call({
    "method": "automobile.automobile.doctype.stock.get_data",
args: {
selling_price_list: frm.doc.selling_price_list,
item_code: frm.doc.car_template,
from_date: frm.doc.transaction_date
},
callback:function(r){
            frm.set_value("od",r.message[0][6]);
            frm.set_value("tariff",r.message[0][30]);
            frm.set_value("tariff_less",r.message[0][30]);
	    var row = frm.add_child("items");
			row.item_code = r.message[0][0];
			row.item_name = r.message[0][1];
			row.description = r.message[0][1];
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.is_base_item = 1;
			row.serial_no= frm.doc.serial;
			row.price_list_rate = r.message[0][2];
       		row.rate = r.message[0][2];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "Handling Charges";
			row.item_name = "Handling Charges";
			row.description = r.message[0][1];
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][5];
       		row.rate = r.message[0][5];
		cur_frm.refresh_field("items");
		
	if(!frm.doc.self_insurance){
	    
		var row = frm.add_child("items");
			row.item_code = "INSURANCE Own Damage";
			row.item_name = "INSURANCE Own Damage";
			row.description = "INSURANCE Own Damage";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][6];
       		row.rate = r.message[0][6];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE TP & Others";
			row.item_name = "INSURANCE TP & Others";
			row.description = "INSURANCE TP & Others";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][7];
       		row.rate = r.message[0][7];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE Zero Dep";
			row.item_name = "INSURANCE Zero Dep";
			row.description = "INSURANCE Zero Dep";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][8];
       		row.rate = r.message[0][8];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE GST";
			row.item_name = "INSURANCE GST";
			row.description = "INSURANCE GST";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][9];
       		row.rate = r.message[0][9];
		cur_frm.refresh_field("items");
		
	}
	
	if(!frm.doc.self_rto_){
	
		var row = frm.add_child("items");
			row.item_code = "RTO Tax";
			row.item_name = "RTO Tax";
			row.description = "RTO Tax";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][10];
       		row.rate = r.message[0][10];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "Passing Charges";
			row.item_name = "Passing Charges";
			row.description = "Passing Charges";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = (r.message[0][11] / 1.18);
       		row.rate = (r.message[0][11] / 1.18);
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "REGI. CHARGES";
			row.item_name = "REGI. CHARGES";
			row.description = "REGI. CHARGES";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][12];
       		row.rate = r.message[0][12];
		cur_frm.refresh_field("items");
		
    }	
    
        var row = frm.add_child("items");
			row.item_code = "CRTM Charges";
			row.item_name = "CRTM Charges";
			row.description = "CRTM Charges";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][31];
       		row.rate = r.message[0][31];
		cur_frm.refresh_field("items");
		
	if(!frm.doc.self_mtax){		
		
		var row = frm.add_child("items");
			row.item_code = "M. Tax";
			row.item_name = "M. Tax";
			row.description = "M. Tax";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][13];
       		row.rate = r.message[0][13];
		cur_frm.refresh_field("items");
	
	}
		
	if(!frm.doc.no_extended_warranty){	
		
		var row = frm.add_child("items");
			row.item_code = "Extended Warranty";
			row.item_name = "Extended Warranty";
			row.description = "Extended Warranty";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][14];
       		row.rate = r.message[0][14];
		cur_frm.refresh_field("items");
		
	}
	
	if(!frm.doc.no_rsa){
		
		var row = frm.add_child("items");
			row.item_code = "RSA CHARGES (1 YEAR)";
			row.item_name = "RSA CHARGES (1 YEAR)";
			row.description = "RSA CHARGES (1 YEAR)";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][15];
       		row.rate = r.message[0][15];
		cur_frm.refresh_field("items");
		
	}	
		
	if(!frm.doc.no_basic_kit){
	        if(frm.doc.foc_amount !== r.message[0][16]){    
		var row = frm.add_child("items");
			row.item_code = "BASIC KIT";
			row.item_name = "BASIC KIT";
			row.description = "BASIC KIT";
			row.delivery_date = frm.doc.delivery_date;
			row.discount_amount = frm.doc.foc_amount;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][16];
       		row.rate = (r.message[0][16] - frm.doc.foc_amount);
       		frm.set_value("discount_settled",frm.doc.foc_amount);
		cur_frm.refresh_field("items");
	
	    }        
	    }
	
	    if(!frm.doc.no_basic_kit){
	        if(frm.doc.foc_amount == r.message[0][16]){	
		var row = frm.add_child("items");
			row.item_code = "BASIC KIT";
			row.item_name = "BASIC KIT";
			row.description = "BASIC KIT";
			row.delivery_date = frm.doc.delivery_date;
			row.discount_amount = frm.doc.foc_amount;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][16];
       		row.rate = 0.0;
       		row.discount_percentage = 100;
       		frm.set_value("discount_settled",c);
		cur_frm.refresh_field("items");
	}
	}
	
	if(!frm.doc.no_fastag){
	    
		var row = frm.add_child("items");
			row.item_code = "FasTAG";
			row.item_name = "FasTAG";
			row.description = "FasTAG";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][17];
       		row.rate = r.message[0][17];
		cur_frm.refresh_field("items");
		
	}	
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][22];
 			row.description = r.message[0][22];
 			row.rate = r.message[0][23];
 			row.tax_amount =  r.message[0][2] * (r.message[0][23] / 100);
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][24];
 			row.description = r.message[0][24];
 			row.rate = r.message[0][25];;
 			row.tax_amount =  r.message[0][2] * (r.message[0][25] / 100);
		cur_frm.refresh_field("taxes");
		
		
			var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][20];
 			row.description = r.message[0][20];
 			row.rate = r.message[0][21];
 			row.tax_amount = r.message[0][2] * (r.message[0][21] / 100);
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = "BS-07 - TCS Payable - C";
 			row.description = "TCS";
 			row.rate = 1;
 			row.tax_amount = r.message[0][18];
		cur_frm.refresh_field("taxes");
		
	if(!frm.doc.self_rto_){	
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][26];
 			row.description = r.message[0][26];
 			row.rate = r.message[0][27];
 			row.tax_amount =  (r.message[0][11] / 1.18) * (r.message[0][27] / 100);
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][28];
 			row.description = r.message[0][28];
 			row.rate = r.message[0][29];
 			row.tax_amount =  (r.message[0][11] / 1.18) * (r.message[0][29] / 100);
		cur_frm.refresh_field("taxes");
	}
}
    });
}
}
}
	if(frm.doc.foc_amount > frm.doc.std_foc){
        frappe.throw("Foc Amount Can Not Be Greater Than Basic Kit Value")
    }
}

});

/*----------------------------------------------------------------------------------------------------------------------------------*/

frappe.ui.form.on("Sales Order", "tariff_less", function(frm) {
    var b = ((frm.doc.od / (100 - frm.doc.tariff)) * (frm.doc.tariff_less - frm.doc.tariff)) + frm.doc.foc_amount;
    var a = (frm.doc.od / (100 - frm.doc.tariff)) * (frm.doc.tariff_less - frm.doc.tariff);
    var c = b + (a * 0.18);
    if(!frm.doc.self_insurance){
    if(c < frm.doc.discount_value){
    cur_frm.clear_table("items");
	cur_frm.clear_table("taxes");
	var total = 0;

    frappe.call({
    "method": "automobile.automobile.doctype.stock.get_data",
args: {
selling_price_list: frm.doc.selling_price_list,
item_code: frm.doc.car_template,
from_date: frm.doc.transaction_date
},
callback:function(r){
            frm.set_value("od",r.message[0][6]);
            frm.set_value("tariff",r.message[0][30]);
	    var row = frm.add_child("items");
			row.item_code = r.message[0][0];
			row.item_name = r.message[0][1];
			row.description = r.message[0][1];
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.is_base_item = 1;
			row.serial_no= frm.doc.serial;
			row.price_list_rate = r.message[0][2];
       		row.rate = r.message[0][2];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "Handling Charges";
			row.item_name = "Handling Charges";
			row.description = r.message[0][1];
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][5];
       		row.rate = r.message[0][5];
		cur_frm.refresh_field("items");
		
	if(!frm.doc.self_insurance){	
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE Own Damage";
			row.item_name = "INSURANCE Own Damage";
			row.description = "INSURANCE Own Damage";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][6];
			row.discount_amount = a
       		row.rate = r.message[0][6] - a;
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE TP & Others";
			row.item_name = "INSURANCE TP & Others";
			row.description = "INSURANCE TP & Others";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][7];
       		row.rate = r.message[0][7];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE Zero Dep";
			row.item_name = "INSURANCE Zero Dep";
			row.description = "INSURANCE Zero Dep";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][8];
       		row.rate = r.message[0][8];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE GST";
			row.item_name = "INSURANCE GST";
			row.description = "INSURANCE GST";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.discount_amount = a * 0.18
			row.uom = "Nos";
			row.price_list_rate = r.message[0][9];
       		row.rate =  ((r.message[0][6] - a) + r.message[0][7] + r.message[0][8]) * 0.18;
		cur_frm.refresh_field("items");
		
	}	
	if(!frm.doc.self_rto_){
		
		var row = frm.add_child("items");
			row.item_code = "RTO Tax";
			row.item_name = "RTO Tax";
			row.description = "RTO Tax";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][10];
       		row.rate = r.message[0][10];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "Passing Charges";
			row.item_name = "Passing Charges";
			row.description = "Passing Charges";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = (r.message[0][11] / 1.18);
       		row.rate = (r.message[0][11] / 1.18);
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "REGI. CHARGES";
			row.item_name = "REGI. CHARGES";
			row.description = "REGI. CHARGES";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][12];
       		row.rate = r.message[0][12];
		cur_frm.refresh_field("items");
	
	}
	
	    var row = frm.add_child("items");
			row.item_code = "CRTM Charges";
			row.item_name = "CRTM Charges";
			row.description = "CRTM Charges";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][31];
       		row.rate = r.message[0][31];
		cur_frm.refresh_field("items");
		
	if(!frm.doc.self_mtax){		
		
		var row = frm.add_child("items");
			row.item_code = "M. Tax";
			row.item_name = "M. Tax";
			row.description = "M. Tax";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][13];
       		row.rate = r.message[0][13];
		cur_frm.refresh_field("items");
		
	}	
		
	if(!frm.doc.no_extended_warranty){	
		
		var row = frm.add_child("items");
			row.item_code = "Extended Warranty";
			row.item_name = "Extended Warranty";
			row.description = "Extended Warranty";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][14];
       		row.rate = r.message[0][14];
		cur_frm.refresh_field("items");
		
	}	
	
	if(!frm.doc.no_rsa){
		
		var row = frm.add_child("items");
			row.item_code = "RSA CHARGES (1 YEAR)";
			row.item_name = "RSA CHARGES (1 YEAR)";
			row.description = "RSA CHARGES (1 YEAR)";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][15];
       		row.rate = r.message[0][15];
		cur_frm.refresh_field("items");
		
	}	
	
	if(!frm.doc.no_basic_kit){	
	if(frm.doc.foc_amount !== r.message[0][16]){	
		var row = frm.add_child("items");
			row.item_code = "BASIC KIT";
			row.item_name = "BASIC KIT";
			row.description = "BASIC KIT";
			row.delivery_date = frm.doc.delivery_date;
			row.discount_amount = frm.doc.foc_amount;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][16];
       		row.rate = (r.message[0][16] - frm.doc.foc_amount);
       		frm.set_value("discount_settled",c);
		cur_frm.refresh_field("items");
	}
	}
	
	if(!frm.doc.no_basic_kit){
	if(frm.doc.foc_amount == r.message[0][16]){	
		var row = frm.add_child("items");
			row.item_code = "BASIC KIT";
			row.item_name = "BASIC KIT";
			row.description = "BASIC KIT";
			row.delivery_date = frm.doc.delivery_date;
			row.discount_amount = frm.doc.foc_amount;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][16];
       		row.rate = 0.0;
       		row.discount_percentage = 100;
       		frm.set_value("discount_settled",c);
		cur_frm.refresh_field("items");
	}
	}
	if(!frm.doc.no_fastag){	
		
		var row = frm.add_child("items");
			row.item_code = "FasTAG";
			row.item_name = "FasTAG";
			row.description = "FasTAG";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][17];
       		row.rate = r.message[0][17];
		cur_frm.refresh_field("items");
		
	}	
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][22];
 			row.description = r.message[0][22];
 			row.rate = r.message[0][23];
 			row.tax_amount =  r.message[0][2] * (r.message[0][23] / 100);
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][24];
 			row.description = r.message[0][24];
 			row.rate = r.message[0][25];;
 			row.tax_amount =  r.message[0][2] * (r.message[0][25] / 100);
		cur_frm.refresh_field("taxes");
		
		
			var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][20];
 			row.description = r.message[0][20];
 			row.rate = r.message[0][21];
 			row.tax_amount = r.message[0][2] * (r.message[0][21] / 100);
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = "BS-07 - TCS Payable - C";
 			row.description = "TCS";
 			row.rate = 1;
 			row.tax_amount = r.message[0][18];
		cur_frm.refresh_field("taxes");
		
	if(!frm.doc.self_rto_){	
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][26];
 			row.description = r.message[0][26];
 			row.rate = r.message[0][27];
 			row.tax_amount =  (r.message[0][11] / 1.18) * (r.message[0][27] / 100);
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][28];
 			row.description = r.message[0][28];
 			row.rate = r.message[0][29];
 			row.tax_amount =  (r.message[0][11] / 1.18) * (r.message[0][29] / 100);
		cur_frm.refresh_field("taxes");
	}
}
	
    });
    }
    }
    if(c > frm.doc.discount_value){
        frappe.throw("Discount Value Can Not Be Higher Then Discount Settled");
        
    }
});



/************************************************************************************************************************************/



frappe.ui.form.on("Sales Order", "apply_remaining_discount", function(frm) {
    if(!frm.doc.no_basic_kit){
        var b = ((frm.doc.od / (100 - frm.doc.tariff)) * (frm.doc.tariff_less - frm.doc.tariff)) + frm.doc.foc_amount;
    }
    if(!frm.doc.self_insurance){
    var a = (frm.doc.od / (100 - frm.doc.tariff)) * (frm.doc.tariff_less - frm.doc.tariff);
    }
    var c = b + (a * 0.18) || 0;
    var np = 0.0
    var discount_settled = 0.0;
    if(frm.doc.discount_value > frm.doc.discount_settled){
    cur_frm.clear_table("items");
	cur_frm.clear_table("taxes");
	
    frappe.call({
    "method": "automobile.automobile.doctype.stock.get_data",
args: {
selling_price_list: frm.doc.selling_price_list,
item_code: frm.doc.car_template,
from_date: frm.doc.transaction_date
},
callback:function(r){
        var value_dis = r.message[0][5] + r.message[0][31];
        if(!frm.doc.self_insurance){
            value_dis = value_dis + r.message[0][6]+ r.message[0][7]+ r.message[0][8]+ r.message[0][9]; 
        }
        if(!frm.doc.self_rto_){
            value_dis = value_dis + r.message[0][11] + r.message[0][12];  
        }
        if(!frm.doc.no_extended_warranty){
            value_dis = value_dis + r.message[0][14];  
        }
        if(!frm.doc.no_rsa){
            value_dis = value_dis + r.message[0][15];  
        }
        if(!frm.doc.no_basic_kit){
            value_dis = value_dis + r.message[0][16];  
        }
        if(!frm.doc.no_fastag){
            value_dis = value_dis + r.message[0][17];  
        }
        if(!frm.doc.self_mtax){
            value_dis = value_dis + r.message[0][32]  
        }
        var fix = (r.message[0][5] + r.message[0][6]+ r.message[0][7]+ r.message[0][8]+ r.message[0][9]+ r.message[0][11] + r.message[0][12]+ r.message[0][14]+ r.message[0][15] + r.message[0][16]+ r.message[0][17]) + 25;
        var dis = frm.doc.discount_value - c;
        //console.log("DIS = ",dis);
        var x = (dis * r.message[0][2]) / (frm.doc.gt - value_dis);
        discount_settled = discount_settled + x + c;
        //console.log("x",x);
        //console.log("dIS vALUE",value_dis);
        //console.log("FIX",fix);
	    var row = frm.add_child("items");
			row.item_code = r.message[0][0];
			row.item_name = r.message[0][1];
			row.description = r.message[0][1];
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.is_base_item = 1;
			row.price_list_rate = r.message[0][2];
			row.discount_amount = x
			row.serial_no= frm.doc.serial;
       		row.rate = r.message[0][2] - x;
       		np = r.message[0][2] - x;
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "Handling Charges";
			row.item_name = "Handling Charges";
			row.description = r.message[0][1];
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][5];
       		row.rate = r.message[0][5];
		cur_frm.refresh_field("items");
		
	if(!frm.doc.self_insurance){	
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE Own Damage";
			row.item_name = "INSURANCE Own Damage";
			row.description = "INSURANCE Own Damage";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][6];
			row.discount_amount = a
       		row.rate = r.message[0][6] - a;
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE TP & Others";
			row.item_name = "INSURANCE TP & Others";
			row.description = "INSURANCE TP & Others";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][7];
       		row.rate = r.message[0][7];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE Zero Dep";
			row.item_name = "INSURANCE Zero Dep";
			row.description = "INSURANCE Zero Dep";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][8];
       		row.rate = r.message[0][8];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE GST";
			row.item_name = "INSURANCE GST";
			row.description = "INSURANCE GST";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.discount_amount = a * 0.18
			row.uom = "Nos";
			row.price_list_rate = r.message[0][9];
       		row.rate =  ((r.message[0][6] - a) + r.message[0][7] + r.message[0][8]) * 0.18;
		cur_frm.refresh_field("items");
///////////		
	}

    if(!frm.doc.self_rto_){

	if(frm.doc.selling_price_list == "Corporate"){
		var row = frm.add_child("items");
			row.item_code = "RTO Tax";
			row.item_name = "RTO Tax";
			row.description = "RTO Tax";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.discount_amount = r.message[0][10] - (np * 0.12);
			row.price_list_rate = r.message[0][10];
       		row.rate = np * 0.12;
       		var rto = r.message[0][10] - (np * 0.12);
       		discount_settled = discount_settled + rto;
		cur_frm.refresh_field("items");
		}
		
		else{
		var row = frm.add_child("items");
			row.item_code = "RTO Tax";
			row.item_name = "RTO Tax";
			row.description = "RTO Tax";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][10];
       		row.rate = np * 0.06;
       		row.discount_amount = r.message[0][10] - (np * 0.06);
       		var rto = r.message[0][10] - (np * 0.06);
       		discount_settled = discount_settled + rto;
		cur_frm.refresh_field("items");
		}
		
		var row = frm.add_child("items");
			row.item_code = "Passing Charges";
			row.item_name = "Passing Charges";
			row.description = "Passing Charges";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = (r.message[0][11] / 1.18);
       		row.rate = (r.message[0][11] / 1.18);
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "REGI. CHARGES";
			row.item_name = "REGI. CHARGES";
			row.description = "REGI. CHARGES";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][12];
       		row.rate = r.message[0][12];
		cur_frm.refresh_field("items");
    } 
    
         var row = frm.add_child("items");
			row.item_code = "CRTM Charges";
			row.item_name = "CRTM Charges";
			row.description = "CRTM Charges";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][31];
       		row.rate = r.message[0][31];
		cur_frm.refresh_field("items");
    
    if(!frm.doc.self_mtax){	
    
        if(np > 299999 && np < 499999){
		var row = frm.add_child("items");
			row.item_code = "M. Tax";
			row.item_name = "M. Tax";
			row.description = "M. Tax";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.discount_amount = r.message[0][13] - ((np * 0.0175) + 25);
			row.price_list_rate = r.message[0][13];
       		row.rate = (np * 0.0175) + 25;
       		var mt = r.message[0][13] - ((np * 0.0175) + 25);
       		discount_settled = discount_settled + mt;
		cur_frm.refresh_field("items");
        }
        if(np > 499999 && np < 999999){
		var row = frm.add_child("items");
			row.item_code = "M. Tax";
			row.item_name = "M. Tax";
			row.description = "M. Tax";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][13];
       		row.rate = (np * 0.02) + 25;
       		row.discount_amount = r.message[0][13] - ((np * 0.02) + 25);
       		var mt = r.message[0][13] - ((np * 0.02) + 25);
       		discount_settled = discount_settled + mt;
		cur_frm.refresh_field("items");
        }
        if(np > 999999 && np < 1999999){
		var row = frm.add_child("items");
			row.item_code = "M. Tax";
			row.item_name = "M. Tax";
			row.description = "M. Tax";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][13];
       		row.rate = (np * 0.0225) + 25;
       		row.discount_amount = r.message[0][13] - ((np * 0.0225) + 25);
       		var mt = r.message[0][13] - ((np * 0.0225) + 25);
       		discount_settled = discount_settled + mt;
		cur_frm.refresh_field("items");
        }
        if(np > 1999999){
		var row = frm.add_child("items");
			row.item_code = "M. Tax";
			row.item_name = "M. Tax";
			row.description = "M. Tax";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][13];
       		row.rate = (np * 0.025) + 25;
       		row.discount_amount = r.message[0][13] - ((np * 0.025) + 25);
       		var mt = r.message[0][13] - ((np * 0.025) + 25);
       		discount_settled = discount_settled + mt;
		cur_frm.refresh_field("items");
        }
        
        if(np < 299999){
		var row = frm.add_child("items");
			row.item_code = "M. Tax";
			row.item_name = "M. Tax";
			row.description = "M. Tax";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][13];
       		row.rate = (np * 0.001) + 25;
       		row.discount_amount = r.message[0][13] - ((np * 0.001) + 25);
       		var mt = r.message[0][13] - ((np * 0.001) + 25);
       		discount_settled = discount_settled + mt;
		cur_frm.refresh_field("items");
        }
    }
    
    if(!frm.doc.no_extended_warranty){
        
		var row = frm.add_child("items");
			row.item_code = "Extended Warranty";
			row.item_name = "Extended Warranty";
			row.description = "Extended Warranty";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][14];
       		row.rate = r.message[0][14];
		cur_frm.refresh_field("items");
		
    }	
    
    if(!frm.doc.no_rsa){
		
		var row = frm.add_child("items");
			row.item_code = "RSA CHARGES (1 YEAR)";
			row.item_name = "RSA CHARGES (1 YEAR)";
			row.description = "RSA CHARGES (1 YEAR)";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][15];
       		row.rate = r.message[0][15];
		cur_frm.refresh_field("items");
		
    }	
		
	if(!frm.doc.no_basic_kit){	
	if(frm.doc.foc_amount !== r.message[0][16]){	
		var row = frm.add_child("items");
			row.item_code = "BASIC KIT";
			row.item_name = "BASIC KIT";
			row.description = "BASIC KIT";
			row.delivery_date = frm.doc.delivery_date;
			row.discount_amount = frm.doc.foc_amount;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][16];
       		row.rate = (r.message[0][16] - frm.doc.foc_amount);
		cur_frm.refresh_field("items");
	}
	
	if(frm.doc.foc_amount == r.message[0][16]){	
		var row = frm.add_child("items");
			row.item_code = "BASIC KIT";
			row.item_name = "BASIC KIT";
			row.description = "BASIC KIT";
			row.delivery_date = frm.doc.delivery_date;
			row.discount_amount = frm.doc.foc_amount;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][16];
       		row.rate = 0.0;
       		row.discount_percentage = 100;
		cur_frm.refresh_field("items");
	}
	}
	if(!frm.doc.no_fastag){		
		var row = frm.add_child("items");
			row.item_code = "FasTAG";
			row.item_name = "FasTAG";
			row.description = "FasTAG";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][17];
       		row.rate = r.message[0][17];
		cur_frm.refresh_field("items");
		
	}	
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][22];
 			row.description = r.message[0][22];
 			row.rate = r.message[0][23];
 			row.tax_amount =  (r.message[0][2] - x) * (r.message[0][23] / 100);
 			var t = ((r.message[0][2]) * (r.message[0][23] / 100)) - ((r.message[0][2] - x) * (r.message[0][23] / 100));
 			discount_settled = discount_settled + t + t;
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][24];
 			row.description = r.message[0][24];
 			row.rate = r.message[0][25];;
 			row.tax_amount =  (r.message[0][2] - x) * (r.message[0][25] / 100);
		cur_frm.refresh_field("taxes");
		
		
			var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][20];
 			row.description = r.message[0][20];
 			row.rate = r.message[0][21];
 			row.tax_amount = (r.message[0][2] - x) * (r.message[0][21] / 100);
 			var t2 = ((r.message[0][2]) * (r.message[0][21] / 100)) - ((r.message[0][2] - x) * (r.message[0][21] / 100));
 			discount_settled = discount_settled + t2;
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = "BS-07 - TCS Payable - C";
 			row.description = "TCS";
 			row.rate = 1;
 			row.tax_amount = r.message[0][18];
		cur_frm.refresh_field("taxes");
		
	if(!frm.doc.self_rto_){		
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][26];
 			row.description = r.message[0][26];
 			row.rate = r.message[0][27];
 			row.tax_amount =  (r.message[0][11] / 1.18) * (r.message[0][27] / 100);
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][28];
 			row.description = r.message[0][28];
 			row.rate = r.message[0][29];
 			row.tax_amount =  (r.message[0][11] / 1.18) * (r.message[0][29] / 100);
		cur_frm.refresh_field("taxes");
	}	
		
		frm.set_value("discount_settled",discount_settled);
		//console.log(discount_settled);
		//console.log((x + c + t + t + t2 + mt + rto));
		//frm.set_df_property('discount_value',  'read_only', 1);
		//frm.set_df_property('foc_amount',  'read_only', 1);
		//frm.set_df_property('tariff_less',  'read_only', 1);
	}
    });
    }
        if(frm.doc.discount_value <= frm.doc.discount_settled){
	        frappe.throw("Discount Already Settled");
	    }
});

frappe.ui.form.on("Sales Order", {
  discount_value: function(frm) {
	if(frm.doc.car_template){
	cur_frm.clear_table("items");
	cur_frm.clear_table("taxes");
	var total = 0;

    frappe.call({
    "method": "automobile.automobile.doctype.stock.get_data",
args: {
selling_price_list: frm.doc.selling_price_list,
item_code: frm.doc.car_template,
from_date: frm.doc.transaction_date
},
callback:function(r){
            frm.set_value("discount_settled",0);
            frm.set_value("foc_amount",0);
            frm.set_value("tariff_less",r.message[0][30]);
            frm.set_value("od",r.message[0][6]);
            frm.set_value("tariff",r.message[0][30]);
	    var row = frm.add_child("items");
			row.item_code = r.message[0][0];
			row.item_name = r.message[0][1];
			row.description = r.message[0][1];
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.is_base_item = 1;
			row.serial_no= frm.doc.serial;
			row.price_list_rate = r.message[0][2];
       		row.rate = r.message[0][2];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "Handling Charges";
			row.item_name = "Handling Charges";
			row.description = r.message[0][1];
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][5];
       		row.rate = r.message[0][5];
		cur_frm.refresh_field("items");
		
	if(!frm.doc.self_insurance){
	    
		var row = frm.add_child("items");
			row.item_code = "INSURANCE Own Damage";
			row.item_name = "INSURANCE Own Damage";
			row.description = "INSURANCE Own Damage";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][6];
       		row.rate = r.message[0][6];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE TP & Others";
			row.item_name = "INSURANCE TP & Others";
			row.description = "INSURANCE TP & Others";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][7];
       		row.rate = r.message[0][7];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE Zero Dep";
			row.item_name = "INSURANCE Zero Dep";
			row.description = "INSURANCE Zero Dep";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][8];
       		row.rate = r.message[0][8];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "INSURANCE GST";
			row.item_name = "INSURANCE GST";
			row.description = "INSURANCE GST";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_insurance = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][9];
       		row.rate = r.message[0][9];
		cur_frm.refresh_field("items");
		
	}
	
	if(!frm.doc.self_rto_){
	
		var row = frm.add_child("items");
			row.item_code = "RTO Tax";
			row.item_name = "RTO Tax";
			row.description = "RTO Tax";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][10];
       		row.rate = r.message[0][10];
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "Passing Charges";
			row.item_name = "Passing Charges";
			row.description = "Passing Charges";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = (r.message[0][11] / 1.18);
       		row.rate = (r.message[0][11] / 1.18);
		cur_frm.refresh_field("items");
		
		var row = frm.add_child("items");
			row.item_code = "REGI. CHARGES";
			row.item_name = "REGI. CHARGES";
			row.description = "REGI. CHARGES";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][12];
       		row.rate = r.message[0][12];
		cur_frm.refresh_field("items");
		
    }	
    
        var row = frm.add_child("items");
			row.item_code = "CRTM Charges";
			row.item_name = "CRTM Charges";
			row.description = "CRTM Charges";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.is_rto = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][31];
       		row.rate = r.message[0][31];
		cur_frm.refresh_field("items");
		
	if(!frm.doc.self_mtax){	
		
		var row = frm.add_child("items");
			row.item_code = "M. Tax";
			row.item_name = "M. Tax";
			row.description = "M. Tax";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][13];
       		row.rate = r.message[0][13];
		cur_frm.refresh_field("items");
		
	}	
		
	if(!frm.doc.no_extended_warranty){	
		
		var row = frm.add_child("items");
			row.item_code = "Extended Warranty";
			row.item_name = "Extended Warranty";
			row.description = "Extended Warranty";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][14];
       		row.rate = r.message[0][14];
		cur_frm.refresh_field("items");
		
	}	
	
	if(!frm.doc.no_rsa){
		
		var row = frm.add_child("items");
			row.item_code = "RSA CHARGES (1 YEAR)";
			row.item_name = "RSA CHARGES (1 YEAR)";
			row.description = "RSA CHARGES (1 YEAR)";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][15];
       		row.rate = r.message[0][15];
		cur_frm.refresh_field("items");
		
	}	
	
	if(!frm.doc.no_basic_kit){
		
		var row = frm.add_child("items");
			row.item_code = "BASIC KIT";
			row.item_name = "BASIC KIT";
			row.description = "BASIC KIT";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][16];
       		row.rate = r.message[0][16];
       		frm.set_value("std_foc",r.message[0][16]);
		cur_frm.refresh_field("items");
		
	}	
	
	if(!frm.doc.no_fastag){
		
		var row = frm.add_child("items");
			row.item_code = "FasTAG";
			row.item_name = "FasTAG";
			row.description = "FasTAG";
			row.delivery_date = frm.doc.delivery_date;
			row.qty = 1;
			row.uom = "Nos";
			row.price_list_rate = r.message[0][17];
       		row.rate = r.message[0][17];
		cur_frm.refresh_field("items");
		
	}	
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][22];
 			row.description = r.message[0][22];
 			row.rate = r.message[0][23];
 			row.tax_amount =  r.message[0][2] * (r.message[0][23] / 100);
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][24];
 			row.description = r.message[0][24];
 			row.rate = r.message[0][25];;
 			row.tax_amount =  r.message[0][2] * (r.message[0][25] / 100);
		cur_frm.refresh_field("taxes");
		
		
			var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][20];
 			row.description = r.message[0][20];
 			row.rate = r.message[0][21];
 			row.tax_amount = r.message[0][2] * (r.message[0][21] / 100);
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = "BS-07 - TCS Payable - C";
 			row.description = "TCS";
 			row.rate = 1;
 			row.tax_amount = r.message[0][18];
		cur_frm.refresh_field("taxes");
		
	if(!frm.doc.self_rto_){	
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][26];
 			row.description = r.message[0][26];
 			row.rate = r.message[0][27];
 			row.tax_amount =  (r.message[0][11] / 1.18) * (r.message[0][27] / 100);
		cur_frm.refresh_field("taxes");
		
		var row = frm.add_child("taxes");
			row.charge_type = "Actual";
 			row.account_head = r.message[0][28];
 			row.description = r.message[0][28];
 			row.rate = r.message[0][29];
 			row.tax_amount =  (r.message[0][11] / 1.18) * (r.message[0][29] / 100);
		cur_frm.refresh_field("taxes");
	}
}
    });
}
}
});

frappe.ui.form.on("Sales Order", {
  car_template: function(frm) {
	
    frappe.call({
    "method": "automobile.automobile.doctype.stock.SerailNO",
args: {
company: frm.doc.company,    
item_code: frm.doc.car_template
},
callback:function(r){
	console.log(r.message[0][0]);
	frm.set_value("set_warehouse",r.message[0][1]);
	frm.set_value("serial",r.message[0][0]);
	}
    });
}
});

frappe.ui.form.on("Sales Order", {
  onload: function(frm) {
	if(frm.doc.__islocal){
    frappe.call({
    "method": "automobile.automobile.doctype.stock.getAlloted",
args: {
company: frm.doc.company
},
callback:function(r){
	frm.set_value("set_source_warehouse",r.message[0][0]);
	}
    });
}
}
});

frappe.ui.form.on("Sales Order", {
  company: function(frm) {
    frappe.call({
    "method": "automobile.automobile.doctype.stock.getAlloted",
args: {
company: frm.doc.company
},
callback:function(r){
	frm.set_value("set_source_warehouse",r.message[0][0]);
	}
    });
}
});
