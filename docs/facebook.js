Vue.component('facebook', {
  data: function() {
    return {
      wallPosts: true,
      photos: true,
      showExtra: false,
      token: '',
    }
  },
  computed: {
    deletable: function() {
      return this.token && (this.wallPosts || this.photos)
    }
  },
  methods: {
    deleteFacebook: function () {
      alert('nice!')
    }
  },
  template: `
  <div>
    <p>So you decided to clean up your facebook account. Please, enter your access token that is fetched from <a href="https://token.delete.live">here</a> and select what would you like to remove.</p>
    <div class="form-group row">
      <input type="text" class="form-control" placeholder="Facebook token" v-model="token">
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input class="form-check-input" type="checkbox" v-model="wallPosts">
        Wall posts
      </label>
    </div>
    <div class="form-check">
      <label class="form-check-label">
        <input class="form-check-input" type="checkbox" v-model="photos">
        Photos
      </label>
    </div>
    <div class="text-center">
      <button class="btn btn-primary" @click.prevent='deleteFacebook()' :disabled="!deletable">Delete!</button>
    </div>
    <br>
    <p v-if="!deletable">Make sure you select at least one thing to delete and provide the access token</p>
  </div>
  `,
})