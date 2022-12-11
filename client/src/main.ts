import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia';
import axios from "axios";
import router from "./router";
import "bootstrap/dist/css/bootstrap.css"
// import store from "./store";

import "./assets/style.scss";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

library.add(faUser)

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
// app.use(store);
app.use(createPinia())
app.use(router);
app.mount("#app");
