export function dispatchRemoveFromCommitEvent(that) {
  // Construct data of selected rows to send to the Source Member table
  const tableRowIds = that.oDataTable
    .rows({ selected: true })
    .data()
    .map(row => row._id)

  // Send the event
  that.dispatchEvent(new CustomEvent("removefromcommit", { detail: tableRowIds }))
}
