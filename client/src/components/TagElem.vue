<template>
  <div :class="['tag']">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<style scoped lang="scss">
.tag {
  background-color: #f1f4fe;
  padding: 0.2rem 1rem;
  color: #4a72ff;
  border-radius: var(--border-radius);
}
</style>
