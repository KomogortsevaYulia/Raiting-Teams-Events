<script lang="ts">
import { RouterLink } from 'vue-router'
import '../assets/navbar.scss'
export default {
    name: "Navbar"
}
</script>

<template>
    <div class="navbar">
        <nav tabindex="0" class="navbar__item">
            <RouterLink class="link" to="/news">Новости</RouterLink>
        </nav>
        <nav tabindex="1" class="navbar__item">
            <RouterLink class="link" to="/teams">Коллективы</RouterLink>
        </nav>
        <nav tabindex="2" class="navbar__item">
            <font-awesome-icon icon="fa-solid fa-user-secret" />
        </nav>
    </div>
</template>