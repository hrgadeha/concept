# -*- coding: utf-8 -*-
# Copyright (c) 2019, Hardik Gadesha and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class FollowUpTable(Document):
	pass

@frappe.whitelist(allow_guest=True)
def getRemarks(lead):
	li=[]
	dic=frappe.db.sql("""select ev.name,ev.description,ev.starts_on from `tabEvent` ev, `tabEvent Participants` ep 
			where ep.reference_doctype = 'Lead' and ep.reference_docname = '"+str(lead)+"';""",as_dict=True)
	for i in dic:
		name,starts_on,description=i['name'],i['starts_on'],i['description']
		li.append([name,starts_on,description])
	return li
