"use-strict";
import { fetchStates } from "./states.js";
import { tabSwitch } from "./tab-switch.js";
import { cities } from "./cities.js";

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
  const states = await fetchStates();
  let stateHTML = "";
  for (let [key, value] of Object.entries(states.states)) {
    let tempCity = undefined;
    if(value === "Bengaluru"){
      value = '/'
      tempCity = "Bengaluru";
    }else{
      value
      .toLowerCase()
      .replace(/\s+/g, "-")
    }
    stateHTML += `<li><a href="${value}">${tempCity || value}</a></li>`;
  }

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
};
