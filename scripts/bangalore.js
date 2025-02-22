import {fetchBusRoute} from './fetchBusRoute.js'
import {fetchRouteData} from './fetchRouteData.js'

// fetch bus route

async function getAllRoutes(){
  const options = await fetchBusRoute('bangalore');
  // Add default option and set innerHTML
  document.querySelector('.js-bus-route-no').innerHTML = `
      <option value="">Select Bus No</option>
      ${options}
  `;
}

// Tab switching functionality
const tabs = document.querySelectorAll('.tab');
const searchGroups = document.querySelectorAll('.search-group');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
      // Remove active class from all tabs and search groups
      tabs.forEach(t => t.classList.remove('active'));
      searchGroups.forEach(g => g.classList.remove('active'));

      // Add active class to clicked tab and corresponding search group
      tab.classList.add('active');
      document.getElementById(`${tab.dataset.tab}-search`).classList.add('active');
  });
});

function searchRoute(routeInfo) {
  const routeDetails = document.getElementById('routeDetails');
  const route = routeInfo.data; 

  if (route) {
      document.getElementById('routeNo').textContent = route.routeNo;
      document.getElementById('routeFrom').textContent = route.from;
      document.getElementById('routeTo').textContent = route.to;
      document.getElementById('routeDistance').textContent = route.distance;

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

  document.querySelector(".submit-route").addEventListener("click", async () => {
    const routeNo = document.querySelector(".js-bus-route-no").value;
    if (!routeNo) return alert("Please select the route");

    try {
      const routeInfo = await fetchRouteData('bangalore', routeNo);
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