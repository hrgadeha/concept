var lat = "";
var long = "";

frappe.ui.form.on('Attendance', {
	onload(frm) {
	    navigator.geolocation.getCurrentPosition(success);
	    function success(pos) {
            var crd = pos.coords;
            lat = crd.latitude;
            long = crd.longitude;

	    if(frm.doc.docstatus === 0){
			frm.set_value("latitude",lat);
	        frm.set_value("longitude",long);
	    }
	    }
	}
});

frappe.ui.form.on("Attendance", "google_map", function(frm) {
   window.open("http://www.google.com/maps/place/" + lat + "," + long);
});
