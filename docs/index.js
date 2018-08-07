var main = new Vue({
  el: '#main',
  data: {
    page: 'facebook'
  },
  methods: {
    activeClass: function(name) {
      return { 
        active: this.page === name
      }
    }
  }
})