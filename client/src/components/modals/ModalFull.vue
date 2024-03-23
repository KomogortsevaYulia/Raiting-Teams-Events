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
        <div class="modal-header" :class="{ center: !hasClose }">
          <h1 class="modal-title" id="exampleModalLabel">
            <!-- заголовок -->
            <slot name="header"> </slot>
          </h1>
          <div
            v-if="hasClose"
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
  const props = defineProps({
    modalId: { type: String, required: false },
    hasClose: { type: Boolean, required: false },
  });

  const hasClose = props.hasClose ?? true;
</script>

<style lang="scss" scoped>
  .modal-header.center {
    width: 100%;
    justify-content: center;
  }
  .btn-close {
    &:hover {
      background-color: var(--main-color-hover);
      transition: 0.3s;
    }
  }
</style>
