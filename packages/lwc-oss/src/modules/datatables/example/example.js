import { LightningElement, api, track } from "lwc"

import { updateButtonsStatus } from "./buttonStatus"
import { optionsTable1, optionsTable2 } from "./configuration"
import { loadData } from "./loadData"
import mydata from "./data.js"

/**
 * Main application screen
 *
 * @api parameters :
 * - activeMenuName {String} : name of the active menu (eg "manifest" or "changeset1")
 *
 */
export default class Example extends LightningElement {
  @track error
  @track stack

  /******************************************************************************************************
   * INITIALISATION
   */

  table1
  table2

  _isRendered = false
  async renderedCallback() {
    if (this._isRendered === false) {
      this._isRendered = true

      // Initialize source tabs : prepare them to load data
      this.table1 = this.initTable("table1", optionsTable1)
      this.table2 = this.initTable("table2", optionsTable2)

      // Load data into the source table
      loadData(this.table1, mydata)

      // Update buttons' status which is dynamic
      updateButtonsStatus(this)
    }
  }

  initTable(tableId, options) {
    const table = this.template.querySelector(`datatables-my-datatables-net[data-id=${tableId}]`)
    table.init(options)
    return table
  }

  /******************************************************************************************************
   * BUTTON ACTIONS : ADD and REMOVE FROM COMMIT
   */

  /**
   * Add rows to the destination table
   * This is called from the "Add" button in the console.
   */
  doAddToCommit() {
    this.table1.doAddToCommitTable()
  }

  /**
   * Uncheck rows removed from the Commit table (table2)
   * This is called from the Remove button in the console.
   * It generates a "removefromcommit" event (a list of ids to be removed) which is handled by handleRemoveRowsFromCommit()
   */

  doRemoveFromCommit() {
    this.table2.doRemoveRowsFromTable(this)
  }

  /******************************************************************************************************
   * ENABLE or DISABLE BUTTONS
   */

  @track addButtonDisabled
  @track removeButtonDisabled

  /******************************************************************************************************
   * HANDLE EVENTS received on SOURCE (table1)
   */

  handleAddRowsToCommit(event) {
    event.preventDefault()
    this.table2.doAddRows(event.detail)
  }

  handleAddIdsToCommit(event) {
    this.table1.doCheckRowsAddedToCommit(event.detail, this.activeSourceTabName)
  }

  /******************************************************************************************************
   * HANDLE EVENTS received on DESTINATION (table2)
   */

  handleRemoveRowsFromCommit(event) {
    event.preventDefault()
    this.table1.doUncheckRowsRemovedFromCommit(event.detail)
  }

  /******************************************************************************************************
   * HANDLE EVENTS received on BOTH
   */

  handleRowSelections(event) {
    updateButtonsStatus(this, event)
  }
}
