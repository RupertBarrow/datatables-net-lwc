import { api } from "lwc"

import DatatablesNet from "ui/datatablesNet"

import SourceTableMixin from "./sourceTableMixin"
import DestinationTableMixin from "./destinationTableMixin"

export default class MyDatatableNet extends SourceTableMixin(DestinationTableMixin(DatatablesNet)) {
  @api value // name (in the form of a key)
  @api type // eg "changeset", "metadata"

  transformer
  @api changesetName = ""

  @api init(options) {
    const debug = false

    this.name = options.name
    this.options = options
    this.footerSearch = options.footerSearch
    this.transformer = options.transformer

    this.initDatatable(this)
  }

  /******************************************************************************************
   * DESTINATION TABLE actions
   */

  /**
   * Add rows selectd in other table to this (destination) table
   *
   * @param {*} event
   */
  @api
  doAddRows(rows) {
    this.addRows(rows)
  }

  /**
   * Remove selected lines from the (destination) table
   */
  @api
  doRemoveRowsFromTable() {
    this.removeRowsFromTable()
  }

  /**
   * Return the Datatable data
   *
   * @returns {Api} oDataTable.rows().data
   */
  @api
  doGetData() {
    return this.getData()
  }

  /******************************************************************************************
   * SOURCE TABLE actions
   */

  /**
   * Called from the "Add" button in Console : entry point
   */
  @api
  doAddToCommitTable() {
    this.addToCommitTable()
  }

  @api
  doCheckRowsAddedToCommit(rows, destinationTabName) {
    this.checkRowsAddedToCommit(rows, destinationTabName)
  }

  /**
   * Uncheck rows removed from the Commit table
   *
   * @param {Array<string>} rowKeys
   */
  @api
  doUncheckRowsRemovedFromCommit(rowKeys) {
    this.uncheckRowsRemovedFromCommit(rowKeys)
  }
}
