// Data Layer
async function fetchJSON(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error("Error loading JSON:", error);
    throw error;
  }
}

let cachedRoutes = null;
export async function fetchRouteData(routeName, routeNo){
  if (!cachedRoutes) {
    cachedRoutes = await fetchJSON(`../data/${routeName}/route-details.json`);
  }
  return cachedRoutes.find((item) => item.route === routeNo);
}