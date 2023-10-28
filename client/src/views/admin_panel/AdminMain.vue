<template>
  <div class="block-content border-block">
    <div class="row ">
      <div class="col-xl-3 col-md-4 col-sm-4 border-1 border-end">
        <div class="wrapper-navigation">
          <template v-for="(item, index) in itemList" :key="index">
            <div class="row mb-3 nav-item">
              <a
                @click="selectItem(index)"
                :class="{ active: index == selectedItem }"
              >
                <span>
                  <font-awesome-icon :icon="['fas', item.icon]" />
                </span>
                {{ item.name }}</a
              >
            </div>
          </template>
        </div>
      </div>
      <div class=" col-xl-9 col-md-8 col-sm-8">
          <div v-if="selectedItem === 0">
              <AdminTeams  />
          </div>

          <div v-if="selectedItem === 1">
              <AdminPermissions  />
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AdminTeams from "@/views/admin_panel/AdminTeams.vue";
import AdminPermissions from "@/views/admin_panel/AdminPermissions.vue";

const selectedItem = ref(0);

const itemList = [
  { name: "Коллективы/Направления", icon: "user-shield" },
  { name: "Разрешения", icon: "lock-open" },
];

const selectItem = (i: number) => {
  selectedItem.value = i;
};
</script>

<style scoped lang="scss">
.block-content {
  padding: 30px;
  margin: 30px auto 30px auto;
  background: white;

  .wrapper-navigation {
    .nav-item {
      cursor: pointer;
    }
  }
}
</style>
