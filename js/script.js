/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const itemsPerPage = 9;

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
   const endIndex = page * itemsPerPage;
   const startIndex = endIndex - itemsPerPage;

   const studentList = document.querySelector(".student-list");
   studentList.innerHTML = '';

   for (let i = startIndex; i < endIndex; i++) {
      console.log(list[i]);
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


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
   let html = '';
   const pageLinks = document.querySelector(".link-list");
   const numOfPages = Math.ceil(list.length / itemsPerPage);
   console.log(numOfPages);
   for(let i = 1; i <= numOfPages; i++) {
      html += `          
      <li>
         <button type="button">${i}</button>
      </li>
      `
   }
   pageLinks.innerHTML = html;
   // Add active class to first button element
   const firstButton = document.querySelector(".link-list button:first-child");
   firstButton.className = "active";
}


// Call functions
showPage(data, 1);
addPagination(data);