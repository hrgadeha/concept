# -*- coding: utf-8 -*-
# Copyright (c) 2019, Hardik Gadesha and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import msgprint
from frappe.model.document import Document

class TestDrive(Document):
	pass

def createTestDrive(doc,method):
	if doc.has_test_drive_details and not doc.test_drive_record_created:
		td = frappe.get_doc({
		"doctype": "Test Drive",
		"lead": doc.name,
		"test_drive_offered": doc.test_drive_offered,
		"test_drive_taken": doc.test_drive_taken,
		"feedback_taken":doc.feedback_taken,
		"entered_in_gdms": doc.entered_in_gdms,
		"date__time": doc.date__time,
		"duration": doc.duration,
		"location": doc.location,
		"model": doc.model,
		"company": doc.company
		})
		td.insert(ignore_permissions=True)
		td.save()
		td.submit()
		doc.test_drive_record_created = 1
		frappe.msgprint("Test Drive Entry Created")

