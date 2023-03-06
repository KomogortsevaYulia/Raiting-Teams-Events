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
  <!-- Навигация -->

  <div class="row">
    <div class="col">
      <div class="wrapper-second__navigation">
        <a @click="show = true" :class="{ active: show }">Статистика</a>
        <a @click="show = false" :class="{ active: !show }">Отчетность</a>
      </div>
    </div>
  </div>

  <div class="row">
    <div v-if="show" class="col">

      <div class="w-100 justify-content-center d-flex">
        <div class="date">
          <div class="date-num"><a href=""> 1н</a></div>
          <div class="date-num"><a href=""> 6м</a></div>
          <div class="date-num"><a href=""> 1г</a></div>
          <div class="date-num"><a href=""> <font-awesome-icon icon="calendar-days" /></a></div>

        </div>
      </div>

      <div class="block-content">
        <h4>Коллективы</h4>
        <div class="row justify-content-center">
          <div class="col">
            <BarChart class="chart" :labels="labelsTeams" :data="dataTeams"
              title="Статистика заявок на вступление в коллективы" label-name="Кол-во заявок на вступление" />
          </div>
        </div>
      </div>


      <div class="block-content">
        <h4>Мероприятия</h4>
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-auto ">
            <PieChart class="chart" :labels="labelsDatesOfEvents" :data="dataDatesOfEvents"
              title="Статистика дат проведения мероприятий" label-name="число мероприятий" />
          </div>

          <div class="col-lg-6  col-md-auto">
            <PieChart class="chart" :labels="labelsEventsTwoType" :data="dataEventsTwoType"
              title="Количество внутренних/внешних мероприятий" label-name="число мероприятий" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/assets/nav-second.scss';

.chart {
  margin: 15px;
  display: flex;
  width: 100%;
}

.block-content {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 20px;
  padding: 40px;
  margin: 30px auto 30px auto;
  width: 80%;
}

// .wrapper-chart__content {
//   display: flex;
//   flex-direction: column;
//   width: 80%;
//   justify-content: center;
//   align-items: center;
//   margin: auto;
// }


.date {

  border: var(--main-border-card);
  border-radius: 20px;
  padding: 10px 30px;
  width: fit-content;
  display: flex;
  justify-content: center;

  .date-num {
    display: inline;
    padding: 5px 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 50px;
    padding:
      px;
    margin: 5px;

    a {
      text-decoration: none;
    }

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
  }



}

// .row {
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
// }

// .column {
//   flex-basis: calc(50% - 10px);
//   margin-bottom: 20px;
//   border: 1px solid;
//   /* adjust margin and padding as needed */
// }
</style>




