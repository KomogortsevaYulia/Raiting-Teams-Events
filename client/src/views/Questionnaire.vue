<template>
  <div class="form">
    <div class="wrapper-question" v-for="(input, index) in inputs" :key="index">
        <div class="question-label">
          <div class="num-question">Вопрос {{ index+1 }}</div>
          <label class="checkbox-label">
            <input type="checkbox" v-model="input.required" />
            <div class="checkbox-custom"></div>
            <span class="checkbox-text">Обязательный</span>
        </label>
        </div>
        <div class="wrap-input">
          <textarea class="input-question" v-model="input.value" />
          <button class="remove-btn" @click="removeInput(index)">Удалить</button>
        </div>
    </div>
    <button class="add-btn" @click="addInput">Добавить вопрос</button>
    <button class="save-btn" v-if="inputs.length" @click="openModal">Сохранить</button>
    <modal-create-questionnaire
      v-if="modalOpen"
      :inputs="inputs"
      @close="closeModal"
    ></modal-create-questionnaire>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import ModalCreateQuestionnaire from "./ModalCreateQuestionnaire.vue";
    
      const inputs = ref([{ value: "", required: false }]);
      const modalOpen = ref(false);

      const addInput = () => {
        inputs.value.push({ value: "", required: false });
      };

      const removeInput = (index: number) => {
        inputs.value.splice(index, 1);
      };

      const openModal = () => {
        modalOpen.value = true;
      };

      const closeModal = () => {
        modalOpen.value = false;
      };
</script>

<style lang="scss">

.form {
  display: block;
  padding: 50px;
  .wrapper-question{
    min-height: 110px;
    margin-bottom: 30px;

    .question-label{
      display: flex;
      margin-bottom: 5px;

      .num-question{
        font-family: 'Montserrat';
        font-weight: 700;
        font-size: 20px;

        color: rgba(0, 0, 0, 0.80);
      }

      .checkbox-label {
        display: flex;
        align-items: center;
        margin-left: 1rem;
        font-size: 0.875rem;
        cursor: pointer;

      .checkbox-text{
        font-family: 'Montserrat';
        font-weight: 400;
        font-size: 14px;
        text-decoration-line: line-through;
        margin-left: 5px;
        transition: color 0.2s;

        color: #A2A2A2;

        &::before {
          color:#FF502F;
        }
      }

        .checkbox-custom {
          display: inline-block;
          position: relative;
          width: 1rem;
          height: 1rem;
          border-radius: 0.3rem;
          background-color: #CDEEF0;
          
          &:hover{
            cursor: pointer;
            background-color: #b9e6e9;
          }

          &::before {
            content: "";
            position: relative; 
            display: block;
            width: 1rem;
            height: 1rem;
            background-color: #5BD1D7;
            background-image: url(@/assets/icon/checked.svg);
            background-position: center;
            border-radius: 0.3rem;
            position: absolute;
            opacity: 0;
            transition: .2s;
          }
        }

        input[type="checkbox"] {
          display: none;

          &:checked ~ .checkbox-custom::before {
            opacity: 1;
            visibility: visible;
          }
          &:checked ~ .checkbox-text {
            color: #373737;
            text-decoration-line: none;
          }
        }
      }
    }
    .wrap-input{
      display: flex;
      align-items: end;
    
      .input-question {
        background-color: #fff;
        border: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        width: 100%;
        resize: none;
        font-family: 'Montserrat';
        font-weight: 900;
        font-size: 14px;
        line-height: 17px;

        color: rgba(0, 0, 0, 0.8);

        &:focus {
          text-decoration-line: none;
          color: #373737;
        }
      }
      .remove-btn {
        background: #FF502F;
        border-radius: 10px;
        color: white;
        border: none;
        cursor: pointer;
        max-width: 180px;
        max-height: 55px;
        margin-left: 30px;
      }
    }
  }
  .add-btn{
    display: block;
    margin: 0px auto;
    padding: 0;
    font-family: 'Montserrat';
    width: 230px;
    height: 60px;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    margin-bottom: 50px;

    color: #FFFFFF;
    background: rgba(52, 132, 152, 0.8);
    border-radius: 10px;
    &:focus {
        outline: none;
        box-shadow: 0 0 0 0;
    }
  }
  .save-btn{
    display: block;
    margin: 0px auto;
    font-family: 'Montserrat';
    font-weight: 400;
    font-size: 20px;
    width: 290px;
    height: 80px;

    color: #FFFFFF;
    background: #348498;
    border-radius: 10px;
    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #348498;
    }
  }
}</style>