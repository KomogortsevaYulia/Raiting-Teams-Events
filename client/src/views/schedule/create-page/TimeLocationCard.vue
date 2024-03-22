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
      <select>
        <option>Завершить</option>
        <option>Бронировать </option>
      </select>  
    </div>
  </span>
</template>

<script lang="ts" setup>
  import { computed, onMounted } from 'vue';
  import { MonthShortRU } from '@/common/date/month.enum';
  import { WeekDayShortRu } from '@/common/date/week-day.enum';

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
      monthName: Object.values(MonthShortRU)[props.date.getMonth()],
      weekDay: Object.values(WeekDayShortRu)[transformUsWeekDayToRu(props.date.getDay())],
      time: `${props.date.getHours()}:${props.date.getMinutes()}`,
    }
  });
</script>

<style lang="scss" scoped>
  .time-location-card {
    margin-left: 6px;
    text-align: center;
    --time-location-card-primary__bg-color: #43517E;
    --time-location-card-secondary__bg-color: #D22043;
    --time-location-card-secondary__text-color1: #ffffff;
    --time-location-card-secondary__text-color2: var(--time-location-card-secondary__bg-color);
    --time-location-card__border-radius: 5px;

    color: var(--time-location-card-secondary__text-color1);
    border-radius: var(--time-location-card__border-radius);
    background-color: var(--time-location-card-primary__bg-color);
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr;
    grid-auto-rows: 1fr;
    grid-auto-flow: row;
    grid-template-areas:
      "date right";

    &.primary {
      .date {
        background-color: var(--time-location-card-primary__bg-color);
      }
      border: 1px solid #3D3D3D33;
    }

    &.secondary {
      .date {
        background-color: #D22043;
      }
      background-color: white;
      border: 1px solid #3D3D3D33;

      & .time, & .location {
        background-color: white;
        color: var(--time-location-card-secondary__text-color2);
      }
    }
  }

  .time-location-card__right {
    padding: 0 1rem;
    grid-area: right;
    margin:auto;
    border-top-right-radius: var(--time-location-card__border-radius);
    border-bottom-right-radius: var(--time-location-card__border-radius);
  }

  .date {
    border-radius: 5px 0px 0px 5px;
    padding: 29px 20px;
    background-color: var(--time-location-card-primary__bg-color);
    & > * {
      line-height: normal;
    }

    .week-day {
      border-top: 1px solid #ffffff;
      margin-top: 5px;
      padding-top: 5px;
    }
  }
  .time {
    padding: 5px;
    grid-area: time;
    text-align: center;
  }
</style>