import { displayRouteDetails } from './displayRouteDetails.js';
import {fetchRouteData} from './fetchRouteData.js'

export async function searchByRoute(){
  document.querySelector(".stage-info").style.display = 'none';
  const selectInput = document.querySelector(".js-bus-route-no").value;
    const inputRoute = document.querySelector('#routeId').value;
    const routeNo = selectInput || inputRoute;

    if (!routeNo) return alert("Please select the route");

    try {
      const routeInfo = await fetchRouteData('patna', routeNo);
      displayRouteDetails(routeInfo)
    } catch (error) {
      console.error("Failed to fetch route info:", error);
    }
}