<template>
  <div class="header__wrapper">
    <div class="header" :class="isPrimary ? 'primary' : 'secondary'">
        <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    isPrimary: boolean | undefined;
  }>();
</script>

<style lang="scss" scoped>
  .header {
    --header-primary__text-color: #ffffff;
    --header-primary__bg-color: #43517E;
    --header-primary__border-color: var(--header-primary__bg-color);

    --header-secondary__text-color: #D22043;
    --header-secondary__bg-color: #ffffff;
    --header-secondary__border-color: var(--header-secondary__text-color);

    text-align: center;
    border-top: none;
    border-bottom: none;
    text-transform: uppercase;
    margin: 6px 5px;

    &__wrapper {
      --header__out-border-color: #000000;

      border-right: 1px solid var(--header__out-border-color);

      align-self: center;
    }

    &.primary {
      color: var(--header-primary__text-color);
      background-color: var(--header-primary__bg-color);
      border: 1px solid var(--header-primary__border-color);
    }
    &.secondary {
      color: var(--header-secondary__text-color);
      background-color: var(--header-secondary__bg-color);
      border: 1px solid var(--header-secondary__border-color);
    }
  }
</style>