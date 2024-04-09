<script setup>
import { ref } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass)

const location = ref('')

// const weather = ref(null)

const weatherData = {
  fetchWeather: function (city) {
    fetch(
      'https://api.weatherapi.com/v1/' +
        'current.json' +
        '?key=550f2bc9f0aa46b5945111518231412' +
        '&q=' +
        city
    )
      .then((response) => {
        return response.json()
      })

      .then((data) => {
        this.displayWeather(data) // data is sent to function displayWeather
      })
  },

  displayWeather: function (data) {
    // value of const {} will be taken from objects and stored in a variable
    const { name } = data.location
    const { text } = data.current.condition
    const { temp_c, humidity } = data.current
    const { wind_kph } = data.current
  },

  search: function () {
    if (!isNaN(searchBar.value) || searchBar.value.trim() === '') {
      errorMsgInvalidLocation()
    } else {
      searchBar.classList.remove('search-bar--invalid')
      document.querySelector('.invalid').style.display = 'none'
      this.fetchWeather(searchBar.value)
      searchBar.value = ''
      card.style.height = 'min-content'
      document.querySelector('.weather-container').style.display = 'block'

      //If location is invalid and weather card is open, reposition error message
      if (
        !isNaN(searchBar.value) ||
        (searchBar.value.trim() === '' &&
          document.querySelector('.weather-container').style.display === 'block')
      ) {
        document.querySelector('.invalid').style.top = '105px'
      }
    }
  }
}
</script>

<template>
  <div id="wrapper">
    <div id="search">
      <font-awesome-icon icon="magnifying-glass" class="icon" />
      <input v-model="location" placeholder="Enter location" />
    </div>
    <div id="current-weather">
      <h2 class="city-name">London {{ name }}</h2>
      <h1 class="degrees">58°</h1>
      <h2 class="forecast">Partly Cloudy</h2>
      <span id="forecast-wrapper">
        <p class="forecast-high">H:72°</p>
        <p class="forecast-low">L:49°</p>
      </span>
    </div>
    <div id="Days-forecast">
      <span>
        <p>Tomorrow</p>
        <p>49°</p>
      </span>
      <span>
        <p>Tue</p>
        <p>49°</p>
      </span>
      <span>
        <p>Wed</p>
        <p>49°</p>
      </span>
    </div>
  </div>
  <footer>
    <p>Made with ♡ by <a href="https://emmamellgren.vercel.app">Emma Mellgren</a></p>
  </footer>
</template>
