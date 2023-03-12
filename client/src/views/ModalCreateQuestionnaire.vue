<template>
    <div class="modal">
      <div class="modal-content">
        <h2>Вопросы анкеты:</h2>
        <ul>
          <li v-for="(input, index) in inputs" :key="index">
            {{ input.value }} ({{ input.required ? 'Обязательно' : 'Необязательно' }})
            <ul><input type="text" class="input"/></ul>
          </li>
        </ul>
        <button class="close-btn" @click="$emit('close')">Закрыть</button>
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