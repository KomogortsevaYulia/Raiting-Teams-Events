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
      <div class="switch border-block">
        <div v-for="(periodOption, i) in PeriodOption" :key="periodOption" @click="setState(periodOption)" class="switch-item" :class="{ active: classForm.period === periodOption }">
          {{ PeriodOptionRU[i] }}
        </div>
      </div>
  </section>
  <footer>
    {{classForm}}
  </footer>
</template>

<script setup lang="ts">
  import { WeekDay, WeekDayRu } from '@/common/date/week-day.enum';
  import { PeriodOption, PeriodOptionRU } from './period-option.enum';
  import { ref } from 'vue';

  const shedule = ref({
    name: 'Калина'
  })
  const classForm = ref({
    dayOfTheWeek: WeekDay.MONDAY,
    period: PeriodOption.ONCE,
  })

  function setState(v: PeriodOption) {
    classForm.value.period = v;
  }
  
</script>

<style lang="scss" scoped>
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

  .switch {
    --switch__bg-color: #ffffff;
    --switch__active_bg-color: #d9d9d9;

    display: flex;
    align-items: center;
    text-align: center;
    background-color: var(--switch__bg-color);
    border-radius: 24px;

    .switch-item {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 35px;
      width: 100%;
      transition: 0.4s;

      &:first-child {
        border-top-left-radius: 24px;
        border-bottom-left-radius: 24px;
      }

      &:last-child {
        border-top-right-radius: 24px;
        border-bottom-right-radius: 24px;
      }
    }

    .active {
      background-color: var(--switch__active_bg-color);
    }
  }
</style>
