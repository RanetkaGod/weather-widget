<template>
  <div id="app">
    <component v-if="locations.length || current_tab.name !== 'WeatherCard'" @deleteLocation="deleteLocation" @changeTab="changeTab" :locations="locations" :is="current_tab"/>
  </div>
</template>

<script>
import WeatherCard from "@/components/WeatherCard";
import SettingsCard from "@/components/SettingsCard";

export default {
  name: 'App',
  components: {
    SettingsCard,
    WeatherCard
  },
  data() {
    return {
      current_tab: WeatherCard,
      locations: []
    }
  },
  mounted: function () {
    if (!window.localStorage.getItem("locations")) {
      this.getGeoData()
    } else {
      this.locations = JSON.parse(window.localStorage.getItem("locations"))
    }
  },
  methods: {
    getGeoData: function () {
      window.navigator.geolocation.getCurrentPosition(this.setCurrentLocation, console.log) // successCallback, failureCallback
    },
    setCurrentLocation: function (data) {
      this.locations.push(
          {
            'latitude': data.coords.latitude,
            'longitude': data.coords.longitude
          }
      )
      this.updateLocalStorage()
    },
    updateLocalStorage: function () {
      if (!this.locations.length && this.current_tab.name !== 'SettingsCard') {
        this.getGeoData()
      }
      window.localStorage.setItem("locations", JSON.stringify(this.locations))
    },
    changeTab: function (tab) {
      this.current_tab = tab
    },
    deleteLocation: function (key) {
      this.locations.splice(key, 1)
    },
  },
  watch: {
    locations: function () {
      this.updateLocalStorage()
    }
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap')

#app
  width: 300px

*
  box-sizing: border-box

body
  font-family: "Roboto", sans-serif

button:focus
  outline: none

  &:active
    outline: none
    border: none

::-moz-focus-inner
  border: 0

</style>
