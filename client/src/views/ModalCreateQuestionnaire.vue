<template>
  <div class="modal">
    <div class="modal-content">
      <h2 class="modal-title">Вопросы анкеты</h2>
      <form class="modal-form" @submit.prevent="onSubmit">
        <ul class="modal-list">
          <li v-for="(input, index) in inputs" :key="index" class="modal-item">
            <label :for="'input-' + index" class="modal-label">
              {{ input.value }}<span v-if="input.required" class="modal-required">*</span>
            </label>
            <div class="modal-input-wrapper">
              <textarea :id="'input-' + index" class="modal-input" :required="input.required" :placeholder="input.placeholder" v-model="formValues[index]"
              ></textarea>
            </div>
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

<script lang="ts">
  export default {
    name: "ModalCreateQuestionnaire",
    props: {
      inputs: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        formValues: [],
      };
    },
    methods: {
      onSubmit() {
        const requiredFields = this.inputs.filter((input) => input.required);
        const hasEmptyFields = requiredFields.some((field, index) => !this.formValues[index]);
      },
    },
  };
</script>

<style>
.modal {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 80%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  box-sizing: border-box;
}

.modal-title {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: center;
}

.modal-form {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.modal-list {
  margin: 0;
  padding: 0;
  list-style: none;
  height: 250px; 
  overflow-y: auto;
}

.modal-item {
  margin-bottom: 1rem;
}

.modal-label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
}

.modal-required {
  color: red;
}

.modal-input {
  display: block;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}

.modal-submit {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 0.5rem;
}

.modal-submit:hover {
  background-color: #0069d9;
}

.modal-close {
  background-color: #ccc;
  color: #333;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.modal-close:hover {
  background-color: #bfbfbf;
}
</style>