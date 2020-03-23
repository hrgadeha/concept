# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from . import __version__ as app_version

app_name = "automobile"
app_title = "Automobile"
app_publisher = "Hardik Gadesha"
app_description = "App for Automobile Industry"
app_icon = "octicon octicon-file-directory"
app_color = "grey"
app_email = "hardikgadesha@gmail.com"
app_license = "MIT"

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/automobile/css/automobile.css"
# app_include_js = "/assets/automobile/js/automobile.js"

# include js, css files in header of web template
# web_include_css = "/assets/automobile/css/automobile.css"
# web_include_js = "/assets/automobile/js/automobile.js"

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}

doctype_js = {
	"Sales Order" : "public/js/sales_order.js",
	"Delivery Note" : "public/js/delivery_note.js",
	"Item Price" : "public/js/item_price.js",
	"Lead" : "public/js/lead.js",
	"Attendance" : "public/js/attendance.js"
}



# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
#	"Role": "home_page"
# }

# Website user home page (by function)
# get_website_user_home_page = "automobile.utils.get_home_page"

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Installation
# ------------

# before_install = "automobile.install.before_install"
# after_install = "automobile.install.after_install"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "automobile.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
	"Lead": {
		"autoname": "automobile.automobile.doctype.test_drive.test_drive.createTestDrive",
		"validate": "automobile.automobile.doctype.test_drive.test_drive.createTestDrivee"
	},
	"Sales Order": {
		"on_submit": "automobile.automobile.doctype.stock.transferStock",
		"on_cancel": "automobile.automobile.doctype.stock.cancelSO"
	},
	"Stock Entry": {
                "on_submit": "automobile.automobile.doctype.stock.updateSO"
        }
}

fixtures = ["Custom Field", "Role"]

# Scheduled Tasks
# ---------------

# scheduler_events = {
# 	"all": [
# 		"automobile.tasks.all"
# 	],
# 	"daily": [
# 		"automobile.tasks.daily"
# 	],
# 	"hourly": [
# 		"automobile.tasks.hourly"
# 	],
# 	"weekly": [
# 		"automobile.tasks.weekly"
# 	]
# 	"monthly": [
# 		"automobile.tasks.monthly"
# 	]
# }

# Testing
# -------

# before_tests = "automobile.install.before_tests"

# Overriding Whitelisted Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "automobile.event.get_events"
# }

