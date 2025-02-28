import { displayBusStopDetails } from "./displayBusStopDetails.js";
export async function searchByStop(city){
  document.getElementById('routeDetails').style.display = 'none';
  document.querySelector('.from-to-destination').style.display = 'none';
  
  const selectInput = document.querySelector(".js-bus-stop-name").value;
    const inputBusStop = document.querySelector('#busStopId').value;
    const busStopName = selectInput || inputBusStop;

    if (!busStopName) return alert("Please select the route");

    try {
      await displayBusStopDetails(city, busStopName);
    } catch (error) {
      console.error("Failed to fetch route info:", error);
    }
}