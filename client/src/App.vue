<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { onBeforeMount } from 'vue';
import { usePermissionsStore } from './store/permissions_store';
const permissionStore = usePermissionsStore();

onBeforeMount(() => {
  permissionStore.checkLogin();
})

</script>

<template>
  <header class="mw-100">
    <Navbar />
  </header>
  <div class="container mt-4">
    <RouterView />
  </div>
</template>

<style lang="scss">
header {
  background-color: #fff;
  box-shadow: 0 6px 4px -4px rgba(0, 0, 0, .2);
}

<<<<<<< HEAD
@import '@/assets/navbar.scss';

  .container {
    padding-top: 2rem;
    margin-inline: 20%;
    display: flex;
    justify-content: center;
  }
  
=======
.container {
  margin-inline: 0;
}
>>>>>>> 6cfe73a1f51b0506833f51233370ecc139e39def
</style>