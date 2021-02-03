<template>
  <div id="app">
    <component @changeTab="changeTab" :locations="locations" :is="current_tab"/>
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
      window.navigator.geolocation.getCurrentPosition(this.setCurrentLocation, console.log) // successCallback, failureCallback
    } else {
      this.locations = JSON.parse(window.localStorage.getItem("locations"))
    }
  },
  methods: {
    setCurrentLocation(data) {
      this.locations.push(
          {
            'latitude': data.coords.latitude,
            'longitude': data.coords.longitude
          }
      )
      this.updateLocalStorage()
    },
    updateLocalStorage: function () {
      window.localStorage.setItem("locations", JSON.stringify(this.locations))
    },
    changeTab: function (tab) {
      this.current_tab = tab
    }
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap')
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap')

body
  font-family: "Roboto", sans-serif

button:focus
  outline: none

::-moz-focus-inner
  border: 0

</style>
