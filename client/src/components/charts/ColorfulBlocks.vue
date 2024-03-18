<template>
  <!--Общие показатели  -->

  <div class="col" v-for="i in props.data.length" v-bind:key="i">
    <div :class="['colored-block-' + i]" class="my-2">
      <div class="row title">{{ props.data[i - 1].name }}</div>
      <div class="row value">{{ props.data[i - 1].value }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: {
    value: number;
    name: string;
  }[];
}>();
</script>

<style lang="scss" scoped>
// colored-block
.colored-block-1,
.colored-block-2,
.colored-block-3,
.colored-block-4 {
  border-radius: 10px;
  padding: 20px 80px;
  min-width: fit-content;
  min-height: 100px;
}

.colored-block-1 {
  background: #ceeab2;
  background: linear-gradient(120deg, #ceeab2 0%, #abecec 100%);
}

.colored-block-2 {
  background: #ffadad;
  background: linear-gradient(120deg, #ffadad 0%, #e7c756 100%);
}

.colored-block-3 {
  background: #a9adff;
  background: linear-gradient(120deg, #a9adff 0%, #5bdfdf 100%);
}

.colored-block-4 {
  background: #e5adff;
  background: linear-gradient(120deg, #e5adff 0%, #718ced 100%);
}
</style>
