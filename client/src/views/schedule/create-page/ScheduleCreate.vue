<template>
  <header>
    <h1>Добавление занятия в расписание коллектива “{{ shedule.name }}”</h1>
  </header>
  <section class="class-options">
      <span>День недели:</span>
      <select class="col form-select" v-model="classForm.dayOfTheWeek">
        <option v-for="(day, i) in WeekDay" :key="day" :value="day">{{ WeekDayRu[i] }}</option>
      </select>
      <span>Добавление занятия:</span>
      <SwitchToggle ></SwitchToggle>
  </section>
  <footer>
    {{classForm}}
  </footer>
</template>

<script setup lang="ts">
  import { WeekDay, WeekDayRu } from '@/common/date/week-day.enum';
  import SwitchToggle from "@/components/SwitchToggle.vue";

  const shedule = {
    name: 'Калина'
  }
  const classForm = {
    dayOfTheWeek: WeekDay.MONDAY
  }
</script>

<style lang="scss" scoped>
  :host {}
  h1 {
    font-style: var(--font-family-title);
    font-weight: 600;
    font-size: 24px;
    text-align: center;
  }
  .class-options {
    display: grid;
    grid-template-columns: 270px minmax(200px, 300px);
  }
</style>
