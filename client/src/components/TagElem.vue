<template>
  <div :class="['tag']">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    text: string;
    textColor?: string,
    backgroundColor?: string
}>(), {textColor: "#4a72ff", backgroundColor: "#F1F4FE"})


</script>

<style scoped lang="scss">
.tag {
  background-color: v-bind(backgroundColor);
  padding: 0.2rem 1rem;
  color: v-bind(textColor);
  border-radius: var(--border-radius);
}
</style>
