import {fetchBusRoute} from './fetchBusRoute.js'
import {fetchRouteData} from './fetchRouteData.js'

// fetch bus route
(async () => {
const options = await fetchBusRoute('bangalore');
// Add default option and set innerHTML
document.querySelector('.js-bus-route-no').innerHTML = `
    <option value="">Select Bus No</option>
    ${options}
`;
})();

(async () => {
  const routeDatas = await fetchRouteData('bangalore', '100');
console.log(routeDatas)
})()

// Sample route data
const routeData = {
  "105A": {
      routeNo: "105A",
      from: "Rajmahal Guttahalli",
      to: "Raghavendra Colony",
      distance: "10.4 K.M.",
      stops: [
          "Rajmahal Guttahalli",
          "Sudhindra Nagar",
          "Malleswaram 8th Cross",
          "Malleswaram Circle",
          "Sheshadripuram"
      ]
  }
};

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

function searchRoute() {
  const routeDetails = document.getElementById('routeDetails');
  const route = routeData["105A"]; // Using sample data

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

function searchStage() {
  alert('Searching for bus stages... (Feature in development)');
}

function searchFromTo() {
  alert('Searching routes between locations... (Feature in development)');
}