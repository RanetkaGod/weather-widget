<template>
  <div class="settings-card">
    <div class="settings-card__inner">
      <div class="chosen-locations">
        <div class="locations-list">
          <div class="location" v-for="(location, key) in locations" :key="key">{{ location.name }}</div>
        </div>
      </div>
      <div class="location-add">
        <div class="location-add__inner">
          <span class="location-title">Add location:</span>
          <div class="location-input-wrapper">
            <input class="location-input-field" v-model="new_location"/>
            <button class="location-input-button" @click="addLocation">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getApiLocationName } from "@/api/api.js"

export default {
  name: "SettingsCard",
  props: {
    locations: Array
  },
  data() {
    return {
      new_location: ''
    }
  },
  methods: {
    addLocation: async function () {
      let new_location_data = await getApiLocationName(this.new_location)
      if (new_location_data) {
        this.locations.push(new_location_data)
      }
    }
  }
}
</script>

<style lang="sass" scoped>

</style>