<template>
  <div class="row">
    <div class="col-12 overflow-scroll">
      <table class="table">
        <thead>
          <tr>
            <th></th>
            <th>Понедельник</th>
            <th>Вторник</th>
            <th>Среда</th>
            <th>Четверг</th>
            <th>Пятница</th>
            <th>Суббота</th>
            <th>Воскресенье</th>
          </tr>
          <tr>
            <th>Участники</th>
            <th v-for="(day, index) in weekDays" :key="index">
              {{ formatDate(day) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="participant in participants" :key="participant.name">
            <td>{{ participant.name }}</td>
            <td v-for="(day, index) in weekDays" :key="index">
              <input type="checkbox" v-model="participant[formatDate(day)]" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {computed, ref} from "vue";
import {formatDate, getMonday} from "@/views/teams/schedule/format-date";

interface Participant {
  name: string;

  [key: string]: string | boolean;
}

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


const participants: Participant[] = [
  {
    name: "Иванов",
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  },
  {
    name: "Конышев",
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  },
  {
    name: "Соболевский",
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  },
];
</script>

<style lang="scss" scoped>
h3 {
  color: #959595;
}
</style>
