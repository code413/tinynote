window.Vue = require('vue');
window.axios = require('axios');
window.feather = require('feather-icons')


window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Dropzone = require('dropzone/dist/dropzone');
Dropzone.autoDiscover = false;

const files = require.context('./', true, /\.vue$/i)
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

const app = new Vue({
  el: '#app',
  mounted()
  {
    feather.replace()
  }
});