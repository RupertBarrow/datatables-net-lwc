import { dispatchAddToCommitEvent } from "./sourceTableEventDispatcher.js"
import { uncheckCheckboxOnRowsRemovedFromCommitTable, showAddToCommitColumn, updateEveryRow } from "./sourceTableHelper.js"

const SourceTableMixin = BaseClass =>
  class extends BaseClass {
    /******************************************************************************************
     * "ADD TO COMMIT TABLE" action
     */

    /**
     * Called from the "Add" button in Console : entry point
     */
    addToCommitTable() {
      // Send the event list of selected rows (_ids)
      const tableRows = this.oDataTable.rows({ selected: true })
      //console.log("in doAddToCommitTable()", this, tableRows.data().toArray())

      dispatchAddToCommitEvent(this, "addidstocommit", tableRows)

      // Deselect the selected rows
      this.oDataTable.rows().deselect()
    }

    checkRowsAddedToCommit(rows, destinationTabName) {
      const tableRows = this.tableRowsByIds(rows.map(row => row._id))
      //console.log("in doCheckRowsAddedToCommit()", this, rows)

      // Show the InInCommit column in the source table
      showAddToCommitColumn(this.oDataTable)

      // Check the _IsInCommit column on these rows
      updateEveryRow(destinationTabName, tableRows)
      //this.oDataTable.draw()

      // Send the data of the rows to the Commit table
      dispatchAddToCommitEvent(this, "addrowstocommit", tableRows)
    }

    /**
     * Uncheck rows removed from the Commit table
     *
     * @param {Array<string>} rowKeys
     */
    uncheckRowsRemovedFromCommit(rowKeys) {
      //console.log("in Metadata.doUncheckRowsRemovedFromCommit()", this, rowKeys)
      uncheckCheckboxOnRowsRemovedFromCommitTable(this, rowKeys)
    }
  }

export default SourceTableMixin
