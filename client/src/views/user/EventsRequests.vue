<template>
  <!-- Навигация -->
  <div class="navigation wrapper-second__navigation border-block">
    <template v-for="(item, index) in itemList" :key="index">
      <a
        @click="selectItem(index)"
        :class="{ active: index == selectedItem }"
        >{{ item.name }}</a
      >
    </template>
  </div>

  <!-- see events -->
  <div v-if="selectedItem === 0"></div>

  <!-- see request for creation event -->
  <div v-if="selectedItem === 1"></div>
</template>

<script setup lang="ts">
import "@/assets/nav-second.scss";
import { ref, onBeforeMount } from "vue";
// import { useRoute } from "vue-router";

// const route = useRoute();
// const idUser = Number(route.query.user_id);

const itemList = [
  { name: "Мероприятия (заявки)" },
  { name: "Коллективы (заявки)" },
];

const selectedItem = ref(0);

onBeforeMount(async () => {});

const selectItem = (i: number) => {
  selectedItem.value = i;
};
</script>

<style lang="scss" scoped>
.navigation {
  padding: 20px;
  background: white;
}
</style>
