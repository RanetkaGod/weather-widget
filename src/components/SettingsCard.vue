<template>
  <div class="settings-card">
    <div class="settings-card__inner">
      <div class="chosen-locations"></div>
      <div class="location-add">
        <div class="location-add__inner">
          <span class="location-title">Add location:</span>
          <div class="location-input-wrapper">
            <input class="location-input-field" v-model="new_location"/>
            <button class="location-input-button" @click="add_location"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsCard",
  data() {
    return {
      new_location: ''
    }
  },
  methods: {
    add_location: function () {

    }
  }
}
</script>

<style lang="sass" scoped>

</style>