<script setup lang="ts">
    import { RouterLink } from 'vue-router'
    import { ref } from 'vue';

    const accountStatus = ref(true);

    
    // Элементы навигации
    const itemLink = [
        { name: "Мероприятия", path: "/news" }, 
        { name: "Коллективы", path: "/teams" }, 
        { name: "Направления", path: "/directions" }, 
    ]

</script>

<template>
    <div class="navbar">
        <!-- Иконка политеха -->
        <nav class="navbar__item-logo">
            <RouterLink to="/">
                <img src="@/assets/icon/logo.svg" alt="logo">
            </RouterLink>
        </nav>

        <!-- Здесь перебираем элементы из массива менюшек -->
        <div class="navbar__item-link">
            <nav v-for="item in itemLink" class="link-item">
                <RouterLink class="link" active-class="active" :to="item.path">{{item.name}}</RouterLink>
            </nav>
        </div>

        <!-- Кнопка вход + Личный кабинет-->
        <nav class="navbar__item-login">
            <RouterLink v-if="accountStatus" to="/">Войти</RouterLink>
            <RouterLink v-if="accountStatus" to="/account">Личный кабинет</RouterLink>
        </nav>

    </div>
</template>

<style lang="scss">
@import '@/assets/globals.scss';

// Блок
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-inline: 10%;

    // Элемент иконки
    .navbar__item-logo img {
        height: 64px;
        width: 64px;
    }

    // Элементы навигации
    .navbar__item-link {
        display: flex;

        .link-item {
            cursor: pointer;
            height: max-content;
            padding: 1rem;

            a {
                color: #348498;
                transition: 0.3s;
                font-size: 15px;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

                &:hover {
                    color: var(--main-color);
                }
            }

            .active {
                color: var(--main-color);
                padding-bottom: 5px;
                border-bottom: var(--main-border-bottom);
            }
        }
    }

    // Элемент кнопки "Вход"
    .navbar__item-login a {
        text-decoration: none;

        &:hover {
            color: var(--main-color);
        }
    }
}
</style>