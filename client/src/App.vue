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
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="scss">
header {
  background-color: #fff;
  box-shadow: 0 6px 4px -4px rgba(0, 0, 0, .2);
}

.container {
  margin-inline: 0;
  margin-top: 5.5rem;
}
</style>