<script setup lang="ts">
    import { RouterLink } from 'vue-router'

    const itemLink = [
        { name: "Новости", path: "/news" }, 
        { name: "Коллективы", path: "/teams" }, 
        { name: "Направления", path: "/directions" }, 
    ]
</script>

<template>
    <div class="navbar">

        <nav class="navbar__item">
            <RouterLink to="/">
                <img class="logo" src="@/assets/icon/logo.svg" alt="logo">
            </RouterLink>
        </nav>

        <!-- Здесь перебираем элементы из массива менюшек -->
        <div class="item-link">
            <nav v-for="item in itemLink" class="navbar__item">
                <RouterLink class="link" active-class="active" :to="item.path">{{item.name}}</RouterLink>
            </nav>

            <!-- Кнопка вход -->
            <nav class="navbar__item login">
                <RouterLink class="navbar__item link login" to="/">Вход</RouterLink>
            </nav>
        </div>
    </div>
</template>

<style>
@import '@/assets/navbar.scss';
</style>