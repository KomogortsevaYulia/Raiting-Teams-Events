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
  <header>
    <Navbar />
  </header>
  <div class="container mt-4">
    <RouterView />
  </div>
</template>

<style lang="scss">
.container {
  margin-inline: 0;
}
</style>