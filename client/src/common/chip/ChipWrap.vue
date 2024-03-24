<template>
  <span class="chip">
    <slot></slot>    
  </span>
</template>

<style lang="scss" scoped>
  .chip {
    --chip__bg-color: #EBE8E8;
    --chip__text-color: #747474;
    --chip__border-radius: 5px;
    
    color: var(--chip__text-color-custom, var(--chip__text-color));
    background-color: var(--chip__bg-color-custom, var(--chip__bg-color));
    border-radius: var(--chip__border-radius-custom, var(--chip__border-radius));
    padding: var(--chip__padding-custom, 6px);

    font-style: var(--font-family-title);
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
  }
</style>

