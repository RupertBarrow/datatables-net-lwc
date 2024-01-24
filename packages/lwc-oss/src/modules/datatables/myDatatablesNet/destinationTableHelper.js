/**
 * Remove selected rows
 *
 * @param {*} dt
 */

export function removeSelectedRowsFromTable(that) {
  that.oDataTable.rows({ selected: true }).remove()
  that.oDataTable.draw(false)
}

/**
 * Update the data of an existing row in the table :
 * - replace each field value by the new data (if it is not undefined or blank string)
 *
 * @param {Api} tableRow
 * @param {Object} newData
 */

export function updateRow(that, tableRow, newData) {
  let data = tableRow.data()

  for (const fieldName in newData) {
    if (newData[fieldName]) {
      data[fieldName] = newData[fieldName]
    }
  }

  // Add new row and remove old row, because I cannot get tableRow.data(data).draw() to work
  that.oDataTable.rows.add([data]).draw()
  tableRow.remove().draw()
}
