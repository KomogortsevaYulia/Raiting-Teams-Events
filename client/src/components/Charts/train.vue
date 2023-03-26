<script setup lang="ts" >
import { ref } from 'vue';
import BarChart from '@/components/Charts/Bar.vue';
import PieChart from '@/components/Charts/Pie.vue';

const labelsTeams = ['НИД', 'КТД', 'СД', 'ОД', 'УД']
const dataTeams = [2, 5, 8, 8, 9]

const labelsDatesOfEvents = ['Осень', 'Зима', 'Лето', 'Весна']
const dataDatesOfEvents = [2, 5, 8, 8]

const labelsEventsTwoType = ['Внешние', 'Внутренние']
const dataEventsTwoType = [2, 5]


const show = ref(true);
</script>

<template>
  <!-- Это вся обертка -->
  <div class="wrapper-team">

    <!-- Навигация -->
    <div class="wrapper-team__navigation">
      <a @click="show = true" :class="{ active: show }">Статистика</a>
      <a @click="show = false" :class="{ active: !show }">Отчетность</a>
      <ModalCreateTeam />
    </div>

    <!-- Обертка карточек коллективов -->
    <div v-if="show" class="wrapper-team__content">

      <div class="chart-container">

        <div class="chart">
          <BarChart :labels="labelsTeams" :data="dataTeams" />
        </div>
        <div class="chart">
          <PieChart :labels="labelsDatesOfEvents" :data="dataDatesOfEvents" title="Статистика дат проведения мероприятий"
            label-name="число мероприятий" />
        </div>

      </div>
    </div>

  </div>
</template>

<style lang="scss">
@import '@/assets/teams/teams.scss';

.chart {
  padding-bottom: 15px;
  display: flex;
  justify-content: center;
}

.chart-container {
  // display: flex;
  // flex-direction: column;
  width: 100%;

  // align-items: center;
}
</style>