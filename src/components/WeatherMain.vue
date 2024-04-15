<script setup>
import { ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass, faTemperatureThreeQuarters } from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass, faTemperatureThreeQuarters)

const weather = ref(null)
const searchBar = ref('')
const errorMsg = ref('')

const fetchWeather = (city) => {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=550f2bc9f0aa46b5945111518231412&q=${city}&days=3`
  )
    .then((response) => {
      return response.json()
    })

    .then((data) => {
      const { name } = data.location
      const { forecast } = data.current.condition
      const { temp_c, humidity } = data.current
      const { wind_kph } = data.current
      const { feelslike_c } = data.current
      const { avgtemp_c: avgtemp_c } = data.forecast.forecastday[1].day
      const { avgtemp_c: avgtemp_c2 } = data.forecast.forecastday[2].day
      const avgtempTomorrow = Math.floor(avgtemp_c)
      const avgtempDay3 = Math.floor(avgtemp_c2)
      const feelsLike = Math.floor(feelslike_c)
      weather.value = { name, forecast, temp_c, humidity, wind_kph, avgtempTomorrow, avgtempDay3, feelsLike }
    })
}

// Tomorrow
const today = new Date()
const setTomorrow = new Date(today)
setTomorrow.setDate(today.getDate() + 1)
const tomorrow = setTomorrow.toLocaleDateString('en-us', { weekday: 'long' })

// 3rd day
const setDay3 = new Date(today)
setDay3.setDate(today.getDate() + 2)
const day3 = setDay3.toLocaleDateString('en-us', { weekday: 'long' })

const search = () => {
  if (!isNaN(searchBar.value) || searchBar.value.trim() === '') {
    errorMsg.value = 'Invalid location'
  } else {
    errorMsg.value = ''
    fetchWeather(searchBar.value)
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
        <p class="air-conditions">Air conditions</p>
        <div id="conditions-grid">
        <div class="condition-item">
        
        <span class="feels-like">
          <font-awesome-icon icon="temperature-three-quarters" />
          <p>Feels like</p>
        </span>
        <p class="feels-like__celcius">{{ weather.feelsLike }}°</p>
      </div>
      <div class="condition-item">test</div>
      <div class="condition-item">test</div>
      <div class="condition-item">test</div>
      </div>
    </div>
      <div id="days-forecast">
        <p class="day-forecast">2-day forecast</p>
        <span>
          <p>{{ tomorrow }}</p>
          <p>{{ weather.avgtempTomorrow }}°</p>
        </span>
        <span>
          <p>{{ day3 }}</p>
          <p>{{ weather.avgtempDay3 }}°</p>
        </span>
      </div>
    </div>
  </div>
  <footer>
    <p>Made with ♡ by <a href="https://emmamellgren.vercel.app">Emma Mellgren</a></p>
  </footer>
</template>
