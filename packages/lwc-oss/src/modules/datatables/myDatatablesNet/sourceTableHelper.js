/******************************************************************************************
 * "REMOVE FROM COMMIT TABLE" action
 */

/**
 * Uncheck checkbox in source rows removed from destination tables
 *
 * @param {*} that
 * @param {*} rowKeys
 */

export function uncheckCheckboxOnRowsRemovedFromCommitTable(that, rowKeys) {
  //console.log("in uncheckCheckboxOnRowsRemovedFromCommitTable()", that, rowKeys)

  for (const key of rowKeys.toArray()) {
    const tableRow = that.tableRowById(key)
    //console.log("in uncheckCheckboxOnRowsRemovedFromCommitTable() : row", tableRow, tableRow?.data())

    if (tableRow.any()) {
      tableRow.data()._isInCommit = false
      tableRow.data()._isInCommitTabName = ""
      tableRow.invalidate()
    }
  }

  that.oDataTable.draw()
}

/**
 * Make "Added ?" column visibles
 *
 * @param {Datatable} dt
 */

export function showAddToCommitColumn(dt) {
  //console.log("in _showAddToCommitColumn()", this)

  const lastColumn = dt.columns().indexes().length - 1
  dt.column(lastColumn).visible(true)
}

/**
 * Check the _isInCommit column on these rows
 *
 * @param {*} tableRows
 */

export function updateEveryRow(destinationTabName, tableRows) {
  tableRows.every(function (/* rowIdx, tableLoop, rowLoop */) {
    return updateIsInCommitOnOneRow(true, destinationTabName, this)
  })
}

export function updateIsInCommitOnOneRow(isInCommit, isInCommitTabName, row) {
  row.data()._isInCommit = isInCommit
  row.data()._isInCommitTabName = isInCommitTabName
  row.invalidate()
  row.draw()
  //console.log("in doCheckRowsAddedToCommit() : row", row.data())

  return null
}
