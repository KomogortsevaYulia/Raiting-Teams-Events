import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "./assets/style.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//компонент для выбора юзера из выпадающего списка
import vSelect from "vue-select";
import VCalendar from "v-calendar";

library.add(fas);

const app = createApp(App);
app.component("v-select", vSelect);
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);
app.use(VCalendar, {});
// Кастомная директива на clickOutside
app.directive("click-outside", {
  beforeMount(el, binding) {
    el.clickOutsideEvent = function (event: MouseEvent) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event, el);
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted(el) {
    document.removeEventListener("click", el.clickOutsideEvent);
    // document.body.removeEventListener('click', el.clickOutsideEvent); // ОБРАТИТЬ ВНИМАНИЕ НА .body.
    // Сейчас директива обрабатывает весь документ на мисклик, а можно было только конкретный участок типа body
  },
});

app.mount("#app");
