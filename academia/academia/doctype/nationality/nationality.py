# Copyright (c) 2024, SanU and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import re
from frappe import _

class Nationality(Document):
    pass
    # def validate(self):
    #     if not re.match("^[a-zA-Z ]*$", self.nationality_name):
    #         frappe.throw(_("Nationality name should only contain letters."))