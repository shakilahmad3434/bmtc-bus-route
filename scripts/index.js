// import routes from '../data/routes.json' assert { type: 'json' };

// Simple mobile menu toggle
document.querySelector('.mobile-menu-toggle').addEventListener('click', function() {
  document.querySelector('nav ul').classList.toggle('show');
});

// Hide mobile menu when clicking outside
document.addEventListener('click', function(event) {
  if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-toggle')) {
      document.querySelector('nav ul').classList.remove('show');
  }
});


// display all bus routes
async function fetchAllRoutes(){
  try {
    const res = await fetch('../data/routes.json');
    const data = await res.json()
    let html = '<option value="" disabled selected>Select an option</option>'
    data.forEach(route => {
      html +=`<option value="${route}">${route}</option>`
    })
    document.querySelector('select#route').innerHTML = html;
} catch (error) {
  console.error('Error loading JSON:', error)
}
}

fetchAllRoutes()

// timeline
// const stops = [
//   "Jayanagar 9th Block",
//   "Jayanagar 4th T Block",
//   "Jayanagar 18th Main",
//   "Jayanagar 4th Block Church",
//   "Jayanagar 4th Block",
//   "Jayanagar 3rd Block",
//   "Madhavan Park",
//   "South End Circle",
//   "Shanthi Talkies",
//   "Nagasandra Circle",
//   "Nettakalappa Circle",
//   "Basavanagudi Police Station",
//   "National College Basavanagudi",
//   "Gandhi Bazaar",
//   "Ramakrishna Ashram",
//   "Bangalore High School",
//   "Chamarajpet/Uma Talkies",
//   "Chamarajpet Police Station",
//   "Mysore Road Flyover",
//   "Cottonpet Hospital",
//   "Goods Shed Road",
//   "Kempegowda Bus Station/Majestic",
//   "Platform Road",
//   "Central Talkies",
//   "Sheshadripuram",
//   "Malleswaram Circle",
//   "Malleswaram 8th Cross",
//   "Malleswaram 11th Cross",
//   "Malleswaram 18th Cross",
//   "Tata Institute (IISc)",
//   "Yeshwanthpur"
// ];

async function displayStops(routeNo){

  try {
    const res = await fetch('../data/output.json');
    const data = await res.json()

    const route = data.find(item => item.route === routeNo);
    return route

//       let html = '';
// stops.forEach((item, index) => {
//   html += `<div class="timeline-item">
//     <div class="timeline-dot">${index+1}</div>
//     <div class="timeline-text">${item}</div>
//   </div>`;
// });

// document.querySelector('.timeline-items').innerHTML = html;

} catch (error) {
  console.error('Error loading JSON:', error)
}

}


async function displayRouteInfo(routeNo){

  document.querySelector('.bus-route-container').classList.remove('display-hidden');
  const routeInfo = await displayStops(routeNo)

  document.querySelector('.js-bus-routes-info').innerHTML = `<div class="search-results">
          <div class="query-info">
              <p>You queried: <span class="query-value">${routeInfo.route}</span></p>
              <p class="warning">P.S.: The indicated frequency is a rough approximation and may not be accurate currently.</p>
          </div>
          
          <div class="route-details">
              <dl class="route-info">
                  <dt>Route No:</dt>
                  <dd>${routeInfo.data.routeNo}</dd>
                  
                  <dt>From:</dt>
                  <dd>${routeInfo.data.from}</dd>
                  
                  <dt>To:</dt>
                  <dd>${routeInfo.data.to}</dd>
                  
                  <dt>Frequency:</dt>
                  <dd class="frequency-rare">VERY RARE</dd>
              </dl>
              
              <h2 class="stops-heading">Route/Important Stops</h2>
              
              <div class="timeline-container">
                <div class="timeline-line">
                  <div class="timeline-progress"></div>
                </div>
                
                <div class="timeline-items">
                  <!-- item inject by JS  -->
                </div>
              </div>

          </div>
      </div>`;



    let html = '';
routeInfo.data.stops.forEach((item, index) => {
  html += `<div class="timeline-item">
    <div class="timeline-dot">${index+1}</div>
    <div class="timeline-text">${item}</div>
  </div>`;
});

document.querySelector('.timeline-items').innerHTML = html;

}


document.querySelector('.submit-route').addEventListener('click', () => {
    const routeNo = document.querySelector('#route').value;
    if(routeNo){
      displayRouteInfo(routeNo)
    }else{
      alert('Please select the route')

    }
})