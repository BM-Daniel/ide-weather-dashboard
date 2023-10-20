// INSIGHTS PAGE
const weatherAPI = 'http://localhost:8080/api/weather';

const greeting = document.getElementById('greeting');
const searchBar = document.getElementById('search-bar');

// Tile 1
const userLocation = document.getElementById('location');
const lastUpdateTime = document.getElementById('last-update-time');
const lastUpdateDate = document.getElementById('last-update-date');

// Tile 2
// const weatherImage = document.getElementById('weather-image');
const currentTemp = document.querySelector('.two .top .temp');
const dayTemp = document.querySelector('.two .bottom .day-temp .value');
const nightTemp = document.querySelector('.two .bottom .night-temp .value');

// Tile 3
const humidity = document.querySelector('.three .details .humidity .value');
const wind = document.querySelector('.three .details .wind .value');
const visibility = document.querySelector('.three .details .visibility .value');
const airQuality = document.querySelector('.three .details .air-quality .value');
const uvIndex = document.querySelector('.three .details .uv-index .value');

// Tile 4
const tile4Container = document.querySelector('.four');



// TIME OF DAY - MORNING, AFTERNOON, EVENING
const hourOfDay = new Date().getHours();

if (hourOfDay >= 6 && hourOfDay < 12) {
  greeting.innerText = 'Good Morning';
} else if (hourOfDay >= 12 && hourOfDay < 18) {
  greeting.innerText = 'Good Afternoon';
} else {
  greeting.innerText = 'Good Evening';
}


// EVENT LISTENERS
searchBar.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    const userLocation = searchBar.value;

    event.preventDefault();
    searchBar.value = '';

    window.location.href = `/insights.html?location=${userLocation}`;
    fetchData(`${weatherAPI}/${userLocation}`)
  }
})


// WEATHER SEARCH DATA
let searchLocation = window.location.href;
searchLocation = searchLocation.split('=')[1];
const fullURL = `${weatherAPI}/${searchLocation}`;

async function fetchData(url) {
  try {
    const response = await fetch(url);

    if(!response.ok) {
      throw new Error(`Error. Status: ${response.status}`);
    }
    const data = await response.json();

    // Tile 1
    const date = new Date(data.lastUpdate);
    const dayOptions = { year: 'numeric', month: 'long', day: 'numeric' };

    userLocation.innerText = searchLocation.charAt(0).toUpperCase() + searchLocation.slice(1);
    lastUpdateTime.innerText = `${date.getHours()}:${date.getMinutes()}`;
    lastUpdateDate.innerText = `${date.toLocaleDateString('en-US', dayOptions)}`;
    
    // Tile 2
    currentTemp.innerText = Math.round(data.currentWeather.temperature) + '°C';
    dayTemp.innerText = Math.round(data.currentWeather.averageDayTemp) + '°C';
    nightTemp.innerText = Math.round(data.currentWeather.averageNightTemp) + '°C';

    // Tile 3
    humidity.innerText = data.currentWeather.humidity + '%';
    wind.innerText = data.currentWeather.wind + 'km/h';
    visibility.innerText = (data.currentWeather.visibility / 1000).toFixed(1) + 'km';
    airQuality.innerText = data.currentWeather.airQuality;
    uvIndex.innerText = data.currentWeather.uvIndex;

    // Tile 4
    for (let i = 0; i < 6; i++) {
      const mainDiv = document.createElement('div');
      mainDiv.classList.add('other-days', 'flex', 'items-center', 'justify-between', 'bg-tileColor', 'rounded', 'p-3', 'font-bold', 'flex-grow', 'md:flex-col');
    
      const dayName = document.createElement('p');
      dayName.classList.add('md:text-2xl')
      dayName.textContent = 'Other Days';
    
      const middleDiv = document.createElement('div');
      middleDiv.classList.add('middle', 'flex', 'gap-x-4', 'items-center', 'md:flex-col', 'md:gap-x-0');
    
      const otherDayTemp = document.createElement('p');
      otherDayTemp.classList.add('font-bold', 'text-2xl', 'md:text-6xl')
      otherDayTemp.textContent = Math.round(data.subsequentDays[i].temperature) + '°C';
    
      const otherDayHumidity = document.createElement('p');
      otherDayHumidity.innerHTML = `<i class="fa-solid fa-droplet"></i> ${data.subsequentDays[i].humidity}%`;
    
      const bottomDiv = document.createElement('div');
      bottomDiv.classList.add('bottom', 'flex', 'gap-x-4');
    
      const temp1 = document.createElement('p');
      temp1.textContent = Math.round(data.subsequentDays[i].averageDayTemp) + '°C';
    
      const temp2 = document.createElement('p');
      temp2.textContent = Math.round(data.subsequentDays[i].averageNightTemp) + '°C';
    
      middleDiv.appendChild(otherDayTemp);
      middleDiv.appendChild(otherDayHumidity);
      bottomDiv.appendChild(temp1);
      bottomDiv.appendChild(temp2);
      mainDiv.appendChild(dayName);
      mainDiv.appendChild(middleDiv);
      mainDiv.appendChild(bottomDiv);
      tile4Container.appendChild(mainDiv);
    }

    // window.location.reload();
    // airQuality AQI, 


  } catch (error) {
    window.location.href = `/not-found`;
    console.error(`Fetch error: ${error}`);
  }
}

fetchData(fullURL)