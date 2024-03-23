<template>
  <!-- {{ formAnswers }} -->
  <!-- Modal -->
  <div
    class="modal fade"
    id="viewReqFormModal"
    tabindex="-1"
    aria-labelledby="viewReqFormModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-title" id="exampleModalLabel">Анкета</div>
        <div
          v-for="form_field in formAnswers.form_field"
          class="wrapper-questions"
          v-bind:key="form_field.id"
        >
          <div class="wrapper-one-question">
            <div class="question-label">{{ form_field.title }}</div>
            <textarea
              disabled
              class="input-answer"
              type="text"
              :placeholder="
                form_field.requisition_field
                  ? form_field.requisition_field[0].value
                  : '-'
              "
            />
          </div>
        </div>
        <div class="wrap-button">
          <button type="button" class="btn-custom-primary" data-bs-dismiss="modal">
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useFormStore } from "@/store/form_store";
import type { Ref } from "vue";
import type { IForm } from "@/store/models/forms/form.model";

const formStore = useFormStore();
const formAnswers: Ref<IForm> = ref({});

const props = defineProps<{
  form: IForm;
}>();

watch(
  () => props.form,
  async () => {
      const id = props.form.id
    if (id && id  > 0) await fetchRequisitionAnswers();
  },
);

async function fetchRequisitionAnswers() {
  formAnswers.value = await formStore.fetchRequisitionAnswers(
    props.form?.id ?? -1,
  );
}
</script>

<style lang="scss" scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.8);

  .modal-dialog {
    width: 100%;
    max-width: 900px;

    .modal-content {
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
      padding: 40px 55px 40px 55px;
      box-sizing: border-box;

      .modal-title {
        font-family: var(--font-family-title);
        font-weight: 400;
        font-size: 36px;
        color: #348498;
      }

      .wrapper-questions {
        margin-top: 16px;

        .question-label {
          margin-top: 40px;
          font-weight: 400;
          font-size: 20px;
          line-height: 24px;
        }

        .input-answer {
          margin-top: 6px;
          background-color: #fff;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
          border-radius: 5px;
          width: 100%;
          resize: none;
          font-weight: 400;
          font-size: 16px;
          line-height: 17px;
        }
      }

      .wrap-button {
        align-items: end;
        margin-top: 40px;
        display: flex;
        justify-content: space-between;

      }
    }
  }
}
</style>
