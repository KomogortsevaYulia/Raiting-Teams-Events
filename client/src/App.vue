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
  <div>
    <RouterView />
  </div>
</template>