
const mainVue = httpVueLoader('./components/main.vue')

new Vue({
  el: '#app',
  components: {
    mainVue
  },
})
