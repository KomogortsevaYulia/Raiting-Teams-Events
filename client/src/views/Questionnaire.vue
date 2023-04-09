<template>
  <div class="form">
    <div class="wrapper-question" v-for="(input, index) in inputs" :key="index">
        <div class="question-label">
          <div class="num-question">Вопрос {{ index+1 }}</div>
          <div class="checkbox-label">
            <input type="checkbox" v-model="input.required" />
            <span class="checkbox-custom"></span>
            <span class="checkbox-text">Обязательный</span>
        </div>
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
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        text-decoration-line: line-through;

        color: #373737;
      }

        .checkbox-custom {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1rem;
          height: 1rem;
          margin-right: 0.5rem;
          background: #CDEEF0;
          border-radius: 5px;

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
          box-shadow: 0 0 0 0.35rem rgba(215, 255, 71, 0.25);
          outline: 0;
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
  }
}</style>