const apiKey = `a964c7d96d9d35c5f63e8be7ad0607f6`;
// const city = "pune";

async function fetchWeatherData(city){
	const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);

	const data = await response.json();
	console.log(data);
	// console.log(data.main.temp)
	// console.log(data.name)
	// console.log(data.wind.speed)
	// console.log(data.main.humidity)
	// console.log(data.visibility)
	updateWeatherUI(data)
	
}

const cityElement = document.querySelector(`.city`);
const temperature = document.querySelector(`.temp`);
const windSpeed = document.querySelector(".wind-speed");
const humidity = document.querySelector(".humidity");
const visibility = document.querySelector(".visibility-distance");

const descriptionText = document.querySelector(".description");

const date = document.querySelector(".date")
const descriptionIcon = document.querySelector(".description i ")


// fetchWeatherData();

function updateWeatherUI(data){
	cityElement.textContent=data.name;
	temperature.textContent = `${Math.round(data.main.temp)}`;
	windSpeed.textContent = `${data.wind.speed} km/h`;
	humidity.textContent = `${data.main.humidity}%`;
	visibility.textContent = `${data.visibility/1000}km`;
	descriptionText.textContent=data.weather[0].description;
	const currentDate = new Date();
	date.textContent = currentDate.toDateString();
	const weatherIconName= getWeatherIconName(data.weather[0].main);
	descriptionIcon.innerHTML = `<i class="fa-solid">${weatherIconName}</i>`
}

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener('submit', function (e) {
	e.preventDefault();
	const city = inputElement.value;
	if(city!== ''){
		fetchWeatherData(city)
		inputElement.value="";
	}
});

function getWeatherIconName(weatherCondition) {
	const iconMap = {
	  'Clear': '&#xf185;', // Sun icon
	  'Clouds': '&#xf6c4;', // Cloud with sun icon
	  'Rain': '&#xf73d;', // Umbrella icon
	  'overcast clouds' : 'f185',
	  // Add more weather conditions and their corresponding Font Awesome icons
	};
  
	return iconMap[weatherCondition] || '&#xf12a;'; // Default to the 'help' icon
  }