# -*- coding: utf-8 -*-
# Copyright (c) 2020, Hardik Gadesha and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class ReceivedOEMClaim(Document):
	def on_submit(self):
		self.status = "Received"
		self.save()
		for i in self.transaction_records:
			si = frappe.get_list('Sales Invoice', filters={'serial': i.chassis_number}, fields=['name'])
			for d in si:
				sinv = frappe.get_doc("Sales Invoice",d)
				sinv.oem_claim_received = 1
				sinv.save()

	def on_cancel(self):
		for i in self.transaction_records:
			si = frappe.get_list('Sales Invoice', filters={'serial': i.chassis_number}, fields=['name'])
			for d in si:
				sinv = frappe.get_doc("Sales Invoice",d)
				sinv.oem_claim_received = 0
				sinv.save()
