<template>
  <div class="settings-card">
    <div class="settings-card__header">
      <span class="card-title">Settings</span>
      <button class="back-button" @click="$emit('changeTab', 'WeatherCard')">
        <img src="https://i.pinimg.com/originals/3e/29/20/3e2920758b4d82791f367ad6d7b5f52f.png" class="icon back"/>
      </button>
    </div>
    <div class="settings-card__inner">
      <div class="chosen-locations">
        <div class="locations-list">
          <draggable tag="span" :list="locations" handle=".handle">
            <div class="location" v-for="(location, key) in locations" :key="key">
              <img src="https://i.pinimg.com/originals/cf/87/11/cf8711778fa5a725541bafa4b41fb479.png" class="icon drag handle"/>
              <span class="location_name">{{ location.name }}</span>
              <button class="delete_location" @click="$emit('deleteLocation', key)">
                <img src="https://i.pinimg.com/originals/f7/f1/03/f7f1035d0201a52f3df205ab597ffdca.png" class="icon delete"/>
              </button>
            </div>
          </draggable>
        </div>
      </div>
      <div class="location-add">
        <div class="location-add__inner">
          <span class="location-title">Add location:</span>
          <div class="location-input-wrapper">
            <input class="location-input-field" v-model="new_location"/>
            <button class="location-input-button" @click="addLocation">
              <img src="https://i.pinimg.com/originals/ed/92/78/ed92784c3bf967dc59e99df83a9e284a.png" class="icon enter"/>
            </button>
          </div>
          <div class="error-box" v-if="error">
            {{error}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getApiLocationName} from "@/api/api.js"
import draggable from 'vuedraggable'

export default {
  name: "SettingsCard",
  props: {
    locations: Array
  },
  components: {
    draggable
  },
  data() {
    return {
      error: '',
      new_location: ''
    }
  },
  methods: {
    addLocation: async function () {
      let new_location_data = await getApiLocationName(this.new_location)
      if (!(new_location_data instanceof Error)) {
        this.locations.push(new_location_data)
        this.new_location = ''
        this.error = ''
      }
      else {
        this.error = `This city doesn't exist`
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.settings-card
  width: 100%

.card-title, .location-title
  font-weight: 800

.settings-card__header
  display: flex
  flex-direction: row
  align-items: center
  .back-button
    margin-left: auto
    width: 30px
    height: 30px
    padding: 0
    border: none
    background: transparent

.settings-card__inner
  .location
    height: 40px
    position: relative
    display: flex
    flex-direction: row
    align-items: center
    background: #e7e7e7
    margin: 20px 0
    padding-left: 5px
    cursor: default

  .delete_location
    height: 100%
    width: 40px
    border: 0
    background: transparent
    margin-left: auto
    padding: 0
    cursor: pointer

  .location-input-wrapper
    height: 30px
    width: 100%
    display: flex

    .location-input-field
      width: 270px
      padding: 2px 6px
      font-family: inherit

    .location-input-button
      width: 30px
      height: 100%
      padding: 0
      border: none
      background: transparent
      cursor: pointer

.icon
  position: relative
  height: 20px

  &.drag
    margin-right: 8px
    cursor: pointer

.error-box
  width: 100%
  padding: 10px 0
  color: red

</style>