import { dispatchRemoveFromCommitEvent } from "./destinationTableEventDispatcher.js"
import { removeSelectedRowsFromTable, updateRow } from "./destinationTableHelper.js"

const DestinationTableMixin = BaseClass =>
  class extends BaseClass {
    /******************************************************************************************
     * "ADD ROWS" action
     */

    /**
     * Add rows selectd in other table to this Commit table
     *
     * @param {*} event
     */
    addRows(rows) {
      for (const data of rows) {
        // Get the row which matches the unique _id
        const tableRow = this.tableRowById(data._id)

        // update existing rows ...
        if (tableRow.any()) {
          updateRow(this, tableRow, data)
        }

        // ... or add new rows if they did not already exist
        else {
          this.oDataTable.rows.add([data]).draw()
        }
      }

      // return nb rows
      return this.oDataTable.data().count()
    }

    /******************************************************************************************
     * "REMOVE SELECTED ROWS" action
     */

    /**
     * Called from the "Remove" button in Console : entry point
     */
    removeRowsFromTable() {
      dispatchRemoveFromCommitEvent(this)
      removeSelectedRowsFromTable(this)
    }

    /******************************************************************************************
     * "COMMIT" action
     */
    getData() {
      return this.oDataTable.rows().data()
    }
  }

export default DestinationTableMixin
