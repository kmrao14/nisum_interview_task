/**
 * 
 * @param {*} tableId - table id
 * @param {*} itemsPerPage - no of pages per page
 */
function datatable(tableId, itemsPerPage) {
   'use strict';

   this.tableName = tableId;
   this.itemsPerPage = itemsPerPage;
   this.rows = document.getElementById(tableId).rows;
   this.currentPage = 1;
   this.pages = 0;
   this.inited = false;
   this.noOfCols = document.getElementById(this.tableName).rows[0].cells.length;
   this.openedRow = null;

   this.toggleDetails = function (row) {

      if (row.classList.contains('open')) {

         row.classList.remove('open');
         row.nextSibling.remove();
         this.openedRow = null;

      } else {

         if (this.openedRow) {
            this.openedRow.nextSibling.remove();
            this.openedRow.classList.remove('open');
         }

         let detailsRow = document.createElement('tr');
         let content = `<td colspan="${this.noOfCols - 1}">${row.cells[this.noOfCols - 1].innerHTML}</td>`;
         row.classList.add('open');
         detailsRow.className = 'child';
         detailsRow.innerHTML = content;
         row.parentNode.insertBefore(detailsRow, row.nextSibling);
         this.openedRow = row;
      }

   }

   this.showRecords = function (from, to) {
      for (let i = 1; i < this.rows.length; i++) {
         let row = this.rows[i];
         row.className = 'row'
         if (i < from || i > to) {
            row.style.display = 'none';
         } else {
            row.className = 'row';
            row.cells[0].addEventListener('click', () => {
               this.toggleDetails(row)
            }, false);
            row.style.display = '';
         }
      }
   };

   this.showPage = function (pageNumber) {
      if (!this.inited) return;

      if (this.openedRow) {
         this.openedRow.nextSibling.remove();
         this.openedRow.classList.remove('open');
         this.openedRow = null;
      }
      let oldPageAnchor = document.getElementById('pg' + this.currentPage);
      oldPageAnchor.className = 'pg-normal';

      this.currentPage = pageNumber;
      let newPageAnchor = document.getElementById('pg' + this.currentPage);
      newPageAnchor.className = 'pg-selected';

      let from = (pageNumber - 1) * itemsPerPage + 1;
      let to = from + itemsPerPage - 1;
      this.showRecords(from, to);

      let pgNext = document.querySelector('.pg-next'),
         pgPrev = document.querySelector('.pg-prev');

      if (this.currentPage == this.pages) {
         pgNext.style.display = 'none';
      } else {
         pgNext.style.display = '';
      }

      if (this.currentPage === 1) {
         pgPrev.style.display = 'none';
      } else {
         pgPrev.style.display = '';
      }
   };

   this.prev = function () {
      if (this.openedRow) {
         this.openedRow.nextSibling.remove();
         this.openedRow.classList.remove('open');
         this.openedRow = null;
      }

      if (this.currentPage > 1) {
         this.showPage(this.currentPage - 1);
      }
   };

   this.next = function () {

      if (this.openedRow) {
         this.openedRow.nextSibling.remove();
         this.openedRow.classList.remove('open');
         this.openedRow = null;
      }

      if (this.currentPage < this.pages) {
         this.showPage(this.currentPage + 1);
      }
   };

   this.init = function () {
      let rows = document.getElementById(tableId).rows;
      let records = (rows.length - 1);

      this.pages = Math.ceil(records / itemsPerPage);
      this.inited = true;
   };

   this.showPageNav = function (pagerName, positionId) {
      if (!this.inited) return;

      let element = document.getElementById(positionId),
         pagerHtml = '<span onclick="' + pagerName + '.prev();" class="pg-normal pg-prev">&#171;</span>';

      for (let page = 1; page <= this.pages; page++) {
         pagerHtml += '<span id="pg' + page + '" class="pg-normal pg-next" onclick="' + pagerName + '.showPage(' + page + ');">' + page + '</span>';
      }

      pagerHtml += '<span onclick="' + pagerName + '.next();" class="pg-normal">&#187;</span>';

      element.innerHTML = pagerHtml;
   };
}


// datatableOne initialization
let datatableOne = new datatable('datatableOne', 5);
datatableOne.init();
datatableOne.showPageNav('datatableOne', 'dt_one_pagination');
datatableOne.showPage(1);


// datatableTwo initialization
let datatableTwo = new datatable('datatableTwo', 10);
datatableTwo.init();
datatableTwo.showPageNav('datatableTwo', 'dt_two_pagination');
datatableTwo.showPage(1);