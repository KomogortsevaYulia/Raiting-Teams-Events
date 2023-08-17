<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router'
import { usePermissionsStore } from '@/store/permissions_store';
import { ref } from 'vue';

const permissions_store = usePermissionsStore();
const can = permissions_store.can;


const {
  username
} = storeToRefs(permissions_store);

const isOpen = ref(false);

function openClose() {
    isOpen.value = !isOpen.value;
    // console.log(isOpen.value);
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
        <div class="dropDownMenuButton px-3 text-center d-flex" @click="openClose" tabindex="0">
            <label class="pe-3">{{ permissions_store.fullname }}</label>
          
            <!--  -->
            <font-awesome-icon icon="circle-user" class="fa-2x" />
            <!-- Сюда аватарку пихать надо -->
            <!-- <img width="40" height="40" src="@/assets/icon/77ddd4b13964c93ab31bc99566e58b14c4880c3a69e7bd87e0bfa4656ac274de_1.jpg" alt="icon"/> -->
        </div>
        <section class="dropdownMenu" v-if="isOpen">
            <RouterLink @click="openClose" v-if="permissions_store.isLogged" :to="'/personal/'+ username">
                <p>
                    <font-awesome-icon icon="user" />
                    Личный кабинет
                </p>
            </RouterLink>
            <RouterLink @click="openClose" v-if="permissions_store.isLogged" :to="{ name: 'Requests', query: { user_id: permissions_store.user_id }}">
                <p>
                    <font-awesome-icon icon="envelope" />
                    Мои заявки
                </p>
            </RouterLink>
            <p v-if="permissions_store.isLogged" @click.prevent="OnExitSubmit">
                <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
                Выход
            </p>
        </section>
    </section>
</template>

<style lang="scss" scoped>
@import '@/assets/globals.scss';

.DropdownWrapper__menu {
    z-index: 1;
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
        box-shadow: 0 0 15px 15px rgba(114, 114, 114, 0.239);

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