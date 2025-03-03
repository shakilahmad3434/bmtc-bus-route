import { fetchBusRoute } from './fetchBusRoute.js';
import { getBusStageName } from './getBusStageName.js';
import { searchByRoute } from './searchByRoute.js';
import { searchByStop } from './searchByStop.js';
import { searchByDestination } from './searchByDestination.js';

// Fetch bus route and populate dropdown
async function getAllRoutes(city) {
  try {
    const options = await fetchBusRoute(city);
    document.querySelector('.js-bus-route-no').innerHTML = `
      <option value="">Select Bus No</option>
      ${options}
    `;
  } catch (error) {
    console.error('Error fetching bus routes:', error);
    document.querySelector('.js-bus-route-no').innerHTML = `
      <option value="">Failed to load bus routes</option>
    `;
  }
}

// Fetch bus stop names and populate dropdown
async function getAllBusStageName(city) {
  try {
    const options = await getBusStageName(city);
    document.querySelector('.js-bus-stop-name').innerHTML = `
      <option value="">Select Bus Stop</option>
      ${options}
    `;
  } catch (error) {
    console.error('Error fetching bus stop names:', error);
    document.querySelector('.js-bus-stop-name').innerHTML = `
      <option value="">Failed to load bus stops</option>
    `;
  }
}

// Tab switching functionality
export function tabSwitch(city) {
  const tabs = document.querySelectorAll('.search-tab');
  const searchContent = document.querySelector('.search-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', async () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');

      // Update search content based on selected tab
      if (tab.textContent === 'Route Number') {
        searchContent.innerHTML = `
          <select class="js-bus-route-no">
          </select>
          <input type="text" placeholder="Enter route number" id="routeId">
          <button id="searchByRouteButton">Search</button>
        `;
        // Fetch and populate bus routes
        await getAllRoutes(city);
        // Attach event listener for search button
        document.getElementById('searchByRouteButton').addEventListener('click', ()=> searchByRoute(city));

      } else if (tab.textContent === 'Source - Destination') {
        searchContent.innerHTML = `
          <input type="text" placeholder="Enter source">
          <input type="text" placeholder="Enter destination">
          <button id="searchByDestination">Search</button>
        `;
        document.getElementById('searchByDestination').addEventListener('click', searchByDestination);
      } else if (tab.textContent === 'Bus Stop') {
        searchContent.innerHTML = `
          <select class="js-bus-stop-name">
          </select>
          <input type="text" placeholder="Enter bus stop name" id="busStopId">
          <button id="searchByStopButton">Search</button>
        `;
        // Fetch and populate bus stop names
        await getAllBusStageName(city);
        // Attach event listener for search button
        document.getElementById('searchByStopButton').addEventListener('click', ()=> searchByStop(city));
      }
    });
  });

  // Trigger the first tab click programmatically to initialize content
  tabs[0]?.click();
}