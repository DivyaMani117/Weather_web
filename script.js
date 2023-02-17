let lat;
let lon;
let acc;
let locationName=document.getElementById("locationName");
let icon=document.getElementById("icon");
let desc=document.getElementById("description");
let temperature=document.getElementById("temp");
let minTemp=document.getElementById("minTemp");
let maxTemp=document.getElementById("maxTemp");
let windSpeed=document.getElementById("Speed");



if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(async position =>{   
        lat=position.coords.latitude;
        acc=position.coords.accuracy;
        lon=position.coords.longitude;
        console.log("latitude: "+lat+" longitude: "+lon);
       let data=await getWeatherData(lat,lon);
       var map = L.map('map').setView([lat,lon], 5);
       L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([lat,lon]).addTo(map);
marker.bindPopup(`<b>${data.name}</b>`).openPopup();




map.on('click', async function(e){
    const data=await getWeatherData(e.latlng.lat,e.latlng.lng);


marker.setLatLng([e.latlng.lat, e.latlng.lng]);
marker.bindPopup(`<b>${data.name}</b>`).openPopup();

});
       return data;
    })
}


async function getWeatherData(lat,lon){
    let api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=0b7c95d1b01260245b53072508a59e7b`
    let response= await fetch(api)
    let data=await response.json();
    console.log(data);

    dataHandler(data);
    return data;
}

function dataHandler(data){
    const {speed}=data.wind;
    const {description}=data.weather[0];
    const {temp}=data.main;
    const {temp_min,temp_max}=data.main;
    
    locationName.innerHTML=data.name;
    desc.innerHTML=description;
    temperature.innerHTML=temp;
    minTemp.innerHTML="Min-temp : "+temp_min;
    maxTemp.innerHTML="Max-temp : "+temp_max;
    windSpeed.innerHTML="Wind-Speed : "+speed;

}


