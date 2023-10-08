<template>
  <div :class="['tag']">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
  // styles:string;
}>();
</script>

<style scoped lang="scss">
.tag {
  background-color: #F1F4FE;
  padding: 0.2rem 1rem;
  color: #4a72ff;
  border-radius: var(--border-radius);
}
</style>
