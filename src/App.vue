<template>
  <div id="app">
    <component :locations = "locations" :is="currentTab"/>
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
      currentTab: WeatherCard,
      locations: {currentLocation: {}}
    }
  },
  mounted: function () {
    //let tempLoc = JSON.parse(window.localStorage.getItem("locations"))
    //console.log(tempLoc)
    if(!window.localStorage.getItem("locations")) {
      window.navigator.geolocation.getCurrentPosition(this.setCurrentLocation, console.log) // successCallback, failureCallback
    }
    else {
      this.locations = JSON.parse(window.localStorage.getItem("locations"))
    }
  },
  methods: {
    setCurrentLocation(data) {
      console.log(data.coords)
      this.locations['currentLocation']['latitude'] = data.coords.latitude
      this.locations['currentLocation']['longitude'] = data.coords.longitude
      this.updateLocalStorage()
    },
    updateLocalStorage: function () {
      window.localStorage.setItem("locations", JSON.stringify(this.locations))
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
