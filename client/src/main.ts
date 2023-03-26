import { createApp } from "vue";
import { createPinia } from 'pinia';
import App from "./App.vue";
import router from "./router";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


// import store from "./store";

import "./assets/style.scss";

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faCalendarDays, faClose } from '@fortawesome/free-solid-svg-icons'
//компонент для выбора юзера из выпадающего списка
import vSelect from 'vue-select'

library.add(faUser, faCalendarDays, faClose)

const app = createApp(App);
app.component('v-select', vSelect)
app.component('font-awesome-icon', FontAwesomeIcon)


// app.use(store);
app.use(createPinia())
app.use(router);

// Кастомная директива на clickOutside
app.directive(
    'click-outside', {
    beforeMount(el, binding, vnode) {
        el.clickOutsideEvent = function (event: any) {
            if (!(el === event.target || el.contains(event.target))) {
                binding.value(event, el);
            }
        };
        document.addEventListener('click', el.clickOutsideEvent);
    },
    unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent);
        // document.body.removeEventListener('click', el.clickOutsideEvent); // ОБРАТИТЬ ВНИМАНИЕ НА .body.
        // Сейчас директива обрабатывает весь документ на мисклик, а можно было только конкретный участок типа body
    }
})

app.mount("#app");
