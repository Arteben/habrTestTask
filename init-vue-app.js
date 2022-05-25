
const rootVue = httpVueLoader('./components/root.vue')

new Vue({
  el: '#app',
  components: {
    rootVue
  }
})
