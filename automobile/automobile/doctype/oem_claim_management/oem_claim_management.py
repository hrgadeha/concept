# -*- coding: utf-8 -*-
# Copyright (c) 2020, Hardik Gadesha and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class OEMClaimManagement(Document):
	def on_submit(self):
		self.status = "Claim Pending"
		self.save()

	def on_update_after_submit(self):
		if self.status == "Claim Completed":
			for i in self.oem_claim_management_table:
				if not i.manual_claimed:
					si = frappe.get_list('Sales Invoice', filters={'serial': i.chassis_number}, fields=['name'])
					for d in si:
						sinv = frappe.get_doc("Sales Invoice",d)
						sinv.oem_claimed = 1
						sinv.save()


	def on_cancel(self):
		for i in self.oem_claim_management_table:
			if not i.manual_claimed:
				si = frappe.get_list('Sales Invoice', filters={'serial': i.chassis_number}, fields=['name'])
				for d in si:
					sinv = frappe.get_doc("Sales Invoice",d)
					sinv.oem_claimed = 0
					sinv.save()
