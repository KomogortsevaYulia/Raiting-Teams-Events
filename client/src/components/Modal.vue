<script lang="ts">
  export default {
    name: 'Modal',
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<!-- this is template for modal window -->
<template>
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            This is the default title!
          </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
          >
            x
          </button>
        </header>
  
        <section class="modal-body">
          <slot name="body">
            This is the default body!
          </slot>
         </section>
  
      </div>
    </div>
  </template>


<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    z-index: 2;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    border-radius: 20px;
    padding: 30px 20px;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    display: flex;
  }

  .modal-header {
    position: relative;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
   
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: var(--main-color);
    background: transparent;
  }

  .btn-style {
    background: var(--main-color);
    border-radius: 20px;
  }

  .btn-style:hover {
    background: var(--main-color-hover);
  }
</style>