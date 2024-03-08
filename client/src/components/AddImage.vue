<template>
  <div class="col-auto position-relative align-items-center d-flex">
    <div class="img">
      <img class="w-100 h-100" :src="src" alt="" />
    </div>
<!--       delete btn -->
    <div class="position-absolute z-2 p-2 btn-icon shadow"  @click="onDelete(index)">
      <font-awesome-icon
        :icon="['fas', 'trash']"
        class="fa-1x "
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
.btn-icon{
  color: indianred;
  top:-10px;
  right: -10px;
}
.img {
  background-color: lightgray;
  overflow: hidden;
  border-radius: var(--border-radius);
}
</style>
