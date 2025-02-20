const map = L.map('map').setView([12.9716, 77.5946], 6);
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by shakil';

const tiles = L.tileLayer(tileUrl, {attribution})
tiles.addTo(map);

// const CLayer = L.circle([12.9716, 77.5946], {
//   radius: 10000,
//   color: 'coral'
// });
// CLayer.addTo(map)

// const icon = {
//   iconUrl: '../images/marker.png',
// }

const icon = L.icon({
  iconUrl: '../images/marker.png',
  iconSize: [30, 30]
})

L.marker([12.9716, 77.5946], {
  icon
}).addTo(map)
.bindTooltip('A pretty Css popup. <br /> Easily customizable.')