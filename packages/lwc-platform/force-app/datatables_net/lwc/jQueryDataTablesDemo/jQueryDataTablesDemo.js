// Source : lwcFactory.com
import { LightningElement } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

import jQuery from '@salesforce/resourceUrl/jQuery_2_2_4';
import dataTable from '@salesforce/resourceUrl/dataTables_1_10_16';

import fetchOpportunity from '@salesforce/apex/JQueryDataTableCtrl.fetchOpportunity';

export default class JQueryDataTablesDemo extends LightningElement {
  recordsQueried = []; // array property to store list of Opportunity

  // The connectedCallback() lifecycle hook fires when a component is inserted into the DOM.
  async connectedCallback() {
    // call apex class method which will return the list<Opportunity>
    // assign returned list of records to ‘recordsQueried’ property
    this.recordsQueried = await fetchOpportunity();

    // load jQuery, and DataTables [JS and CSS] from static resource
    Promise.all([
      loadScript(this, jQuery + '/jquery.min.js'),
      loadScript(this, dataTable + '/media/js/jquery.dataTables.min.js'),
      loadStyle(this, dataTable + '/media/css/jquery.dataTables.min.css')
    ]).then(() => {
      // get the table tag reference from html template using class
      const table = this.template.querySelector('.tableCls');
      console.log('table ', table);
      console.log('jquery table = ', $(table));

      // set table headers
      const columnHeaders = [
        'Name',
        'StageName',
        'Amount',
        'CloseDate',
        'Type'
      ];

      // create html table header part
      let columnHeaderHtml = '<thead> <tr>';
      columnHeaders.forEach(function(header) {
        columnHeaderHtml += '<th>' + header + '</th>';
      });
      columnHeaderHtml += '</tr></thead>';

      // set <thead> element inside table element
      table.innerHTML = columnHeaderHtml;

      //  apply dataTable library to the table and store reference in a variable
      let oDataTable = $(table).DataTable();
      //let oDataTable = jQuery.fn.DataTable(table);

      // process all Opportunity records in a for loop and generate table row
      this.recordsQueried.forEach(function(opp) {
        let tableRow = [];
        let sUrl = '/lightning/r/Opportunity/' + opp.Id + '/view';
        tableRow.push('<a href="' + sUrl + '">' + opp.Name + '</a>');
        // if any field value is undefined then set blank string to avoid errors
        tableRow.push(opp.StageName != undefined ? opp.StageName : '');
        tableRow.push(opp.Amount != undefined ? opp.Amount : '');
        tableRow.push(opp.CloseDate != undefined ? opp.CloseDate : '');
        tableRow.push(opp.Type != undefined ? opp.Type : '');
        oDataTable.row.add(tableRow);
      });
      // use DataTables plugin draw function to reflect your data changes on UI
      oDataTable.draw();
    });
  }
}