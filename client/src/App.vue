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
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  padding-top: 2rem;
  margin-inline: 10%;
}
</style>