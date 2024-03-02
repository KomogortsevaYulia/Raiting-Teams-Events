<template>
  <!-- Modal -->
  <div
    class="modal fade bd-example-modal-lg"
    :id="modalId"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content px-3 py-4">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            <!-- заголовок -->
            <slot name="header"> </slot>
          </h1>
          <div
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></div>
        </div>
        <div class="modal-body">
          <!-- тело -->
          <slot name="body"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modalId: string; //задать id модального окна для егов ызова
}>();
</script>

<style lang="scss" scoped>
.btn-close {
  &:hover {
    background-color: var(--main-color-hover);
    transition: 0.3s;
  }
}
</style>
