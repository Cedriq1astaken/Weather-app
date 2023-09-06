let api = null
let latitude = null
let longitude = null
let all = null
let check = false 
if (navigator.geolocation) {
  		navigator.geolocation.getCurrentPosition(function(position) {
    	latitude = position.coords.latitude;
    	longitude = position.coords.longitude;
		console.log(latitude)
		api = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,rain,snowfall,cloudcover,cloudcover_high,visibility&daily=rain_sum&current_weather=true&timezone=America%2FNew_York`
		document.getElementById("start").style.display = "inline"
	});
} 
else {
  console.log("Geolocation is not supported by this browser.");
}
let meaning = {
	"Clear Sky": 0,
	"Mainly clear, partly cloudy, and overcast": 1,
	"Mainly clear, partly cloudy, and overcast": 2,
	"Mainly clear, partly cloudy, and overcast": 3,
	"Fog and depositing rime fog": 45,
	"Fog and depositing rime fog": 48,
	"Drizzle: Light, moderate, and dense intensity": 56,
	"Drizzle: Light, moderate, and dense intensity": 57,	
	"Rain: Slight, moderate and heavy intensity": 61,
	"Rain: Slight, moderate and heavy intensity": 63,
	"Rain: Slight, moderate and heavy intensity": 65,
	"Freezing Rain: Light and heavy intensity": 66,
	"Freezing Rain: Light and heavy intensity": 67,
	"Snow fall: Slight, moderate, and heavy intensity": 71,
	"Snow fall: Slight, moderate, and heavy intensity": 73,
	"Snow fall: Slight, moderate, and heavy intensity": 75,
	"Snow grains": 77,
	"Rain showers: Slight, moderate, and violent": 80,
	"Rain showers: Slight, moderate, and violent": 81,
	"Rain showers: Slight, moderate, and violent": 82,
	"Snow showers slight and heavy": 85,
	"Snow showers slight and heavy": 86,
	"Thunderstorm: Slight or moderate": 95,
	"Thunderstorm with slight and heavy hail": 96,
	"Thunderstorm with slight and heavy hail": 99
}
let fn = async () =>{
	let fetched = await fetch(api)
	let data = await fetched.json()
	all = data
}
let display = () =>{
	document.getElementById("temp").innerText += ` ${all["current_weather"]["temperature"]} Degree Celcius`
	for(let a in meaning){
			if(meaning[a]== all["current_weather"]["weathercode"]){
				document.getElementById("weather").innerText += ` ${a}`
			}
			else{
				console.log("np")
			}
		}
	
}
document.getElementById("start").onclick = ()=>{
	fn()
	display()
}
