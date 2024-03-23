<template>
    <div class="row">
      <div class="col-auto">
        <font-awesome-icon
          icon="circle"
          :class="['fas fa-beat-fade loading ', sizeFaIcon]"
      /></div>
      <div class="col d-flex align-items-center p-0"> loading...</div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  sizeFaIcon: string;
}>();
</script>

<style scoped lang="scss">
// иконка процесса загрузки
.loading {
  color: var(--second-color);
}
</style>