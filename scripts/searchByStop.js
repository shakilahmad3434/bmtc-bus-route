import { displayBusStopDetails } from "./displayBusStopDetails.js";
export async function searchByStop(){
  const selectInput = document.querySelector(".js-bus-stop-name").value;
    const inputBusStop = document.querySelector('#busStopId').value;
    const busStopName = inputBusStop || selectInput;
    if (!routeNo) return alert("Please select the route");

    try {
      await displayBusStopDetails(busStopName);
    } catch (error) {
      console.error("Failed to fetch route info:", error);
    }
}