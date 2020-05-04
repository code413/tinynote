window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

window.Dropzone = require('dropzone/dist/dropzone');
Dropzone.autoDiscover = false;
