<template> 
  <header>
    <h1 class="text-uppercase">Добавление занятия в расписание коллектива “{{ shedule.name }}”</h1>
  </header>
  <section class="class-options px-5 mt-sm-5">
      <span class="fw-bold pt-2 my-2">День недели:</span>
      <select class="col form-select" v-model="classForm.dayOfTheWeek">
        <option v-for="(day, i) in WeekDay" :key="day" :value="day">{{ WeekDayRu[i] }}</option>
      </select>
      <span class="fw-bold pt-4">Добавление занятия:</span>
      <div class="switch border-block mt-3">
        <div v-for="(periodOption, i) in PeriodOption" :key="periodOption" @click="setState(periodOption)" class="switch-item" :class="{ active: classForm.period === periodOption }">
          {{ PeriodOptionRU[i] }}
        </div>
      </div>
  </section>
  <section class="class-booking-wrapper">
    <ClassBooking
      v-for="(data) in classBooking"
      :key="data.header"
      :header="data.header"
      :isPrimary="data.isPrimary"
      :date="data.date"
      :location="data.location"
    ></ClassBooking>
  </section>
  <section class="mt-sm-4">
    <div class="filters">
      <GroupElements class="me-3">
        <span option>
          <font-awesome-icon :icon="['fas', 'star']" />
          <span class="star__count ps-sm-2">{{ starCount }}</span>
        </span>
        <span option>
          <font-awesome-icon :icon="['fas', 'fa-cog']" />
        </span>
      </GroupElements>
      <GroupElements class="me-3">
        <span option>
          <font-awesome-icon :icon="['fas', 'fa-calendar']" />
        </span>
        <span option no-divider>
          Свободные
        </span>
      </GroupElements>
      <GroupElements class="me-3">
        <span option>
          Тип
        </span>
        <span option>
          <select class="form-select">
            <option>Все</option>
          </select>
        </span>
      </GroupElements>
      <GroupElements class="me-3">
        <span option>
          Корпус
        </span>
        <span option>
          <select class="form-select">
            <option>Другие</option>
          </select>
        </span>
      </GroupElements>
      <GroupElements class="me-3">
        <span option>
          <font-awesome-icon :icon="['fas', 'fa-users']" />
        </span>
        <span option>
          <select class="form-select">
            <option>Любая</option>
          </select>
        </span>
      </GroupElements>
      <button><font-awesome-icon :icon="['fas', 'fa-refresh']" /> Сброс</button>
    </div>
    <div class="filter-enabled">задействован фильтр</div>
    <div class="class-list-card-wrapper">
      <ClassListCard
        v-for="(el, i) in classLists"
        :key="i"
        :disabled="el.disabled"
        :num="i + 1"
        :time="el.time"
        :list="el.list"
      ></ClassListCard>
    </div>
  </section>
  <footer dev class="mt-sm-4">
    classEntity: {{classForm}}
  </footer>
</template>

<script setup lang="ts">
  import { WeekDay, WeekDayRu } from '@/common/date/week-day.enum';
  import { PeriodOption, PeriodOptionRU } from './period-option.enum';
  import { ref } from 'vue';
  import GroupElements from '@/common/group-elements/GroupElements.vue'
  import ClassBooking from './ClassBooking.vue'
  import ClassListCard from './ClassListCard.vue'

  const starCount = 1;
  const shedule = ref({
    name: 'Калина'
  });
  const classForm = ref({
    dayOfTheWeek: WeekDay.MONDAY,
    period: PeriodOption.ONCE,
  }) 
  const classLists = [
    {
      disabled: false,
      time: '14:00',
      list: [
        {
          starred: true,
          title: 'title',
          points: 100,
        }
      ]
    },
    {
      disabled: false,
      time: '14:00',
      list: [
        {
          starred: true,
          title: 'title',
          points: 100,
        },
        {
          starred: true,
          title: 'title',
          points: 200,
        },
        {
          starred: true,
          title: 'title',
          points: 300,
        },
        {
          starred: true,
          title: 'title',
          points: 100,
        },
        {
          starred: true,
          title: 'title',
          points: 200,
        },
        {
          starred: true,
          title: 'title',
          points: 300,
        },
        {
          starred: true,
          title: 'title',
          points: 100,
        },
        {
          starred: true,
          title: 'title',
          points: 200,
        },
        {
          starred: true,
          title: 'title',
          points: 300,
        },
      ]
    },
    {
      disabled: true,
      time: '14:00',
      list: [
        {
          starred: true,
          title: 'title',
          points: 100,
        }
      ]
    }
  ];
  // TODO: вынести в туллтинг
  const weekInSec = 1000 * 60 * 60 * 24 * 7;
  const nowDateInSec = Date.now();
  const getDate = (v: number | string | Date): Date => new Date(v); 
  const classBooking = [
    {
      header: 'текущая неделя',
      isPrimary: true,
      date: new Date,
      location: 'Зал вокала'
    },
    {
      header: 'следующая неделя',
      isPrimary: false,
      date: getDate(nowDateInSec + weekInSec),
      location: ''
    },
    {
      header: 'последующая неделя',
      isPrimary: false,
      date: getDate(nowDateInSec + weekInSec * 2),
      location: ''
    },
  ];

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
    --options-font-color: #747474;
    display: grid;
    grid-template-columns: 270px minmax(200px, 300px);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: var(--options-font-color)
  }

  .class-booking-wrapper {
    display: flex;
  }

  // TODO: move switch as common component
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

  .filters {
    margin-bottom: 25px;
  }

  .filter-enabled {
    --filter-enabled__color: #AF1E3B;

    border: 1px solid var(--filter-enabled__color);
    color:  var(--filter-enabled__color);
    text-align: center;
    text-transform: uppercase;
    margin-bottom: 25px;
    
    font-style: var(--font-family-title);
    font-weight: 600;
    font-size: 16px;
  }

  .class-list-card-wrapper {
    display: flex;
  }
</style>
