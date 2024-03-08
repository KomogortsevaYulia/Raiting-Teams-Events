<template>
  <div class="col-auto position-relative align-items-center d-flex">
    <div class="img">
      <img class="w-100 h-100" :src="src" alt="" />
    </div>
    <div class="position-absolute top-0 end-0 p-2">
      <font-awesome-icon
        @click="onDelete(index)"
        :icon="['fas', 'circle-xmark']"
        class="fa-2x btn-icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  src: string;
  index: number;
  handleOnDelete: (index: number) => void;
}>();

function onDelete(index: number) {
  props.handleOnDelete(index);
}
</script>

<style scoped lang="scss">
.img {
  background-color: lightgray;
  overflow: hidden;
  border-radius: var(--border-radius);
}
</style>
