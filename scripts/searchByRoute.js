import { displayRouteDetails } from './displayRouteDetails.js';
import {fetchRouteData} from './fetchRouteData.js'

export async function searchByRoute(){
  console.log("Search by route method");
  
  const selectInput = document.querySelector(".js-bus-route-no").value;
    const inputRoute = document.querySelector('#routeId').value;
    const routeNo = inputRoute || selectInput;
    console.log(routeNo)
    if (!routeNo) return alert("Please select the route");

    try {
      const routeInfo = await fetchRouteData('patna', routeNo);
      displayRouteDetails(routeInfo)
    } catch (error) {
      console.error("Failed to fetch route info:", error);
    }
}