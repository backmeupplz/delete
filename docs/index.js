var main = new Vue({
  el: '#main',
  data: {
    wallPosts: true,
    photos: true,
    likes: true,
    videos: true,
  },
  methods: {
    deleteFacebook(token) {
      alert('To be developed!')
    }
  },
  computed: {
    deletable: function() {
      return this.wallPosts || this.photos || this.likes || this.videos
    },
    permissions: function() {
      const list = []
      if (this.wallPosts) list.push('user_posts')
      if (this.photos) list.push('user_photos')
      if (this.likes) list.push('user_likes')
      if (this.videos) list.push('user_videos')
      return list.join(',')
    },
  }
})

// Setup facebook SDK
window.fbAsyncInit = function() {
  FB.init({
    appId      : '221381691878489',
    cookie     : true,
    xfbml      : true,
    version    : 'v3.1'
  });
};

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function checkFacebook() {
  FB.getLoginStatus(function(response) {
    handleFacebook(response);
  });
}

function handleFacebook(response) {
  if (response.status !== 'connected') {
    alert('Please, authorize the app for all the permissions required!')
    return
  }
  main.deleteFacebook(response.authResponse.accessToken)
}