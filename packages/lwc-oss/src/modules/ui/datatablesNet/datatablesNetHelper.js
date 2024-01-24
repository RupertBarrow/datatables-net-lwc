/* global $ */
//import $ from "jquery"
//import "datatables.net-bs5"
import "datatables.net-buttons-bs5"
import "datatables.net-select-bs5"

const DEFAULT_TABLE = '<table lwc:dom="manual" class="tableCls slds-table slds-table_cell-buffer slds-table_bordered stripe table-striped" style="width: 100%">FOOTERSEARCH</table>'
const DEFAULT_DOM = "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>><'row'<'col-sm-12 col-md-6'i><'col-sm-12 col-md-6'p>>"
const FOOTERSEARCH_KEYWORD = "FOOTERSEARCH"
const DEFAULT_ORDER = [[1, "asc"]]

const DEFAULT_ROWID = "_id"

/**
 * Initialise the Datatables.net data table
 */

export async function initDatatable(that) {
  const debug = true

  if (debug) console.log("DatatablesNet.initTable THAT", that)

  // Create HTML table
  // see https://datatables.net/forums/discussion/75457/cant-get-select-initialized#latest
  let container = that.template.querySelector("div")
  let table = $(_prepareTableColumnSearch(DEFAULT_TABLE, that.options?.columns, that.footerSearch))
  table.appendTo(container)

  // Add search boxes to the table footer
  if (that.footerSearch) {
    $("table tfoot th").each(function () {
      var title = $(that).text()
      $(that).html('<input type="text" placeholder="Search ' + title + '" />')
    })
  }

  const options = that.options
  if (debug) console.log("DatatablesNet.initTable  OPTIONS", options)

  // prettier-ignore
  that._oDataTable = $(table)
    .DataTable({
      data: [],
      //data: loadData(that, "noOptions"),
      deferRender: true,
      select: true,
      columns: options.columns,
      buttons: options.buttons || [],
      dom:     options.dom     || DEFAULT_DOM,
      rowId:   options.rowId   || DEFAULT_ROWID,
      order:   options.order   || DEFAULT_ORDER,

      initComplete: function () {
        if(debug) console.log("DatatablesNet DOFOOTERSEARCH", that.name, that.footerSearch)

        // Apply the search function to the footer of each column
        if (that.footerSearch) {
          this.api()
            .columns()
            .every(function () {
              const column = this
              //if(debug) console.log("DatatablesNet.initComplete COLUMN FOOTER", column.footer())
              // TODO : make search in column footer work again
              if (column.footer()) {
                $("input", column.footer()).on("keyup change clear", function () {
                  if (column.search() !== this.value) {
                    column.search(this.value).draw()
                  }
                })
              }
              return column
            })
        }
      },

      rowCallback: function (row, data) {
        if (data._isInCommit) {
          $(row).addClass("isInCommit")
          $(row).removeClass("isNotInCommit")
        } else {
          $(row).addClass("isNotInCommit")
          $(row).removeClass("isInCommit")
        }
      },

    })

    .on("select", function () {
      that.dispatchEvent(new CustomEvent("rowselection"))
    })

    .on("deselect", function () {
      that.dispatchEvent(new CustomEvent("rowselection"))
    })
}

/***************************************************************************************************
 * PRIVATE
 */

// INIT TABLE

/**
 * If we want to doFooterSearch, we will add a <tfoot> section to the bottom of the table,
 * and add a <th> element for each column of the Datatable. This is done by replacing the keyword FOOTERSEARCH
 * in the string describing the table, with these <tfoot> and <th> elements.
 *
 * @param {string} columns
 * @param {boolean} doFooterSearch
 *
 * @returns {string} this defines the HTML table which will support the Datatable (see the DEFAULT_TABLE constant)
 */

function _prepareTableColumnSearch(table, columns, doFooterSearch) {
  if (doFooterSearch) {
    return table.replace(FOOTERSEARCH_KEYWORD, "<tfoot><tr>" + columns.map(col => `<th>${col.title}</th>`).join("") + "</tr></tfoot>")
  }

  return table.replace(FOOTERSEARCH_KEYWORD, "")
}
