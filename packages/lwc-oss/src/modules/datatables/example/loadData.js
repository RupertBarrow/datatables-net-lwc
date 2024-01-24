/**
 * Load data into the oDataTable :
 * - any lines which have been selected remain untouched
 * - all other lines are removed and replaced
 * - new lines, previously unknown, are added
 *
 * @param {*} that
 * @param {*} options
 */

export async function loadData(table, mydata) {
  const debug = true

  if (debug) console.log("###### loadData START DATA", mydata)

  if (mydata && mydata.length > 0) {
    // Clear the datatable of lines which have not been added to destination
    const rowsSelected = table.oDataTable.rows((idx, data, node) => data._isInCommit)
    const savedData = rowsSelected.data().toArray()
    table.oDataTable.rows().remove().draw()

    // Load all data into the table
    table.oDataTable.rows.add(mydata).draw()

    // Update the loaded data from the saved data
    // For each row in the oDataTable, update the _isInCommit attribute from the savedData
    if (debug) console.log("DatatablesNet.loadData SAVEDDATA", savedData)
    if (debug) console.log("DatatablesNet.loadData NEWDATA", table.oDataTable.rows().data().toArray())

    table.oDataTable.rows().every(function (rowIdx, tableLoop, rowLoop) {
      const row = this
      const data = row.data()
      const savedRow = savedData.find(row => row._id === data._id)
      if (savedRow) {
        row.data()._isInCommit = savedRow._isInCommit // true
        row.data()._isInCommitTabName = savedRow._isInCommitTabName
        row.invalidate()
        row.draw()

        if (debug) console.log("DatatablesNet.loadData SAVEDROW", savedRow)
      }
    })

    table.oDataTable.rows().draw()
  }
}
