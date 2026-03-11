let map = L.map('map').setView([23.3441, 85.3096], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);


function loadHospitals(){
fetch("/hospitals")
.then(response => response.json())
.then(data => {
data.forEach(hospital => {
L.marker([hospital.lat, hospital.lng])
.addTo(map)
.bindPopup(`
<b>${hospital.name}</b><br>
City: ${hospital.city}<br>
ICU Beds: ${hospital.icuBeds}
`);
});
});
}

function findNearest(){
navigator.geolocation.getCurrentPosition(function(position){
let userLat = position.coords.latitude
let userLng = position.coords.longitude
L.marker([userLat, userLng])
.addTo(map)
.bindPopup("You are here")
.openPopup()
fetch("/hospitals")
.then(res => res.json())
.then(data => {
let nearest = null
let minDistance = 999999
data.forEach(hospital => {
let distance =
Math.sqrt(
Math.pow(userLat - hospital.lat,2) +
Math.pow(userLng - hospital.lng,2)
)
if(distance < minDistance){
minDistance = distance
nearest = hospital
}
})
alert("Nearest Hospital: " + nearest.name)
})
})
}


function sos(){
navigator.geolocation.getCurrentPosition(function(position){
let userLat = position.coords.latitude
let userLng = position.coords.longitude
fetch("/hospitals")
.then(res => res.json())
.then(data => {
let nearest = null
let minDistance = 999999
data.forEach(hospital => {
let distance =
Math.sqrt(
Math.pow(userLat - hospital.lat,2) +
Math.pow(userLng - hospital.lng,2)
)
if(distance < minDistance){
minDistance = distance
nearest = hospital
}
})
alert(
"🚑 Nearest Emergency Hospital:\n" +
nearest.name +
"\nPhone: " +
nearest.phone
)
})
})
}