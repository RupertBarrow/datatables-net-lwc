/******************************************************************
 * Configure source and destination tables
 */

const sourceMemberTransformer = row => {
  return {
    name: row.MemberName,
    type: row.MemberType,
    isObsolete: row.IsNameObsolete,
    isDeleted: row.IsDeleted,
    isNew: row.IsNewMember,

    lastModifiedDate: "",
    lastModifiedByName: "",
    createdDate: "",
    createdByName: "",

    _id: row.MemberType + "__" + row.MemberName,
  }
}

// prettier-ignore
export const optionsTable1 = {
  name:"table1",
  order: [[1, "asc"]],
  columns: [
    { data: "MemberName",     title: "Name" },
    { data: "MemberType",     title: "Type" },
    { data: "IsNameObsolete", title: "Obsolete ?", render: asCheckbox },
    { data: "IsDeleted",      title: " Deleted ?", render: asCheckbox },
    { data: "IsNewMember",    title: "New ?",      render: asCheckbox },
    { data: "_isInCommit",    title: "Added ?",    render: asCheckbox, visible: false }, // Hidden, until some rows are selected and added to the Commit table
  ],
  footerSearch: true,
  transformer: sourceMemberTransformer
}

// prettier-ignore
export const optionsTable2 = {
  name:"table2",
  columns: [
    { data: "name",               title: "Name",                          },
    { data: "type",               title: "Type"                           },
    { data: "isObsolete",         title: "Obsolete ?", render: asCheckbox },
    { data: "isDeleted",          title: "Deleted ?",  render: asCheckbox },
    { data: "isNew",              title: "New ?",      render: asCheckbox },
    { data: "lastModifiedByName", title: "Modified by"                    },
  ],
}

function asCheckbox(data) {
  if (data === true || data === "true") {
    return '<input type="checkbox" checked disabled>'
  }
  return ""
}
