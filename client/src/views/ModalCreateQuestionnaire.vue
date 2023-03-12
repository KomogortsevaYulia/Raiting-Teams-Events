<template>
  <div class="modal">
    <div class="modal-content">
      <h2 class="modal-title">Вопросы анкеты</h2>
      <form class="modal-form" @submit.prevent>
        <ul class="modal-list">
          <li v-for="(input, index) in inputs" :key="index" class="modal-item">
            <label :for="'input-' + index" class="modal-label">
              {{ input.value }} <span v-if="input.required" class="modal-required">*</span>
            </label>
            <input :id="'input-' + index" type="text" class="modal-input" required="input.required"/>
          </li>
        </ul>
        <div class="modal-actions">
          <button class="modal-submit" type="submit">Отправить</button>
          <button class="modal-close" @click="$emit('close')">Закрыть</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
    export default {
      name: "ModalCreateQuestionnaire",
      props: {
        inputs: {
          type: Array,
          required: true,
        },
      },
    };
</script>
  
<style lang="scss">
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.25rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
  }
  
  .close-btn {
    background-color: rgb(236, 75, 75);
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-left: 0.5rem;
  }
  
  .input {
    background-color: #fff;
    border: 1px solid hsl(209, 23%, 79%);
    border-radius: 0.25rem;
    line-height: 1.5;
  
    &:focus {
      box-shadow: 0 0 0 0.35rem rgba(215, 255, 71, 0.25);
      outline: 0;
    }
  }
</style>