<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { usePermissionsStore } from '@/store/permissions_store';
import { ref } from 'vue';

const permissions_store = usePermissionsStore();
const can = permissions_store.can;

const isOpen = ref(false);

function openClose() {
    isOpen.value = !isOpen.value;
    console.log(isOpen.value);
}

function ClickOutside() {
    isOpen.value = false;
}

function OnExitSubmit() {
    permissions_store.logout()
}

</script>

<template>
    <section class="DropdownWrapper__menu" v-click-outside="ClickOutside">
        <div class="dropDownMenuButton" @click="openClose" tabindex="0">
            <label class="pe-3">{{ permissions_store.fullname }}</label>
            <!--  -->
            <svg width="40" height="40" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M31.25 15.635C31.2517 13.0339 30.6039 10.4735 29.3656 8.18608C28.1272 5.89865 26.3373 3.95657 24.1584 2.536C21.9794 1.11543 19.4803 0.261304 16.8877 0.0511054C14.295 -0.159093 11.691 0.281283 9.31161 1.33229C6.93226 2.3833 4.85294 4.01168 3.26225 6.06974C1.67156 8.1278 0.619834 10.5504 0.202461 13.1178C-0.214912 15.6853 0.0152776 18.3163 0.87215 20.7722C1.72902 23.2282 3.18547 25.4314 5.10937 27.1819C5.1489 27.2312 5.19644 27.2734 5.25 27.3069C8.1089 29.8536 11.8041 31.2608 15.6328 31.2608C19.4615 31.2608 23.1567 29.8536 26.0156 27.3069L26.1406 27.1819C27.7518 25.7211 29.039 23.9388 29.919 21.9499C30.799 19.9611 31.2525 17.8099 31.25 15.635ZM1.25 15.635C1.24981 13.2724 1.83198 10.9461 2.945 8.86202C4.05803 6.77794 5.66758 5.00034 7.63124 3.68649C9.59491 2.37264 11.8521 1.56306 14.2032 1.32938C16.5543 1.0957 18.9267 1.44512 21.1106 2.34673C23.2945 3.24834 25.2224 4.67434 26.7239 6.49855C28.2254 8.32276 29.2541 10.4889 29.719 12.8054C30.1839 15.1219 30.0706 17.5172 29.3892 19.7795C28.7079 22.0418 27.4794 24.1013 25.8125 25.7757C24.2609 23.1763 21.7728 21.2697 18.8594 20.4475C20.2124 19.7262 21.2855 18.5732 21.908 17.1719C22.5304 15.7707 22.6666 14.2015 22.2949 12.7139C21.9231 11.2264 21.0647 9.90579 19.8562 8.96212C18.6476 8.01845 17.1583 7.50587 15.625 7.50587C14.0917 7.50587 12.6024 8.01845 11.3938 8.96212C10.1853 9.90579 9.32691 11.2264 8.95514 12.7139C8.58337 14.2015 8.71955 15.7707 9.34204 17.1719C9.96453 18.5732 11.0376 19.7262 12.3906 20.4475C9.47716 21.2697 6.9891 23.1763 5.4375 25.7757C2.75737 23.081 1.25201 19.4356 1.25 15.635ZM15.625 20.01C14.5125 20.01 13.4249 19.6801 12.4999 19.0621C11.5749 18.444 10.8539 17.5655 10.4282 16.5376C10.0024 15.5098 9.89104 14.3788 10.1081 13.2877C10.3251 12.1965 10.8609 11.1942 11.6475 10.4076C12.4342 9.62089 13.4365 9.08516 14.5276 8.86812C15.6188 8.65108 16.7498 8.76247 17.7776 9.18822C18.8054 9.61396 19.6839 10.3349 20.302 11.26C20.9201 12.185 21.25 13.2725 21.25 14.385C21.25 15.8769 20.6574 17.3076 19.6025 18.3625C18.5476 19.4174 17.1168 20.01 15.625 20.01ZM6.39062 26.635C7.31864 25.0043 8.66194 23.6485 10.2839 22.7053C11.9059 21.7621 13.7487 21.2652 15.625 21.2652C17.5013 21.2652 19.3441 21.7621 20.9661 22.7053C22.5881 23.6485 23.9314 25.0043 24.8594 26.635C22.2753 28.8131 19.0046 30.0077 15.625 30.0077C12.2454 30.0077 8.97467 28.8131 6.39062 26.635Z"
                    fill="#348498" />
            </svg>
            <!-- Сюда аватарку пихать надо -->
            <!-- <img width="40" height="40" src="@/assets/icon/77ddd4b13964c93ab31bc99566e58b14c4880c3a69e7bd87e0bfa4656ac274de_1.jpg" alt="icon"/> -->
        </div>
        <section class="dropdownMenu" v-if="isOpen">
            <RouterLink @click="openClose" v-if="permissions_store.isLogged" to="/account">
                <p>
                    <svg class="me-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 448 512">
                        <path
                            d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                    </svg>
                    Личный кабинет
                </p>
            </RouterLink>
            <p v-if="permissions_store.isLogged" @click.prevent="OnExitSubmit">
                <svg class="me-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512">
                    <path
                        d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                </svg>
                Выход
            </p>
        </section>
    </section>
</template>

<style lang="scss" scoped>
@import '@/assets/globals.scss';

.DropdownWrapper__menu {
    position: relative;

    .dropDownMenuButton {
        cursor: pointer;
        border-radius: 25px;
        transition: all 0.2s ease;
        padding: 0.35rem;

        * {
            color: var(--main-navigation-color);
        }

        label {
            cursor: pointer;
            font-size: 16px;
        }

        img {
            border-radius: 100%;
        }

        &:hover {
            border-radius: 25px;
            background-color: rgb(220, 239, 255);
        }

        &:active {
            background-color: #d1e6ff;
        }

        &:focus {
            background-color: #d1e6ff;
            box-shadow: 0 0 25px 24px #f2f6fd;
        }
    }

    .dropdownMenu {
        margin-top: 0.75rem;
        position: absolute;
        display: flex;
        width: 100%;
        flex-direction: column;
        border-radius: 10px;
        background-color: antiquewhite;
        transition: 0.2s ease;
        padding: 0.75rem;
        box-shadow: 0 0 10px 5px rgba(221, 221, 221, 1);

        p {
            cursor: pointer;
            font-size: 16px;
            color: black;
            padding: 0.5rem;
            margin: 0;

            &:hover {
                background-color: rgb(190, 231, 231);
                border-radius: 5px;
                transition: 0.2s ease;
            }
        }
    }
}
</style>