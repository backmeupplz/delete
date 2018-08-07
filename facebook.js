Vue.component('facebook', {
  data: function() {
    return {
      wallPosts: true,
      photos: true,
      showExtra: false,
    }
  },
  computed: {
    deletable: function() {
      return this.wallPosts || this.photos
    }
  },
  methods: {
    deleteFacebook: function () {
      alert('nice!')
    }
  },
  template: `
  <div>
    <p>So you decided to clean up your facebook account. Please, select what would you like to remove.</p>
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
      <p v-if="!deletable">Make sure you select at least one thing to delete!</p>
      <button class="btn btn-primary" @click.prevent='deleteFacebook()' :disabled="!deletable">Delete!</button>
    </div>
    <br>

    <div v-if="!showExtra">
      <p>Don't trust this website? You shouldn't! Would you like to enter your own Facebook API keys?</p>
      <button class="btn btn-secondary" @click.prevent='showExtra = true'>Show API key setup</button>
    </div>
    <div v-if="showExtra">
      <p>Just enter your Facebook API keys below and hit the <code>Delete</code> button above. You can learn how to obtain your own Facebook app API key and secret <a href="https://google.com">here</a>.</p>
      <form>
        <div class="form-group row">
          <label for="apiKey" class="col-sm-2 col-form-label">API key</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="apikey" placeholder="API key">
          </div>
        </div>
        <div class="form-group row">
          <label for="secret" class="col-sm-2 col-form-label">Secret</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" id="secret" placeholder="Secret">
          </div>
        </div>
      </form>
    </div>
  </div>
  `,
})