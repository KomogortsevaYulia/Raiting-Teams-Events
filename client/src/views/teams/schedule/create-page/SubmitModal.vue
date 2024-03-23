<template>
  <ModalFull :hasClose="false" modal-id="createScheduleSubmitModal">
    <template #header>
      <div class="modal__header">
        <div>Внимание! проверьте правильность</div>
        <div>выбора аудитории</div>
      </div>
    </template>
    <template #body>
      <div class="modal__body">
        <div>
          <ChipWrap class="date">{{ dateInfo.dateFormat }}</ChipWrap>
          в
          <ChipWrap>{{ time }}</ChipWrap>
          занятие у
        </div>
        <div>коллектива “{{ props.union }}”</div>
        <div>будет проходить в аудитории</div>
        <div>
          <ChipWrap>{{ selectedAuditory?.title }}</ChipWrap>
        </div>
      </div>
      <div class="modal__footer">
        <button
          class="button-cancel"
          data-bs-dismiss="modal"
          aria-label="Close"
        >
          Отмена
        </button>
        <button class="button-save" @click="onSave()">Сохранить</button>
      </div>
    </template>
  </ModalFull>
</template>

<script lang="ts" setup>
import ModalFull from "@/components/modals/ModalFull.vue";
import ChipWrap from "@/common/chip/ChipWrap.vue";
import { computed } from "vue";
import { MonthGenitiveCaseRU } from "@/common/date/month.enum";
import type { ClassListCardList } from "@/views/teams/schedule/create-page/ClassListCard.interface";

const props = defineProps<{
  date: Date;
  time: string;
  selectedAuditory: ClassListCardList;
  repeat: boolean;
  union: string;
}>();

const dateInfo = computed(() => {
  const monthName = Object.values(MonthGenitiveCaseRU)[props.date.getMonth()];
  const dayNumber = props.date.getDate();
  const paddingNumber = (number: number) => String(number).padStart(2, "0");
  return {
    dateFormat: `${paddingNumber(dayNumber)} ${monthName}`,
    time: `${paddingNumber(props.date.getHours())}:${paddingNumber(
      props.date.getMinutes(),
    )}`,
  };
});

function onSave() {

}

</script>

<style lang="scss" scoped>
:deep(.modal-dialog) {
  --chip__text-color-custom: #ffffff;
  --chip__bg-color-custom: #d22043;
  --chip__border-radius-custom: 15px;
  --chip__padding-custom: 6px 12px;
}

.modal__header {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20px;
}

.modal__body {
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;

  & > * {
    margin-top: 12px;
  }

  .date {
    text-transform: lowercase;
  }
}

.modal__footer {
  margin-top: 35px;
  text-align: center;

  .button-save {
    margin-left: 40px;
    color: black;
    border: 1px solid #3d3d3d33;
    background-color: #ffffff;
    font-weight: bold;
  }

  .button-cancel {
    color: black;
    background-color: #ffffff;
    font-weight: bold;
  }
}
</style>
