import Vue from 'vue';
import App from '@/App.vue';
import store from '@/store';
import { router } from '@/bootstrap';
import 'es6-promise/auto';
import '@/bootstrap';
//import '@/component';

//Import CSS
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/font-awesome/css/font-awesome.min.css';
import '@/assets/css/styles.css';

//Import JS
import './../node_modules/jquery/dist/jquery.min.js';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
}).$mount('#app');
