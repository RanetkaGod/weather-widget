<template>
  <div class="weather-card">
    <div class="weather-card__inner" v-if="weather_data !== null">
      <div class="weather-card__header">
        <div class="location-name">{{ weather_data.location_name }}</div>
        <button class="settings-button">
          <img class="icon gear-icon" src="@/assets/gear_icon.webp"/>
        </button>
      </div>
      <div class="weather">
        <div class="temp-wrapper">
          <img class="icon weather-type-img" :src="getWeatherIcon(weather_data.weather_type)">
          <span class="temp">{{ weather_data.temp | round }}&#176;C</span>
        </div>
        <div class="description">
            <span class="">Feels like {{ weather_data.feels_like | round }}.
            {{ weather_data.description | capitalize }}. {{windStrenght}}. </span>
        </div>
        <div class="detailed_data">
              <span class="cell wind">
                <img class="logo wind_logo" :style="{ transform: `rotate(${weather_data.wind_deg - 45}deg)` }"
                     src="@/assets/arrow.png">
                <span>{{ weather_data.wind_speed }}m/s {{windDirection}}</span>
              </span> <!--deg-->
          <span class="cell">
                <img class="logo pressure_logo" src="@/assets/barometer.png">
                <span>{{ weather_data.pressure }}hPa</span>
              </span>
          <span class="cell">Humidity: {{ weather_data.humidity }}%</span>
          <span class="cell">Visibility: {{ weather_data.visibility }}km</span>
          <!--Dew point ???-->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {getWeatherByCoords} from "@/api/api"

export default {
  name: "WeatherCard",
  props: ["locations"],
  data() {
    return {
      weather_data: null,
    }
  },
  watch: {
    locations: function (newVal) {
      if (newVal.currentLocation.latitude) {
        this.updateWeatherData()
      }
    }
  },
  mounted() {
    this.updateWeatherData()
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    round: function (value) {
      if (!value) return ''
      value = Math.round(value)
      return value
    }
  },

  methods: {
    getWeatherIcon: function (id) {
      let icons_url = `http://openweathermap.org/img/wn/${id}@4x.png`
      return icons_url
    },
    updateWeatherData: async function () {
      this.weather_data = await getWeatherByCoords(this.locations.currentLocation)
    }
  },

  computed: {
    windStrenght: function () {
      let wind_speed = this.weather_data.wind_speed
      if (wind_speed <= 5 && wind_speed >= 2)
        return 'Light breeze'
      else if (wind_speed < 2)
        return 'Calmy'
      else if (wind_speed > 5)
        return 'Strong wind'
      else
        return ''
    },
    windDirection: function () {
      let wind_deg = this.weather_data.wind_deg
      let val = Math.round(wind_deg / 22.5);
      let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
      return arr[(val % 16)];
    }
  }
}
</script>

<style lang="sass" scoped>
.weather-card
  width: 300px

  .weather-card__inner
    .location-name
      font-weight: 800
      font-size: 1.1em

    .weather
      .temp-wrapper
        display: flex
        flex-direction: row
        align-items: center
        justify-content: center
        margin: 10px 0

        .weather-type-img
          width: 120px
          height: 120px

        .temp
          width: 120px
          font-size: 2.6em
          font-weight: 800


      .detailed_data
        margin-top: 20px
        display: grid
        grid-column-gap: 40px
        grid-template-columns: 1fr 1fr

        .cell
          height: 40px
          display: flex
          flex-direction: row
          align-items: center

          .logo
            width: 20px
            height: 20px
            margin: 0 10px

    .weather-card__header
      display: flex
      flex-direction: row
      justify-content: space-between

      .settings-button
        width: 30px
        height: 30px
        padding: 0
        border: none
        background: transparent

        .gear-icon
          height: 30px
          width: 30px

        &:active
          outline: none
          border: none

</style>