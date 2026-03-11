function loadHospitals() {

fetch("http://127.0.0.1:5000/hospitals")

.then(response => response.json())

.then(data => {

let list = document.getElementById("hospitalList")

list.innerHTML = ""

data.forEach(hospital => {

list.innerHTML += `
<p>
<b>${hospital.name}</b> - ${hospital.city}
<br>
ICU Beds: ${hospital.icuBeds}
</p>
`

})

})

}