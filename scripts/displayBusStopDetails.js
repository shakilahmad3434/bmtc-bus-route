import {fetchStageInfo} from './fetchStageInfo.js'
// Initialize the table
export async function displayBusStopDetails(busStageName) {
  const tbody = document.getElementById('routesBody');
  tbody.innerHTML = '';
  const stageRoutes = await fetchStageInfo('patna', busStageName)
  document.querySelector('.bus-stage-name').innerHTML = stageRoutes.stage;
  stageRoutes.data.forEach((route, id) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${id+1}</td>
          <td><a href="#" class="route-link">${route.stageName}</a></td>
          <td>${route.stageInfo}</td>
          <td>Every 20 mins</td>
          <td>5 mins</td>
      `;
      tbody.appendChild(row);
  });
}