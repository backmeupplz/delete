var main = new Vue({
  el: '#main',
  data: {
    photos: true,
    likes: true,
    videos: true,
    logStrings: [],
  },
  methods: {
    deleteFacebook() {
      if (!this.deletable) {
        alert('Please, select at least one thing to delete')
        return
      }
      deleteData(this.photos, this.likes, this.videos)
    },
  },
  computed: {
    log: function() {
      return this.logStrings.join('')
    },
    deletable: function() {
      return this.photos || this.likes || this.videos
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

function deleteData(photos, likes, videos) {
  const thingsToDelete = []
  if (photos) thingsToDelete.push('photos')
  if (likes) thingsToDelete.push('likes')
  if (videos) thingsToDelete.push('videos')
  append(`🔥 You have selected to delete: ${thingsToDelete.join(', ')}`)
  append('🚀 Fetching data from Facebook...')
  let p = getMe()
  if (likes) {
    p = p.then(() => deleteLikes())
  }
  p.then(() => {
    append(`🎉 Great! All the data you requested has been deleted!`)
  })
}

function append(str) {
  main.logStrings.push(str)
}

function getMe() {
  return new Promise((res) => {
    FB.api(
      '/me',
      'GET',
      {},
      function(response) {
        append(`🦄 Fetched your name (${response.name}) and Facebook ID (${response.id})`)
        res()
      }
    );
  })
}

function deleteLikes() {
  return getLikes()
    .then((posts) => {
      append(`👍 Found ${posts.length} likes, deleting...`)
      return deleteObjects(posts)
    })
}

function getLikes() {
  return getObjects('/me/likes')
}

function deleteObjects(objects) {
  return new Promise((res) => {
    append(`🔥 Deleting ${objects.length} objects...`)
    const promises = []
    for (const object of objects) {
      promises.push(deleteObject(object))
    }
    Promise.all(promises)
      .then(() => {
        res()
      })
      .catch((err) => {
        append(`❗️ Error: ${err.message}`)
        res()
      })
  })
}

function getObjects(endpoint) {
  let acc = []
  return new Promise((res) => {
    FB.api(
      endpoint,
      'GET',
      {},
      function(response) {
        acc = acc.concat(response.data.map(v => v.id))
        const previous = response.paging.previous
        const next = response.paging.next
        getObjectsAtUrl(previous)
          .then((objects) => {
            acc = acc.concat(objects)
            return getObjectsAtUrl(next)
          })
          .then((objects) => {
            acc = acc.concat(objects)
            res(acc)
          })
      }
    );
  })
}

function deleteObject(id) {
  return new Promise((res) => {
    FB.api(
      `/${id}`,
      'DELETE',
      {},
      function(response) {
        if (response.error) {
          append(`❗️ Error deleting objects: ${response.error.message}`)
        }
        res()
      }
    );
  })
}

function getObjectsAtUrl(url) {
  return new Promise((res) => {
    if (!url || !url.length) return res([])
    let acc = []
    axios.get(url)
      .then((response) => {
        acc = acc.concat(response.data.data)
        const paging = response.data.paging || {previous: '', next: ''}
        return getObjectsAtUrl(paging.previous)
          .then((iObjects) => {
            acc = acc.concat(iObjects)
            return getObjectsAtUrl(paging.next)
          })
          .then((iObjects) => {
            acc = acc.concat(iObjects)
            res(acc)
          })
      })
      .catch((err) => {
        append(`❗️ Error getting objects: ${err.message}`)
        res(acc)
      })
  })
}