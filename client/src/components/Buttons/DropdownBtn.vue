<template>
  <div class="position-relative">
    <div
      class="btn-dropdown btn-custom-neutral w-auto"
      @click="isOpen = !isOpen"
      ref="dropdown"
    >
      <div class="row g-4 align-items-center">
        <div class="col-auto">
          <slot name="img"></slot>
        </div>
        <div class="col-auto">
          <slot name="title"></slot>
        </div>
        <div class="col">
          <FontAwesomeIcon :icon="isOpen ? 'chevron-up' : 'chevron-down'" />
        </div>
      </div>
    </div>
    <!--      dropdown body-->
    <div class="position-absolute z-3 py-2 w-100" v-if="isOpen" ref="dropdownBody">
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const isOpen = ref(false);
</script>

<style lang="scss" scoped>
.btn-custom-neutral {
  padding: 1px 5px;
}

.btn-dropdown {
  padding: var(--padding-form);
  border: var(--main-border-card);
  border-radius: var(--border-radius);
}
</style>
