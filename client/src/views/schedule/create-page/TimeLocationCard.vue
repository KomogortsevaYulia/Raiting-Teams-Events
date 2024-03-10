<template>
  <span class="time-location-card" :class="isPrimary ? 'primary' : 'secondary'">
    <div class="date">
      <div class="day">{{ dateInfo.dayNumber }}</div>  
      <div class="month">{{ dateInfo.monthName }}</div>  
      <div class="week-day">{{ dateInfo.weekDay }}</div>  
    </div>
    <div class="time-location-card__right">
      <div class="time" v-if="isPrimary">{{ dateInfo.time }}</div>
      <div class="time" v-if="!isPrimary">Аудитория НЕ<br>забронирована</div>
      <div class="location" v-if="isPrimary">{{ location }}</div>
      <select v-if="!isPrimary">
        <option>Завершить</option>
        <option>Бронировать </option>
      </select>  
    </div>
  </span>
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue';
  import { MonthRU } from '@/common/date/month.enum';
  import { WeekDayRu } from '@/common/date/week-day.enum';

  const props = defineProps<{
    date: Date;
    location: string;
    isPrimary: boolean | undefined;
  }>();

  onMounted(() => {
    console.log(props.date)
  })

  function transformUsWeekDayToRu(weekDay: number) {
    let weekDayRu = weekDay;
    if (weekDay === 0) weekDayRu = 6;
    if (weekDay === 6) weekDayRu = 0;
    return weekDayRu;
  }

  const dateInfo = computed(() => {
    return {
      dayNumber: props.date.getDate(),
      monthName: Object.values(MonthRU)[props.date.getMonth()],
      weekDay: Object.values(WeekDayRu)[transformUsWeekDayToRu(props.date.getDay())],
      time: `${props.date.getHours()}:${props.date.getMinutes()}`,

    }
  });
</script>

<style lang="scss" scoped>
  .time-location-card {
    --time-location-card-primary__bg-color: #43517E;
    --time-location-card-secondary__bg-color: #D22043;
    --time-location-card-secondary__text-color1: #ffffff;
    --time-location-card-secondary__text-color2: var(--time-location-card-secondary__bg-color);
    --time-location-card__border-radius: 5px;

    color: var(--time-location-card-secondary__text-color1);
    border-radius: var(--time-location-card__border-radius);

    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-auto-rows: 1fr;
    grid-auto-flow: row;
    grid-template-areas:
      "date right";

    &.primary {
      background-color: var(--time-location-card-primary__bg-color);
    }

    &.secondary {
      background-color: var(--time-location-card-secondary__bg-color);

      & .time, & .location {
        background-color: white;
        color: var(--time-location-card-secondary__text-color2);
      }
    }
  }

  .time-location-card__right {
    grid-area: right;

    border: 1px solid #3D3D3D;
    border-top-right-radius: var(--time-location-card__border-radius);
    border-bottom-right-radius: var(--time-location-card__border-radius);
  }

  .time {
    grid-area: time;
    text-align: center;
  }
</style>