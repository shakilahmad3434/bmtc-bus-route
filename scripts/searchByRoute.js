import { displayRouteDetails } from './displayRouteDetails.js';
import {fetchRouteData} from './fetchRouteData.js'

export async function searchByRoute(city){
  document.querySelector(".stage-info").style.display = 'none';
  document.querySelector('.from-to-destination').style.display = 'none';
  
  const selectInput = document.querySelector(".js-bus-route-no").value;
    const inputRoute = document.querySelector('#routeId').value;
    const routeNo = selectInput || inputRoute;

    if (!routeNo) return alert("Please select the route");

    try {
      const routeInfo = await fetchRouteData(city, routeNo);
      if(routeInfo !== undefined){
        displayRouteDetails(routeInfo)
      }else{
        alert('Route information is currently unavailable. Please wait while I update it.');
      }
    } catch (error) {
      console.error("Failed to fetch route info:", error);
    }
}