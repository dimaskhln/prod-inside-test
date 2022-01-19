import Vue from 'vue';
import router from './router';
import App from './App.vue';
import axios from 'axios';
import vuetify from './vuetify'; // path to vuetify export

new Vue({
  el: '#app',
  render: (h) => h(App),
  vuetify,
  router,
  axios,
});
