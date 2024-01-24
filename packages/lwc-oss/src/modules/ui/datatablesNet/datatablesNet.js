import { LightningElement, api } from "lwc"

import { initDatatable } from "./datatablesNetHelper"

const DEFAULT_ROWID = "_id"

export default class DatatablesNet extends LightningElement {
  /**
   * Configuration options for the data table, such as : columns, dom, buttons, rowId, order
   */

  options

  /**
   * {boolean} Display a footer in in table columns for search
   */

  footerSearch

  /**
   * {DataTable} Datatables.net data table
   */

  _oDataTable
  @api get oDataTable() {
    return this._oDataTable
  }

  /***************************************************************************************************
   * INITIALISE
   */

  /*
  _rendered = false
  async renderedCallback() {
    const debug = true

    if (!this._rendered) {
      this._rendered = true

      if (debug) console.log("#### datatablesNet.renderedCallback", this.value)

      initDatatable(this)
    }
  }
  */

  @api initDatatable(that) {
    initDatatable(that)
  }

  disconnectedCallback() {
    this.oDataTable.destroy()
    this._rendered = false
  }

  errorCallback(error, stack) {
    console.error("console ERROR", error, stack)
  }

  /***************************************************************************************************
   * METHODS TO DISPLAY Datatables.net DATA
   */

  /**
   * Find one table row by its _id field value
   *
   * @param {String} id
   *
   * @returns
   */

  tableRowById(id) {
    return this.oDataTable.row((idx, data) => data[DEFAULT_ROWID] === id)
  }

  /**
   * Find multiple table rows by their _id field values
   *
   * @param {Array[String]} ids
   *
   * @returns
   */

  tableRowsByIds(ids) {
    return this.oDataTable.rows((idx, data) => ids.includes(data[DEFAULT_ROWID]))
  }
}
