import { createApp } from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';
import App from './App.vue';
import User from './helpers/User';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import 'sweetalert2/dist/sweetalert2.min.css';

const options = {
  position: 'top-end',
  timer: 3000,
  toast: true,
  showConfirmButton: false,
  showCancelButton: false,
  timerProgressBar: true,
};

window.User = User;

createApp(App)
  .use(store)
  .use(router)
  .use(VueSweetalert2, options)
  .mount('#app');
