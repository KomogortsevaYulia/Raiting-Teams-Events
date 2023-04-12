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
    // { name: "Анкета(Создание)", path: "/questionnaire" },
    { name: "Мероприятия", path: "/news" },
    { name: "Коллективы", path: "/teams" },
    // { name: "Статистика", path: "/statistic" },
]
</script>

<template>
    <div class="navbar-wrapper container">
        <!-- Иконка политеха -->
        <nav class="navbar__item-logo">
            <RouterLink to="/">
                <img src="@/assets/icon/logo.svg" alt="logo" class="logo">
            </RouterLink>
        </nav>

        <!-- Здесь перебираем элементы из массива менюшек -->
        <div class="navbar__item-link">
            <nav v-for="item in itemLink" class="link-item">
                <RouterLink class="link" active-class="active" :to="item.path">
                    <p>{{ item.name }}</p>
                </RouterLink>
            </nav>

            <!-- <nav v-if="can('can view directions')" class="link-item"> -->
                <RouterLink class="link" active-class="active" :to="'/statistic'">
                    <p>Статистика</p>
                </RouterLink>
            <!-- </nav> -->

            <nav v-if="can('can view directions')" class="link-item">
                <RouterLink class="link" active-class="active" :to="'/directions'">
                    <p>Направления</p>
                </RouterLink>
            </nav>
        </div>

        <!-- Кнопка вход + Личный кабинет-->
        <div class="navbar__item-login">
            <User_Profile v-if="permissions_store.isLogged" />
            <RouterLink v-if="!permissions_store.isLogged" to="/login">
                <button class="login-button">Войти</button>
            </RouterLink>
        </div>

    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/globals.scss';
// Блок
.navbar-wrapper {
    display: flex;
    position: relative;
    align-items: center;
    // Элемент иконки
    .navbar__item-logo {
        img {
            height: 40px;
            width: 40px;
        }
    }
    // Элементы навигации
    .navbar__item-link {
        margin: 0 auto 0 auto;
        display: flex;
        .link-item {
            padding: 1rem;
            p {
                cursor: pointer;
                height: 2rem;
                color: #348498;
                transition: 0.3s ease;
                font-size: 14px;
                font-weight: 600;
                margin: 0;
                font-family: 'Montserrat', sans-serif;
                &:hover {
                    color: var(--main-color);
                }
            }
        }
        .active {
            p {
                color: var(--main-color);
                border-bottom: var(--main-border-bottom);
            }
        }
    }
    // Элемент кнопки "Вход"
    .navbar__item-login {
        .login-button {
            padding: 0.5rem 2rem 0.5rem 2rem;
            border-radius: 10px;
            background-color: var(--main-color);
            color: #fff;
            &:hover {
                background: var(--main-color-hover);
                transition: 0.3s;
            }
            &:focus {
                outline: none;
                box-shadow: 0 0 0 2px #ff746f;
            }
            &:active {
                transition: 0.3s;
                background-color: #fd524c;
            }
        }
    }
}
</style>