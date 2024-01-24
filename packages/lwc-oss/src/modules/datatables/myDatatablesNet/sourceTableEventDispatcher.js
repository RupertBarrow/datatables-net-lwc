/**
 * Dispatch event to add selected rows to the Commit table
 *
 * @param {string} eventName : "addidstocommit" or "addrowstocommit"
 * @param {*} dt
 */

export function dispatchAddToCommitEvent(that, eventName, tableRows) {
  const newRows = tableRows
    .data()
    .toArray()
    //.map(row => that.transformSourceRowToCommitRow(row)) // implemented in derived class
    .map(row => (that.transformer ? that.transformer(row) : row)) // implemented in derived class
  //console.log("in _dispatchAddToCommitEvent()", eventName, that, tableRows.data().toArray(), newRows)

  // Send the event
  that.dispatchEvent(new CustomEvent(eventName, { detail: newRows }))
}
