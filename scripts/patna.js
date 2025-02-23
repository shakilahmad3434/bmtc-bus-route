import { fetchStates } from './states.js';
import { tabSwitch } from './tab-switch.js';



// Initialize the page
window.onload = async function() {
  tabSwitch()
  document.querySelector(".state-grid").innerHTML = await fetchStates();
};