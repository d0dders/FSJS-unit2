/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const pageLinks = document.querySelector(".link-list");
const itemsPerPage = 9;
let currentPage = 1;
let list = getFilteredList(data);


/**
 *This function will create and insert/append the elements needed to display a "page" of nine students
 *@param {Object[]} list - An array of objects representing students
 *@param {string} page - Which page of students to display
 */
function showPage(list, page) {
   const endIndex = page * itemsPerPage;
   const startIndex = endIndex - itemsPerPage;

   const studentList = document.querySelector(".student-list");
   studentList.innerHTML = '';

   if (list.length == 0) {
      studentList.innerHTML += '<h2 class="no-results">No results found</h2>';
   } else {
      for (let i = startIndex; i < endIndex && i < list.length; i++) {
         const student = list[i];
         const picture = student.picture.large;
         const name = `${student.name.first} ${student.name.last}`;
         const email = student.email;
         const registeredDate = student.registered.date;

         const html = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${picture}" alt="Profile Picture">
               <h3>${name}</h3>
               <span class="email">${email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${registeredDate}</span>
            </div>
         </li>
         `;
         studentList.insertAdjacentHTML('beforeend', html);
      }
   }
}


/**
 * This function will create and insert/append the elements needed for the pagination buttons
 * @param {Object[]} list - An array of objects representing students
 */
function addPagination(list) {
   let html = '';
   const numOfPages = Math.ceil(list.length / itemsPerPage);
   if (currentPage > numOfPages) { currentPage = numOfPages }
   else if (currentPage < numOfPages) { currentPage = 1 };
   for(let i = 1; i <= numOfPages; i++) {
      html += `          
      <li>
         <button type="button"${ i == currentPage ? 'class="active"' : '' }>${i}</button>
      </li>
      `
   }
   pageLinks.innerHTML = html;
}

/**
 *This function will create and insert/append the elements needed for the search inputs
 */
function addSearch() {
   const header = document.querySelector(".header");
   const html = `
   <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name...">
      <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `
   header.insertAdjacentHTML('beforeend', html);
}


/**
 *This function will take the list of data and a search, and return a filtered list
 *@param {Object[]} list - An array of objects representing students
 *@param {string} [searchString] - The search string to use to filter the list
 *@return {Object[]} - An array of objects representing students that match the provided search string
 */
function getFilteredList(list, searchString = "") {
   if(searchString.length == 0) {
      return list;
   } else {
      let filteredList = []
      for (let i = 0; i < list.length; i++) {
         const studentName = list[i].name.first + " " + list[i].name.last;
         if (studentName.toLowerCase().includes(searchString)){
            filteredList.push(list[i]);
         }
      }
      return filteredList;
   }
}

pageLinks.addEventListener('click', (event) => {
   if (event.target.tagName == 'BUTTON') {
      const current = document.querySelector(".active");
      current.className = "";
      event.target.className = "active";
      
      const selectedPage = parseInt(event.target.textContent)
      currentPage = selectedPage;
      showPage(list, currentPage);
   }
})


/**
 * Called when the page needs to update the data displayed (after a search or  page refresh)
 */
 function refreshPage() {
   list = getFilteredList(data, searchField.value.toLowerCase());
   showPage(list, 1);
   addPagination(list);
}


/**
 * The below function call and event listeners setup the seach inputs and interactivity
 */
addSearch();

const searchField = document.getElementById("search");
searchField.addEventListener('keyup', () => {
   refreshPage();
});
const searchButton = document.querySelector("button");
searchButton.addEventListener('click', () => {
   refreshPage()
});


/**
 * Call the refreshPage function to display students on page load
 */
refreshPage();


