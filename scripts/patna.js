import { fetchStates } from './states.js';
import { tabSwitch } from './tab-switch.js';


document.querySelector('.mobile-menu-toggle').addEventListener('click', function () {
  const navbarMenu = document.querySelector('.navbar-menu');
  navbarMenu.classList.toggle('active'); // Toggle the 'active' class
});

// Simple mobile menu toggle
// document
//   .querySelector(".mobile-menu-toggle")
//   .addEventListener("click", function () {
//     document.querySelector("nav ul").classList.toggle("show");
//   });

// Hide mobile menu when clicking outside
// document.addEventListener("click", function (event) {
//   if (
//     !event.target.closest("nav") &&
//     !event.target.closest(".mobile-menu-toggle")
//   ) {
//     document.querySelector("nav ul").classList.remove("show");
//   }
// });

// fetch state wise menu data
async function getStateWise(){
  const states = await fetchStates();
  let stateHTML = ''
  for(let [key, value] of Object.entries(states.states)){
    stateHTML += `<li><a href="${value.toLowerCase().replace(/\s+/g, "-")}">${value}</a></li>`
  }

  document.querySelector(".dropdown-menu").innerHTML = stateHTML;
}

// Initialize the page
window.onload = async function() {
  getStateWise()
  tabSwitch()
  const {stateHTML} = await fetchStates();
  document.querySelector(".state-grid").innerHTML = stateHTML;
};