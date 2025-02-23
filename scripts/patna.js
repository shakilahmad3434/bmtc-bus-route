import {fetchBusRoute} from './fetchBusRoute.js'
import {fetchRouteData} from './fetchRouteData.js'
import { fetchStates } from './states.js';
import { fetchStageInfo } from './fetchStageInfo.js';

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