var centerOfTown = [40.776139, -112];
var map = L.map('map').setView(centerOfTown, 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var marker;
function onMapClick(e) {
    console.log("You clicked the map at " , e.latlng);
    if(!marker){
        marker = L.marker(e.latlng).addTo(map);
        console.log("what is marker", marker)
    } else {
        marker.setLatLng(e.latlng)

    }
    document.querySelector('input[name="latitude"]').value=e.latlng.lat;
    document.querySelector('input[name="longitude"]').value=e.latlng.lng;
}

map.on('click', onMapClick);