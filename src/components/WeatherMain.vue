<script setup>
import { ref, onMounted } from 'vue'
import { fetchWeather } from '../services/weatherService.js'
import { getLocation } from '../services/geolocationService.js'

// Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faTemperatureThreeQuarters, faWind, faDroplet, faLocationDot} from '@fortawesome/free-solid-svg-icons'
import { faSun, faHeart } from '@fortawesome/free-regular-svg-icons'

library.add(faMagnifyingGlass, faTemperatureThreeQuarters, faWind, faDroplet, faLocationDot, faSun, faHeart)

/*=============================================
=            Managing date                    =
=============================================*/

// Tomorrow
const today = new Date()
const setTomorrow = new Date(today)
setTomorrow.setDate(today.getDate() + 1)
const tomorrow = setTomorrow.toLocaleDateString('en-us', { weekday: 'long' })

// 3rd day
const setDay3 = new Date(today)
setDay3.setDate(today.getDate() + 2)
const day3 = setDay3.toLocaleDateString('en-us', { weekday: 'long' })

/*=============================================*/

const weather = ref(null)
const searchBar = ref('')

const latlong = ref(null);
const isGeolocation = ref(false);

const loading = ref(true);

onMounted(() => {
  getLocation(async (latlongValue) => {
    latlong.value = latlongValue;
    
    if (latlongValue) {
      isGeolocation.value = true;
      console.log(isGeolocation.value)
    } else {
      isGeolocation.value = false;
      console.log(isGeolocation.value)
    }
    await renderWeatherByGeolocation(latlongValue);
  });
});

// Fetch weather after prompt, by users geolocation
const renderWeatherByGeolocation = async (latlongValue) => {

  //Setting states
  isGeolocation.value = true;

  try {
    
    const data = await fetchWeather(latlongValue);
    weather.value = data;
    loading.value = false;

  } catch (error) {
    console.log('Failed to fetch weather data based on geolocation' + error.message);
  }

}

// Fetch weather from city input by user
const renderWeatherOnSearch = async () => {

  // Error handling
  if (!isNaN(searchBar.value) || searchBar.value.trim() === '') {
    console.log('Invalid location')
    return;
  }

  try {
    const data = await fetchWeather(searchBar.value)

    // If the city was manually submitted, set isGeolocation to false
    isGeolocation.value = false;

    loading.value = false;
    weather.value = data
  } catch (error) {
    console.log('Failed to fetch weather data based on chosen city' + error.message);
  }
    searchBar.value = ''
}

</script>


<template>
  


  <main id="wrapper">
    <div id="search">
      <font-awesome-icon icon="magnifying-glass" class="icon" />
      <input
        v-model="searchBar"
        @keyup.enter="renderWeatherOnSearch"
        autofocus
        type="text"
        placeholder="Enter location"
      />
    </div>

    <div v-if="loading" id="loading-state">
      <div class="loader"></div>
    </div>
    
    <!-- Weather information -->
    <div v-else-if="weather">

      <div id="current-weather">
        
        <h2 class="city-name">
          <span v-if="isGeolocation === false"></span>
          <span v-else><font-awesome-icon icon="location-dot" class="location-icon"/></span>
          {{ weather.name }}
        </h2>
        <h1 class="degrees">{{ weather.temp_c }}°</h1>
        <h2 class="forecast">{{ weather.forecast }}</h2>
      </div>

      <div id="conditions">
        <p class="card-title">Air conditions</p>

        <div id="conditions-grid">

        <div class="condition-item">
        <span class="condition-item__description">
          <font-awesome-icon icon="temperature-three-quarters" :style="{ color: 'rgb(187, 109, 14)'}"/>
          <p>Feels like</p>
        </span>
        <p class="condition-item__condition">{{ weather.feelsLike }}°</p>
      </div>
      <div class="condition-item">
        <span class="condition-item__description">
          <font-awesome-icon icon="wind" :style="{ color: 'rgb(102, 167, 197)'}"/>
          <p>Wind speed</p>
        </span>
        <p class="condition-item__condition">{{ weather.wind_kph }} km/h</p>
      </div>
      <div class="condition-item">
        <span class="condition-item__description">
          <font-awesome-icon icon="droplet" :style="{ color: 'rgb(14, 132, 187)'}"/>
          <p>Chance of rain</p>
        </span>
        <p class="condition-item__condition">{{ weather.daily_chance_of_rain }} %</p>
      </div>
      <div class="condition-item">
        <span class="condition-item__description">
          <font-awesome-icon icon="fa-regular fa-sun" :style="{ color: 'rgb(255, 238, 0)'}" />
          <p>UV Index</p>
        </span>
          <span class="uv">{{ weather.uv }}<p v-if="weather.uv >= 3" class="uv-warning">High!</p></span>
      </div>
      </div>
    </div>
      <div id="days-forecast">
        <p class="card-title">2-day forecast</p>
        <span>
          <p>{{ tomorrow }}</p>
          <p class="forecast-temp">{{ weather.avgtempTomorrow }}°</p>
        </span>
        <span>
          <p>{{ day3 }}</p>
          <p class="forecast-temp">{{ weather.avgtempDay3 }}°</p>
        </span>
      </div>
    </div>
  </main>

  <footer>
    <div class="style">
      <a href="https://emmamellgren.vercel.app"><font-awesome-icon icon="fa-regular fa-heart" class="footer-icon"/></a>
    </div>
  </footer>
</template>