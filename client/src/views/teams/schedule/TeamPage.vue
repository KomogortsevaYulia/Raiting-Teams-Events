<template>
  <!--    buttons-->
  <div class="row">
    <div class="col-12">
      <div class="d-flex justify-content-between mb-3">
        <button @click="prevWeek" class="btn-custom-neutral">
          <FontAwesomeIcon icon="chevron-left" class="me-3" />
          Предыдущая неделя
        </button>
        <h4>{{ dates.formattedDate }}</h4>
        <button @click="nextWeek" class="btn-custom-neutral">
          Следующая неделя
          <FontAwesomeIcon class="ms-3" icon="chevron-right" />
        </button>
      </div>
    </div>
  </div>

  <div class="row my-4">
    <TeamSchedule :dates="dates"  :team-id="teamId"/>
  </div>
  <div class="row">
    <TeamVisits />
  </div>
</template>

<script lang="ts" setup>
import TeamSchedule from "@/views/teams/schedule/TeamSchedule.vue";
import TeamVisits from "@/views/teams/schedule/TeamVisits.vue";
import {
  getFormattedWeek,
  getMonday,
} from "@/views/teams/schedule/format-date";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed, ref } from "vue";

defineProps<{
    teamId:number,
}>();

const weekStart = ref(getMonday(new Date())); // Используем функцию для получения понедельника

const weekDays = computed(() => {
  const days: Date[] = [];
  const startDate = new Date(weekStart.value);
  for (let i = 0; i < 7; i++) {
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    days.push(day);
  }
  return days;
});

const dates = computed(() => {
  return getFormattedWeek(
    weekDays.value[0],
    weekDays.value[weekDays.value.length - 1],
  );
});

function prevWeek() {
  weekStart.value = new Date(
    weekStart.value.getTime() - 7 * 24 * 60 * 60 * 1000,
  );
}

function nextWeek() {
  weekStart.value = new Date(
    weekStart.value.getTime() + 7 * 24 * 60 * 60 * 1000,
  );
}
</script>

<style lang="scss" scoped>
h3 {
  color: #959595;
}
</style>
