const toggleButton = document.querySelector(".mobile-menu-toggle");
const menu = document.querySelector("nav ul");

toggleButton.addEventListener("click", () => {
  const isExpanded = toggleButton.getAttribute("aria-expanded") === "true";
  toggleButton.setAttribute("aria-expanded", !isExpanded);
  menu.classList.toggle("show");
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("nav") && !event.target.closest(".mobile-menu-toggle")) {
    toggleButton.setAttribute("aria-expanded", "false");
    menu.classList.remove("show");
  }
});

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

async function getAllRoutes() {
  return fetchJSON("../data/routes.json");
}

let cachedRoutes = null;

async function getRouteInfo(routeNo) {
  if (!cachedRoutes) {
    cachedRoutes = await fetchJSON("../data/output.json");
  }
  return cachedRoutes.find((item) => item.route === routeNo);
}

// UI Layer
function renderRouteOptions(routes) {
  let html = '<option value="" disabled selected>Select an option</option>';
  routes.forEach((route) => {
    html += `<option value="${route}">${route}</option>`;
  });
  document.querySelector("select#route").innerHTML = html;
}

function renderRouteDetails(routeInfo) {
  const container = document.querySelector(".js-bus-routes-info");
  document
    .querySelector(".bus-route-container")
    .classList.remove("display-hidden");
  if (!routeInfo) {
    container.innerHTML = `<div class="search-results">
      <div class="route-details">
        <p class="no-route">No route available!</p>
      </div>
    </div>`;
  } else {
    container.innerHTML = `
      <div class="search-results">
        <div class="query-info">
          <p>You queried: <span class="query-value">${routeInfo.route}</span></p>
          <p class="warning">P.S.: The indicated frequency is a rough approximation and may not be accurate currently.</p>
        </div>
        <div class="route-details">
          <dl class="route-info">
            <dt>Route No:</dt><dd>${routeInfo.data.routeNo}</dd>
            <dt>From:</dt><dd>${routeInfo.data.from}</dd>
            <dt>To:</dt><dd>${routeInfo.data.to}</dd>
            <dt>Total Distance:</dt><dd class="frequency-rare">${routeInfo.data.distance}</dd>
          </dl>
          <h2 class="stops-heading">Route/Important Stops</h2>
          <div class="timeline-container">
            <div class="timeline-line"><div class="timeline-progress"></div></div>
            <div class="timeline-items"></div>
          </div>
        </div>
      </div>`;
    const stopsHTML = routeInfo.data.stops
      .map((stop, index) => `
        <div class="timeline-item">
          <div class="timeline-dot">${index + 1}</div>
          <div class="timeline-text">${stop}</div>
        </div>
      `)
      .join("");
    document.querySelector(".timeline-items").innerHTML = stopsHTML;
  }
}

// Event Layer
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const routes = await getAllRoutes();
    renderRouteOptions(routes);
  } catch (error) {
    console.error("Failed to load routes:", error);
  }

  document.querySelector(".submit-route").addEventListener("click", async () => {
    const routeNo = document.querySelector("#route").value;
    if (!routeNo) return alert("Please select the route");

    try {
      const routeInfo = await getRouteInfo(routeNo);
      renderRouteDetails(routeInfo);
    } catch (error) {
      console.error("Failed to fetch route info:", error);
    }
  });
});