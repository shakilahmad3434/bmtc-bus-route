export function displayRouteDetails(routeInfo) {
  const routeDetails = document.getElementById('routeDetails');
  const route = routeInfo.data; 

  if (route) {
      document.getElementById('routeNo').textContent = route.routeNo;
      document.getElementById('routeFrom').textContent = route.from;
      document.getElementById('routeTo').textContent = route.to;
      document.getElementById('routeDistance').textContent = route.distance;
      document.getElementById('totalStops').textContent = route.totalStops;

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