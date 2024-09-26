<template>
  <div class="row">
  <div class="col-12">
    <div class="d-flex justify-content-between mb-3">
      <button @click="prevWeek" class="btn btn-primary">Предыдущая неделя</button>
      <h4>{{ getFormattedWeek() }}</h4>
      <button @click="nextWeek" class="btn btn-primary">Следующая неделя</button>
    </div>
  </div>
</div>

<div class="row">
  <div class="col-12">
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
          <th v-for="(day, index) in weekDays" :key="index">{{ formatDate(day) }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="participant in participants" :key="participant.name">
          <td>{{ participant.name }}</td>
          <td v-for="(day, index) in weekDays" :key="index">
            <input type="checkbox" v-model="participant[formatDate(day)]">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Participant {
  name: string;
  [key: string]: string | boolean;
}

export default defineComponent({
  data() {
    const participants: Participant[] = [
      { name: 'Иванов', Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false, Saturday: false, Sunday: false },
      { name: 'Конышев', Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false, Saturday: false, Sunday: false },
      { name: 'Соболевский', Monday: false, Tuesday: false, Wednesday: false, Thursday: false, Friday: false, Saturday: false, Sunday: false },
    ];

    return {
      participants,
      weekStart: this.getMonday(new Date()), // Используем функцию для получения понедельника
    };
  },
  computed: {
    weekDays(): Date[] {
      const days: Date[] = [];
      const startDate = new Date(this.weekStart);
      for (let i = 0; i < 7; i++) {
        const day = new Date(startDate);
        day.setDate(startDate.getDate() + i);
        days.push(day);
      }
      return days;
    },
  },
  methods: {
    getFormattedWeek(): string {
      const startOfWeek = new Date(this.weekDays[0]);
      const endOfWeek = new Date(this.weekDays[6]);
      return `${this.formatDate(startOfWeek)} - ${this.formatDate(endOfWeek)}`;
    },
    formatDate(date: Date): string {
      const day = `0${date.getDate()}`.slice(-2);
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const year = date.getFullYear();
      return `${day}.${month}.${year}`;
    },
    formatDayOfWeek(date: Date): string {
      const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
      return daysOfWeek[date.getDay()]; 
    },
    getMonday(date: Date): Date {
      const day = date.getDay();
      const diff = date.getDate() - day + (day === 0 ? -6 : 1); 
      return new Date(date.setDate(diff));
    },
    prevWeek() {
      this.weekStart = new Date(this.weekStart.getTime() - 7 * 24 * 60 * 60 * 1000);
    },
    nextWeek() {
      this.weekStart = new Date(this.weekStart.getTime() + 7 * 24 * 60 * 60 * 1000);
    },
  },
});
</script>

<style lang="scss" scoped>
h3 {
  color: #959595;
}
</style>
