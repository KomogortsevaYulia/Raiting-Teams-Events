<template>
    <div class="navbar">

        <nav class="navbar__item">
            <RouterLink to="/">
                <img class="logo" src="../assets/icon/logo.svg" alt="logo">
            </RouterLink>
        </nav>

        <div class="item-link">
            <nav v-for="item in navLinks" class="navbar__item">
                <RouterLink class="link" active-class="active" :to="item.path">{{item.name}}</RouterLink>
            </nav>
            <nav class="navbar__item login">
                <RouterLink class="navbar__item link login" to="/">Вход</RouterLink>
            </nav>
        </div>
    </div>
</template>

<script lang="ts">

import { RouterLink } from 'vue-router'
import '../assets/navbar.scss'

export default {
  data(){
        return {
            navLinks: [
                {
                    name: "Новости",
                    path: "/news",
                },
                {
                    name: "Коллективы",
                    path: "/teams",
                }
            ]
        }
    }
};
</script>