import Vue from 'vue'
import App from './App.vue'
import wrap from '@vue/web-component-wrapper'

const CustomElement = wrap(Vue, App)

window.customElements.define('vue-weather-widget', CustomElement)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
