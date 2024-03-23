<template>
  <span class="class-booking">
    <WeekHeader class="class-booking__header" :isPrimary="isPrimary">
      <span>{{ header }}</span>
    </WeekHeader>
    <TimeLocationCard class="class-booking__time-location-card" :date="date" :location="location" :isPrimary="isPrimary"></TimeLocationCard>
    <div class="class-booking__chip-cards">
      <ChipWrap v-for="(dayOption) in WeekDayShortRu" :key="dayOption">{{ dayOption }}</ChipWrap>
    </div>
  </span>
</template>

<script lang="ts" setup>
  import WeekHeader from './WeekHeader.vue'
  import TimeLocationCard from './TimeLocationCard.vue'
  import ChipWrap from '@/common/chip/ChipWrap.vue'
  import { WeekDayShortRu } from '@/common/date/week-day.enum'

  defineProps<{
    header: string;
    isPrimary: boolean | undefined;
    date: Date;
    location: string;
  }>();
</script>

<style lang="scss" scoped>
  .class-booking {
    min-width: 33%;
    margin-top: 1.25%;
    font-style: var(--font-family-title);
    font-weight: 500;
    font-size: 16px;
    display: grid;
    grid-template-columns: 1.0fr 1fr;
    grid-template-rows: 70px 1fr;
    grid-auto-rows: 1fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
      "header header"
      "time-location-card chip-cards";
  }

  .class-booking__header {
    grid-area: header;
  }

  .class-booking__time-location-card {
    grid-area: time-location-card;
  }

  .class-booking__chip-cards {
    grid-area: chip-cards;
    margin: auto;
    .chip {
      margin-left: 5px;
    }
  }

</style>
