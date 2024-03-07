<template>
  <span class="group-elements">
    <slot></slot>
  </span>
</template>

<style lang="scss" scoped>
  .group-elements {
    --group-elements__height: 35px;
    --group-elements__border-radius: 5px;
    --group-elements__bg: #ffffff;

    display: inline-flex;
    border: var(--border-block);
    background-color: var(--group-elements__bg-custom, var(--group-elements__bg));
    line-height: var(--group-elements__height);
    border-radius: var(--group-elements__border-radius);

    :slotted(*[option]) {
      padding: 0 10px;

      &:last-child {
        border-left: var(--border-block);
      }
      &[no-divider] {
        border-left: none;
        padding-left: 0;
      }
      select { 
        border-radius: var(--group-elements__border-radius);
        border: 0;
      }
      &:has(select) {
        padding: 0;
      }
    }
  }

</style>