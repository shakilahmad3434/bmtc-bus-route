"use-strict";
import { fetchStates } from "./states.js";
import { tabSwitch } from "./tab-switch.js";

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
    stateHTML += `<li><a href="${value
      .toLowerCase()
      .replace(/\s+/g, "-")}">${value}</a></li>`;
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

// Initialize the page
window.onload = async function () {
  getStateWise();
  tabSwitch(city);
  const { stateHTML } = await fetchStates();
  document.querySelector(".state-grid").innerHTML = await stateHTML;
  getSubscribe();
};
