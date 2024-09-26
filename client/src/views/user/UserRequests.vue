<template>
  <!-- Навигация -->
  <div class="navigation wrapper-second__navigation border-block">
    <template v-for="(item, index) in itemList" :key="index">
      <a
        @click="setSelectItem(index)"
        :class="{ active: index == selectedItem }"
        >{{ item.name }}</a
      >
    </template>
  </div>

  <!-- see request for team -->
  <div v-if="selectedItem === 0">
    <UserTeamRequests />
  </div>

  <!-- see events -->
  <div v-if="selectedItem === 1">
    <WIP />
  </div>
</template>

<script setup lang="ts">
import "@/assets/nav-second.scss";
import { ref } from "vue";
import WIP from "@/components/WIP.vue";
import UserTeamRequests from "@/views/user/UserTeamRequests.vue";

const itemList = [
  { name: "Коллективы (заявки)" },
  { name: "Мероприятия (заявки)" },
];

const selectedItem = ref(0);

const setSelectItem = (i: number) => {
  selectedItem.value = i;
};
</script>

<style lang="scss" scoped>

.navigation {
  padding: 20px;
  margin-bottom: 20px;
  background: white;
}
</style>
