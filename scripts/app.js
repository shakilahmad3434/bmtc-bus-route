"use-strict"
import { fetchStates } from './states.js';
import { tabSwitch } from './tab-switch.js';


document.querySelector('.mobile-menu-toggle').addEventListener('click', function () {
  const navbarMenu = document.querySelector('.mobile-menu');
  if(navbarMenu.style.display === "block"){

    navbarMenu.style.display = 'none';
  } else{
    navbarMenu.style.display = 'block';
  }

});

const myURL =  window.location.pathname;
const city = myURL.split('/').pop().split('.')[0];

// fetch state wise menu data
async function getStateWise(){
  const states = await fetchStates();
  let stateHTML = ''
  for(let [key, value] of Object.entries(states.states)){
    stateHTML += `<li><a href="${value.toLowerCase().replace(/\s+/g, "-")}">${value}</a></li>`
  }

  document.querySelector(".dropdown-menu").innerHTML = stateHTML;
  document.querySelector(".mobile-dropdown-menu").innerHTML = stateHTML;
}

// Initialize the page
window.onload = async function() {
  getStateWise()
  tabSwitch(city)
  const {stateHTML} = await fetchStates();
  document.querySelector(".state-grid").innerHTML = stateHTML;
};