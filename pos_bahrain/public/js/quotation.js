frappe.ui.form.on('Quotation', {
  refresh: function (frm) {
    _create_custom_buttons(frm);
    query_override(frm);
  },
  quotation_to: function(frm) {
    query_override(frm);
  }
});

function _create_custom_buttons(frm) {
  if (frm.doc.docstatus === 1 && frm.doc.status !== 'Lost') {
    if (
      !frm.doc.valid_till ||
      frappe.datetime.get_diff(
        frm.doc.valid_till,
        frappe.datetime.get_today()
      ) > 0
    ) {
      frm.add_custom_button(
        __('Sales Invoice'),
        () => _make_sales_invoice(frm),
        __('Create')
      );
    }
  }
}

function _make_sales_invoice(frm) {
  frappe.model.open_mapped_doc({
    method: 'pos_bahrain.api.quotation.make_sales_invoice',
    frm,
  });
}

function query_override(frm){
  if(cur_frm.doc.quotation_to == "Customer"){
      frm.set_query("party_name", function(){
      return {
        query: "pos_bahrain.api.quotation.link_query_override",
      };
      });
  }
}