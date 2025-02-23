import {fetchBusRoute} from './fetchBusRoute.js'
import {fetchRouteData} from './fetchRouteData.js'
import { fetchStates } from './states.js';
import { fetchStageInfo } from './fetchStageInfo.js';

// Tab switching functionality
const tabs = document.querySelectorAll('.search-tab');
const searchContent = document.querySelector('.search-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        // Update search content based on selected tab
        if (tab.textContent === 'Route Number') {
            searchContent.innerHTML = `
                <select class="js-bus-route-no">
                </select>
                <input type="text" placeholder="Enter route number">
                <button class="search-button">Search</button>
            `;
        } else if (tab.textContent === 'Source - Destination') {
            searchContent.innerHTML = `
                <input type="text" placeholder="Enter source">
                <input type="text" placeholder="Enter destination">
                <button class="search-button" onclick="searchByLocation()">Search</button>
            `;
        } else if (tab.textContent === 'Bus Stop') {
            searchContent.innerHTML = `
                <select>
                    <option>Select City</option>
                    <option>Bangalore</option>
                    <option>Mysore</option>
                    <option>Mangalore</option>
                </select>
                <input type="text" placeholder="Enter bus stop name">
                <button class="search-button" onclick="searchByStop()">Search</button>
            `;
        }
    });
});

// fetch bus route

async function getAllRoutes(){
  const options = await fetchBusRoute('patna');
  // Add default option and set innerHTML
  document.querySelector('.js-bus-route-no').innerHTML = `
      <option value="">Select Bus No</option>
      ${options}
  `;
}

function searchRoute(routeInfo) {
  const routeDetails = document.getElementById('routeDetails');
  const route = routeInfo.data; 

  if (route) {
      document.getElementById('routeNo').textContent = route.routeNo;
      document.getElementById('routeFrom').textContent = route.from;
      document.getElementById('routeTo').textContent = route.to;
      document.getElementById('routeDistance').textContent = route.distance;
      document.getElementById('totalStops').textContent = route.totalStops;

      const stopsList = document.getElementById('stopsList');
      stopsList.innerHTML = '<div class="route-line"></div>';
      
      route.stops.forEach((stop, index) => {
          const stopItem = document.createElement('div');
          stopItem.className = 'stop-item';
          stopItem.innerHTML = `
              <div class="stop-marker">${index + 1}</div>
              ${stop}
          `;
          stopsList.appendChild(stopItem);
      });

      routeDetails.style.display = 'block';
  } else {
      alert('Route not found. Please try another route number.');
  }
}

// Event Layer
document.addEventListener("DOMContentLoaded", async () => {
  getAllRoutes()
  
  const states = await fetchStates()
  let stateHTML = '';
  states.forEach(state => {
    const slug = state.toLowerCase().replace(/\s+/g, '-');
      stateHTML +=`<a href="/${slug}">${state}</a>`
  })
  document.querySelector(".state-grid").innerHTML = stateHTML;

  document.querySelector(".search-button").addEventListener("click", async () => {
    const selectInput = document.querySelector(".js-bus-route-no").value;
    const inputRoute = document.querySelector('#routeId').value;
    const routeNo = inputRoute || selectInput;
    if (!routeNo) return alert("Please select the route");

    try {
      const routeInfo = await fetchRouteData('patna', routeNo);
      searchRoute(routeInfo)
    } catch (error) {
      console.error("Failed to fetch route info:", error);
    }
  });
});

function searchStage() {
  alert('Searching for bus stages... (Feature in development)');
}

function searchFromTo() {
  alert('Searching routes between locations... (Feature in development)');
}



// Initialize the table
async function initializeTable(busStageName) {
  const tbody = document.getElementById('routesBody');
  tbody.innerHTML = '';
  const stageRoutes = await fetchStageInfo('patna', busStageName)
  document.querySelector('.bus-stage-name').innerHTML = stageRoutes.stage;
  stageRoutes.data.forEach((route, id) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${id+1}</td>
          <td><a href="#" class="route-link">${route.stageName}</a></td>
          <td>${route.stageInfo}</td>
          <td>Every 20 mins</td>
          <td>5 mins</td>
      `;
      tbody.appendChild(row);
  });
}


// Initialize the page
window.onload = function() {
  initializeTable();
};