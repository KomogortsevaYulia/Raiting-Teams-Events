<script setup lang="ts">
  import Navbar from '@/components/Navbar.vue';
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

@import '@/assets/navbar.scss';

  .container {
    padding-top: 2rem;
    margin-inline: 20%;
    display: flex;
    justify-content: center;
  }
  
</style>