<script setup>
import { ref } from 'vue'
import { fetchWeather } from '../services/weatherService.js'

// Icons
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faTemperatureThreeQuarters, faWind, faDroplet} from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-regular-svg-icons'

library.add(faMagnifyingGlass, faTemperatureThreeQuarters, faWind, faDroplet, faSun)

const weather = ref(null)
const searchBar = ref('')
const errorMsg = ref('')


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

const search = async () => {
  if (!isNaN(searchBar.value) || searchBar.value.trim() === '') {
    errorMsg.value = 'Invalid location'
  } else {
    errorMsg.value = ''
    try {
      const data = await fetchWeather(searchBar.value)
      weather.value = data
    } catch (error) {
      console.error(error)
      errorMsg.value = 'Failed to fetch weather data'
    }
    searchBar.value = ''
  }
}
</script>

<template>
  <div id="wrapper">
    <div id="search">
      <font-awesome-icon icon="magnifying-glass" class="icon" />
      <input
        v-model="searchBar"
        @keyup.enter="search"
        autofocus
        type="text"
        placeholder="Enter location"
      />
    </div>

    <!-- Weather information -->
    <div v-if="weather">

      <div id="current-weather">
        <h2 class="city-name">{{ weather.name }}</h2>
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
          <span class="uv">{{ weather.uv }}<p v-if="weather.uv >= 3" class="uv-warning">High</p></span>
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
  </div>
  <footer>
    <p>Made with ♡ by <a href="https://emmamellgren.vercel.app">Emma Mellgren</a></p>
  </footer>
</template>
