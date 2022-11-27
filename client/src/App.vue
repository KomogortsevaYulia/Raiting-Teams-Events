<template>
  <header>
    <Navbar />
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<script lang="ts">
import Navbar from './components/Navbar.vue';
import './assets/navbar.scss';
export default {
  name: "App",
  components: {
    Navbar
  }
}
</script>

<style lang="scss">
  .container {
    padding-top: 2rem;
    margin-inline: 10%;
    display: flex;
    justify-content: center;
  }
</style>