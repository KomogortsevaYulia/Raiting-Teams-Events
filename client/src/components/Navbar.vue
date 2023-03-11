<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue';
import User_Profile from '@/components/User_profile.vue';
import { usePermissionsStore } from '@/store/permissions_store';
const permissions_store = usePermissionsStore();
const can = permissions_store.can;

const accountStatus = ref(permissions_store.isLogged);

function OnExitSubmit() {
    permissions_store.logout()
}


const itemLink = [
    { name: "Мероприятия", path: "/news" },
    { name: "Коллективы", path: "/teams" },
    { name: "Статистика", path: "/statistic" }
]
</script>

<template>
    <div class="navbar-wrapper container d-flex">
        <!-- Иконка политеха -->
        <nav class="navbar__item-logo">
            <RouterLink to="/">
                <img src="@/assets/icon/logo.svg" alt="logo">
            </RouterLink>
        </nav>

        <!-- Здесь перебираем элементы из массива менюшек -->
        <div class="navbar__item-link">
            <nav v-for="item in itemLink" class="link-item">
                <RouterLink class="link" active-class="active" :to="item.path">
                    <p>{{ item.name }}</p>
                </RouterLink>
            </nav>


            <nav v-if="can('can view directions')" class="link-item">
                <RouterLink class="link" active-class="active" :to="'/directions'">
                    <p>Направления</p>
                </RouterLink>
            </nav>


            <!-- Руководитель за ИРНИТУ -->
            <nav v-if="can('can view reports directions')" class="link-item">
                <RouterLink class="link" active-class="active" :to="'/reports-university'">
                    <p>Отчеты ИРНИТУ</p>
                </RouterLink>
            </nav>

            <!-- Руководитель за НАПРАВЛЕНИЯ -->
            <nav v-if="can('can view reports teams')" class="link-item">
                <RouterLink class="link" active-class="active" :to="'/reports-directions'">
                    <p>Отчеты НАПРАВЛЕНИЯ</p>
                </RouterLink>
            </nav>
        </div>

        <!-- Кнопка вход + Личный кабинет-->
        <div class="navbar__item-login">
            <!-- {{ permissions_store.username }} -->
            <User_Profile v-if="permissions_store.isLogged" />
            <RouterLink v-if="!permissions_store.isLogged" to="/login">
                <p>Войти</p>
            </RouterLink>
            <!-- <RouterLink v-if="permissions_store.isLogged" to="/account">Личный кабинет</RouterLink> -->
            <!-- <button v-if="permissions_store.isLogged" @click.prevent="OnExitSubmit">Выход</button> -->
        </div>

    </div>
</template>

<style lang="scss" scoped>
// @import '@/assets/globals.scss';

// Блок
.navbar-wrapper {
    display: flex;
    position: relative;
    align-items: center;

    // Элемент иконки
    .navbar__item-logo {
        img {
            height: 64px;
            width: 64px;
        }
    }

    // Элементы навигации
    .navbar__item-link {
        margin: 0 auto 0 auto;
        display: flex;

        .link-item {
            cursor: pointer;
            height: max-content;
            padding: 1rem;

            p {
                color: #348498;
                transition: 0.3s;
                font-size: 14px;
                font-weight: 600;
                margin: 0;
                font-family: 'Montserrat', sans-serif;

                &:hover {
                    color: var(--main-color);
                }
            }
        }

        .active p {
            color: var(--main-color);
            padding-bottom: 5px;
            border-bottom: var(--main-border-bottom);
        }
    }

    // Элемент кнопки "Вход"
    .navbar__item-login {
        p {
            text-decoration: none;
        }
    }
}</style>