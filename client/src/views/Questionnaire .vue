<template>
    <div class="form">
      <div v-for="(input, index) in inputs" :key="index">
        <input type="text" class="input" v-model="input.value" />
        <label class="checkbox-label">
          <input type="checkbox" v-model="input.required" />
          <span class="checkbox-custom"></span>
          <span class="checkbox-text">Обязательный</span>
        </label>
        <button class="remove-btn" @click="removeInput(index)">Удалить</button>
      </div>
      <button class="add-btn" @click="addInput">Добавить вопрос</button>
      <button class="save-btn" v-if="inputs.length" @click="">Сохранить</button>
    </div>
</template>
  
<script lang="ts">
  import { defineComponent, ref } from "vue";
  
  export default defineComponent({
    name: "Form",
    setup() {
      const inputs = ref([{ value: "", required: false }]);
  
      const addInput = () => {
        inputs.value.push({ value: "", required: false });
      };
  
      const removeInput = (index: number) => {
        inputs.value.splice(index, 1);
      };
  
      return {
        inputs,
        addInput,
        removeInput,
      };
    },
  });
</script>
  
<style lang="scss">
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  
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
  
    .checkbox-label {
  display: inline-flex;
  align-items: center;
  margin-left: 1rem;
  font-size: 0.875rem;
  cursor: pointer;

  .checkbox-custom {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 1rem;
    height: 1rem;
    margin-right: 0.5rem;
    border: 1px solid hsl(210, 14%, 83%);
    border-radius: 100%; 

    &::before {
      content: "";
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background-color: #3c3c3c;
      border-radius: 100%;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.5s, visibility 1s;
    }
  }

  input[type="checkbox"] {
    display: none;

    &:checked ~ .checkbox-custom::before {
      opacity: 1;
      visibility: visible;
    }
  }
}
  
    .remove-btn {
    background-color: rgb(236, 75, 75);
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    margin-left: 0.5rem;
  }}</style>