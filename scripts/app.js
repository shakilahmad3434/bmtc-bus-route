"use-strict";
import { fetchStates } from "./states.js";
import { tabSwitch } from "./tab-switch.js";
import { cities } from "./cities.js";
import { timeTable } from "./time-table.js";

// responsive mobile menu toggle
document
  .querySelector(".mobile-menu-toggle")
  .addEventListener("click", function () {
    const navbarMenu = document.querySelector(".mobile-menu");
    if (navbarMenu.style.display === "block") {
      navbarMenu.style.display = "none";
    } else {
      navbarMenu.style.display = "block";
    }
  });

// faqs accordion content
const accordion = document.getElementsByClassName("contentBx");
for (let i = 0; i < accordion.length; i++) {
  accordion[i].addEventListener("click", function () {
    this.classList.toggle("active");
  });
}

// Smooth scroll for table of contents links
document.querySelectorAll(".table-of-contents a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// find the current pathname & url
const myURL = window.location.pathname;
let city = "";
if (myURL === "/") {
  city = "bangalore";
} else {
  city = myURL.split("/")[1];
}

// fetch state wise menu data
async function getStateWise() {
  const {states} = await fetchStates();
  let stateHTML = "";
  states.forEach(state => {
    if(state === "Bengaluru"){
      stateHTML +=`<li><a href="/">${state}</a></li>`;
    }else {
      stateHTML +=`<li><a href="/${state.toLowerCase()}">${state}</a></li>`;
    }
    
  })

  document.querySelector(".dropdown-menu").innerHTML = stateHTML;
  document.querySelector(".mobile-dropdown-menu").innerHTML = stateHTML;
}

// get subscribe email from user
function getSubscribe() {
  document
    .getElementById("subscriptionForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = document.getElementById("email");
      const email = emailInput.value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const errorMessage = document.querySelector(".error-message");

      if (emailRegex.test(email)) {
        document.querySelector(".subscription-card").style.display = "none";
        document.querySelector(".success-card").classList.add("visible");
      } else {
        emailInput.classList.add("error");
        errorMessage.classList.add("visible");
      }
    });

  // Remove error styling when user starts typing
  document.getElementById("email").addEventListener("input", function () {
    this.classList.remove("error");
    document.querySelector(".error-message").classList.remove("visible");
  });
}

// state wise page visible
function getCities({ img, alt, badge, title, desc, link, bgColor }) {
  return `<div class="city-card ${bgColor}">
      <div class="city-card-image">
        <img src="${img}" alt="${alt}">
      </div>
      <div class="city-card-content">
        <span class="city-badge">${badge}+ routes</span>
        <h3>${title}</h3>
        <p class="city-description">${desc}</p>
        <a href="${link}" class="city-link">
          View routes 
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>
      </div>
    </div>`;
}

// display time table from this code
function displayTimeTable(){
  let tableHTML = '';
  timeTable.forEach((time, i) => {
  const toLength = time.toAirport.length-1;
  const fromLength = time.fromAirport.length-1;
  const randomNum = Math.floor(Math.random() * 30) + 1;
  tableHTML += `<div class="route-card bg${randomNum}">
            <div class="route-header">
                <div class="route-number">${time.routeNo} Bus Route</div>
                <div class="route-destination">${time.route}</div>
            </div>
            
            <div class="route-body">
                <div class="route-via">
                    <div class="via-stops"><strong>STOPS:</strong> ${time.via}</div>
                </div>
                
                <div class="journey-time">Journey Time: ${time.journeyTime}</div>
                
                <div class="bus-times">
                    <div class="time-section first-bus">
                        <div class="time-label">First Bus:</div>
                        <div class="time-details">
                            <div class="time-item">
                                <div class="time-direction">To Airport:</div>
                                <div class="time-value">${time.toAirport[0]}</div>
                            </div>
                            <div class="time-item">
                                <div class="time-direction">From Airport:</div>
                                <div class="time-value">${time.fromAirport[0]}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="time-section last-bus">
                        <div class="time-label">Last Bus:</div>
                        <div class="time-details">
                            <div class="time-item">
                                <div class="time-direction">To Airport:</div>
                                <div class="time-value">${time.toAirport[toLength]}</div>
                            </div>
                            <div class="time-item">
                                <div class="time-direction">From Airport:</div>
                                <div class="time-value">${time.fromAirport[fromLength]}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <a href="#" class="view-more">View Schedule, Route Map & More</a>
        </div>`;
      });
    document.querySelector("#timeTable").innerHTML = tableHTML;
}

function displayCities() {
  let cityHTML = "";

  cities.forEach((city) => {
    cityHTML += getCities(city);
  });

  if(document.querySelector("#cityCards") !== null)
  document.querySelector("#cityCards").innerHTML = cityHTML;
}

// Initialize the page
window.onload = async function () {
  getStateWise();
  tabSwitch(city);
  const { stateHTML } = await fetchStates();
  if (document.querySelector(".state-grid") !== null) {
    document.querySelector(".state-grid").innerHTML = await stateHTML;
  }
  displayCities();
  getSubscribe();
  displayTimeTable();
};
