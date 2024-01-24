/**
 * Update button status fynamically
 *
 * @param {*} that
 * @param {*} event
 */
export function updateButtonsStatus(that, event) {
  const debug = true

  if (debug) console.log("### updateButtonsStatus START", event, that.table2, that.table2?.oDataTable)

  // Updated from row selection changes
  if (event) {
    const sourceTableNbRows = that.table1?.oDataTable.rows({ selected: true, _isInCommit: undefined }).count()
    const destinationTableNbRows = that.table2?.oDataTable.rows({ selected: true }).count()

    that.addButtonDisabled = sourceTableNbRows === 0
    that.removeButtonDisabled = !(destinationTableNbRows > 0)
  }
  // Initialization
  else {
    that.addButtonDisabled = that.removeButtonDisabled = true
  }

  if (debug) console.log("### updateButtonsStatus END")
}
