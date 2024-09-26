<template>
  <div class="block-content border-block">
    <div class="row mb-4">
      <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 border-1 border-end">
        <div class="wrapper-navigation">
          <div class="row">
            <template v-for="(item, index) in itemList" :key="index">
              <div
                class="col-xl-12 col-lg-auto col-sm-auto col-md-auto mb-3 nav-item"
              >
                <a
                  @click="setSelectItem(index)"
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
      </div>
      <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12">
        <div v-if="selectedItem === 0">
          <AdminTeams />
        </div>

        <div v-if="selectedItem === 1">
          <AdminPermissions />
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

const setSelectItem = (i: number) => {
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

    .active {
      color: var(--main-color);
    }
  }
}
</style>
