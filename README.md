# Datatbles.net in LWC

See 2 examples for this implementation on platform and off platform.

## 1. Datatables.net in LWC on platform

Implementation example of an LWC web application on the Salesforce platform using the datatables-net-lwc component which is an integration of Datatables.net in LWC (see https://datatables.net).

### Source code for the DatatablesNet component

The example is in the `packages/lwc-platform/force-app/datatables_net` folder.
The LWC component is there in `lwc/jQueryDataTableDemo`.
This version is not yet as optimized as the LWC OSS version (TODO for Rupert).
It displays a Datatables.net table with opportunities.
Datatables.net is loaded from static resources : one for Datatables.net 1.10.16, one for jQuery 2.2.4

### Example displayed on the Home Page

A custom Home Page (flexipages/Home_Page_Datatables) is provided to display the example : edit the page to activate it for your profile.

### Features for the user

For the moment, you can simply filter/search the opps in the table, as well as change the pagination options.
I hope to update this demo to the same features as the LWC OSS example (see below).

## 2. Datatables.net in LWC OSS

Implementation example of an LWC OSS web application((open source software, off the Salesforce platform) using the datatables-net-lwc component which is an integration of Datatables.net in LWC (see https://datatables.net).

### Source code for the DatatablesNet component (<ui-datatables>)

The component source code is in the `packages/lwc-oss/src/modules/ui/datatablesNet` folder : see the README there for more details.

### Example application

The example app is an LWC OSS application, in `packages/lwc-oss/src/modules/datatables`. It shows 2 datatables (source and destination) and buttons to copy and remove selected rows between the source and the destination.
The main application `app/main` shows an LWC component, `Example`, which display 2 datatables. These components are instances of the custom component class `MyDatatableNet`, inherited from the `DatatablesNet` component.

### MyDatatablesNet developed by the user to use DatatablesNetLWC

This component, written by the developer, will be used as a source component and a destination component. To separate concerns, it has a `sourceTableMixin`and a `destinationTableMixin` which are used to configure the behaviour of the component in each situation.

### Features for the user

The application loads a set of data into the source datatable.

The user can select one or multiple rows in the table : the "Add" button then becomes available. When the user clicks the "Add" button, the selected lines are copied to the destination table. The destination table then triggers an event back to the source table to mark the selected lines as "added" to the destination table; they are then greyed out and their font style changed to italic. The selected rows are then unselected.

When the user selects one or multiple lines in the destination table, the "Remove" buttons becomes available. When the user clicks the "Remove" button, the selected lines are removed from the destination table. An event is sent to the source table which finds those lines; they are unchecked as "added" and their style is restored back to a normal font.

### Developer notes

Go to the LC OSS example :
`cd packages/lwc-oss`

To install and build the app :
`npm run build`

To run and test the app :
`npm run watch`
