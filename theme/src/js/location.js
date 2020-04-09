var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
 
mapboxgl.accessToken = 'pk.eyJ1IjoiaWduaXNtIiwiYSI6ImNqOG9tdXRrYTA1OGozMm5uZDJrMWsydHkifQ.tkOkehct0nuaV6Pls1vlSg';
var map = new mapboxgl.Map({
container: '#location',
style: 'mapbox://styles/mapbox/streets-v11'
});
