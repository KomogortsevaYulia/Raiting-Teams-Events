<script setup lang="ts" >
import { ref } from 'vue';
import BarChart from '@/components/Charts/Bar.vue';
import PieChart from '@/components/Charts/Pie.vue';
import { DatePicker } from 'v-calendar';

const date = ref(1)

function changeDate(start: Date = new Date(), end: Date = new Date()) {
}

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

  <!-- time -->
  <div class="row">
    <div class="w-100 justify-content-center d-flex">
      <div class="date">
        <button class="button-custom" @click="changeDate()">1н</button>
        <button class="button-custom" @click="changeDate()"> 6м</button>
        <button class="button-custom" @click="changeDate()">1г</button>
        <div class="my-dropdown" style="float:center;">
          <button class="dropbtn button-custom"><font-awesome-icon icon="calendar-days" /></button>
          <div class="dropdown-content">
            <DatePicker v-model="date" is-range />
          </div>
        </div>
        <!-- <button @click="changeDate()"> <font-awesome-icon icon="calendar-days" /></button> -->
      </div>
    </div>

    <!-- statistic -->
    <div v-if="show" class="col">

      <div class="chart-container">
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


    <!-- otschet -->
    <div v-if="!show" class="col">

      <div class="mt-4">
        <select class="form-select" aria-label="Default select example">
          <option selected>Все</option>
          <option value="1">КТД</option>
          <option value="2">УД</option>
          <option value="3">СД</option>
          <option value="4">НИД</option>
          <option value="5">ОД</option>
        </select>
      </div>


      <div class="block-content p">
        <div class="download m-3" v-for="i in 5">
          <div class="row align-items-center">
            <div class="col">Описание</div>
            <div class="col-auto"><button class="">скачать</button></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss">
@import '@/assets/nav-second.scss';
@import 'v-calendar/dist/style.css';

// dropdown for calendar----------------------------------------------------------------------
.dropbtn {
  // background-color: #04AA6D;
  // color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.my-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 20px;
}



.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.my-dropdown:hover .dropdown-content {
  display: block;
}

// otchet--------------------------------------------------------------------------------
.form-select {
  width: fit-content;
}

.download {
  border: var(--main-border-card);
  padding: 15px 30px;
  border-radius: 20px;
}


// statistic-----------------------------------------------------------------------------

.chart-container {
  width: 80%;
  margin: auto;
}

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
}

.date {

  border: var(--main-border-card);
  border-radius: 20px;
  padding: 10px 30px;
  width: fit-content;
  display: flex;
  justify-content: center;

  // .date-num {
  //   display: inline;
  //   padding: 5px 10px;
  //   box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  //   border-radius: 50px;
  //   margin: 5px;

  //   a {
  //     text-decoration: none;
  //   }

  //   &:hover {
  //     box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  //   }
  // }

  button {
    background: none;
    padding: 0.5rem 0.8rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 50px;
    margin: 5px;

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
// }</style>




