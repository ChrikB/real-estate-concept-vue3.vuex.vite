
import { createApp } from 'vue'
import router from './router'
import store from './stores/vuex-store'

import './style.css'
import App from './App.vue'

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



import "./assets/main.css";

  const app = createApp(App);
  app.use(router)
  app.use(store)
  .mount("#app");

