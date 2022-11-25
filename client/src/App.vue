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

<template>
  <header>
    <Navbar />
  </header>
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="scss">
  .container {
    padding-top: 2rem;
    display: flex;
    justify-content: center;
  }
</style>