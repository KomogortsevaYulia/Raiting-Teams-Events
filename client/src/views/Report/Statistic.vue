<script setup lang="ts" >
import { ref } from 'vue';
import { DatePicker } from 'v-calendar';
import DownloadReport from './DowloadReport.vue';
import EPie from '@/components/Charts/EPie.vue';
import EBar from '@/components/Charts/EBar.vue';
import EBar2 from '@/components/Charts/ELine.vue';

// константные значения

// direction
const directions = [{ id: 0, data: 'ВСЕ' }, { id: 1, data: 'НИД' }, { id: 2, data: 'КТД' },
{ id: 3, data: 'СД' }, { id: 4, data: 'ОД' }, { id: 5, data: 'УД' }]

// grdphics
const typeGraphics = [{ id: 0, data: 'Статистика дат проведения мероприятий' },
{ id: 1, data: 'Статистика коллективов с количество мероприятий' },
{ id: 2, data: 'Общие показатели' }]

// dates
const dates = [{ id: 0, date: '1н' }, { id: 1, date: '1м' }, { id: 2, date: '1г' }]


// dropdowns
const levels = [{ id: 0, data: "Все уровни" }, { id: 1, data: 'вузовский' },
{ id: 2, data: 'городской' }, { id: 3, data: 'региональный' }]

const types = [{ id: 0, data: 'Все типы' }, { id: 1, data: 'внутренние' }, { id: 2, data: 'внешние' }]

const eventOrTeams = [{ id: 0, data: 'Мероприятия' }, { id: 1, data: 'Коллективы' }]



const date = ref(1)             //дата

const selectedDirection = ref(0)    //все направления

const selectedLevel = ref(0)    //уровень
const selectedType = ref(0)     //тип мероприятия
const selectedEvOrTeam = ref(0) //меропприятие или коллектив

//statitstic graphics
const statisticDateEvent = ref(true)      //Статистика дат проведения мероприятий
const statisticTeamsAndEvent = ref(true)  //Статистика коллективов с количество мероприятий
const defaultStatistic = ref(true)        //Общие показатели


function changeDate(start: Date = new Date(), end: Date = new Date()) {
}


const datessOfEvents = [
  { value: 10, name: 'Осень' },
  { value: 75, name: 'Зима' },
  { value: 50, name: 'Лето' },
  { value: 4, name: 'Весна' },
]
// данные для вывода в графики
const labelsTopTeams = ['Лыжные гонки', 'Хоккей с мячом', 'Волейбол',
  'Бокс', 'Футбол и мини-футбол',
]
const dataTopTeams = [2, 5, 8, 8, 9]

// const labelsDatesOfEvents = ['Осень', 'Зима', 'Лето', 'Весна']
// const dataDatesOfEvents = [2, 5, 8, 8]


// const labelsEventsTwoType = ['Внешние', 'Внутренние']
const dataEventsTwoType = [
  { value: 10, name: 'Внешние' },
  { value: 75, name: 'Внутренние' },]


const show = ref(true);



// проверить какие графики показать, а какие убрать
function seeGraphics(typeGraphics: any) {

  // alert(statisticDateEvent.value)
  switch (typeGraphics.id) {
    case 0:
      statisticDateEvent.value = !statisticDateEvent.value
      break;
    case 1:
      statisticTeamsAndEvent.value = !statisticTeamsAndEvent.value
      break;
    case 2:
      defaultStatistic.value = !defaultStatistic.value
      break;
  }
}



function changeDirection(direction: any) {
  selectedDirection.value = direction.id
}
</script>



<template>
  <!-- menu -->
  <div class=" block-content">

    <div class="row text-center mb-2">
      <h6>Период</h6>
    </div>

    <!-- time -->

    <div class="row">
      <div class="w-100 justify-content-center d-flex">
        <div class="date">
          <button class=" btn-custom-secondary" v-for="dt in dates" @click="changeDate()">{{ dt.date }}</button>

          <div class="my-dropdown" style="float:center;">
            <button class="dropbtn btn-custom-secondary"><font-awesome-icon icon="calendar-days" /></button>
            <div class="dropdown-content">
              <DatePicker v-model="date" is-range />
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- time -->




    <!-- выбрать направление -->
    <div class="row my-4 d-flex justify-content-md-center directions">

      <div v-for="direc in directions" class="col-auto d-flex my-1">
        <a href="#" @click="changeDirection(direc)" :class="{ active: selectedDirection == direc.id }">{{ direc.data
        }}</a>
    </div>

    </div>
    <!-- выбрать направление -->




    <!-- dropdowns select property for event or team -->
    <div class="row">
      <!-- date -->
      <div class="col-auto  d-flex my-1">
        <!-- events_or_teams -->
        <select class="form-select" aria-label="Default select example" v-model="selectedEvOrTeam">
          <option v-for="et in eventOrTeams" :value="et.id" :selected="et.id == 1">{{ et.data }}</option>
        </select>
      </div>
      <div class="col-auto  d-flex my-1">
        <select class="form-select" aria-label="Default select example">
        <option selected>Все коллективы</option>

        </select>
      </div>
      <!-- level -->
      <div class="col-auto  d-flex my-1">
        <select class="form-select" aria-label="Default select example" v-model="selectedLevel">
          <option v-for="lvl in levels" :value="lvl.id" :selected="lvl.id == 1">{{ lvl.data }}</option>
        </select>
      </div>
      <!-- types -->
      <div class="col-auto  d-flex my-1">
        <select class="form-select" aria-label="Default select example" v-model="selectedType">
          <option v-for="tp in types" :value="tp.id" :selected="tp.id == 1">{{ tp.data }}</option>
        </select>
      </div>

    </div>

    <!--Отчетность  -->
    <DownloadReport :date="0" :event-or-team="eventOrTeams[selectedEvOrTeam]" :direction="directions[selectedDirection]"
      teams="все" :level="levels[selectedLevel]" :type-event="types[selectedType]" />


    <!-- Graphics -->
    <div class="my-4">
      <p>Отобразить графики</p>
      <hr>
    </div>

    <!-- checkboxes -->
    <div class="row">

      <div class="col-auto d-flex" v-for="g in typeGraphics">
        <div class="checkbox__block" @change="seeGraphics(g)">
          <label class="checkbox__container">
            <input type="checkbox" class="checkbox">
            <span class="fake"></span>
            <span class="span__title">{{ g.data }}</span>
          </label>
        </div>
      </div>
    </div>

    <!--Общие показатели  -->
    <div v-if="defaultStatistic" class="row mt-4">

      <div class="col" v-for="i in 4">
        <div :class="['colored-block-' + i]" class="my-2">
          <div class="row">info</div>
          <div class="row">info</div>
        </div>
      </div>

    </div>
  </div>


  <div class="chart-container">



    <!-- statistic -->
    <div v-if="show" class="col">

      <!-- Мероприятия -->
      <div v-if="statisticDateEvent" class="block-content">

        <div class="row d-flex justify-content-center text-center">
          <h4>Мероприятия</h4>
          <div class="row mt-4 ">
            <div class="col-lg-6 col-md-12 chartBorder">
              <h6>Статистика дат проведения мероприятий</h6>
              <EPie :data="datessOfEvents" />
              <!-- <PieChart class="chart" :labels="labelsDatesOfEvents" :data="dataDatesOfEvents"
                            title="Статистика дат проведения мероприятий" label-name="число мероприятий" /> -->
            </div>

            <div class="col-lg-6 col-md-12 chartBorder">
              <h6>Количество внутренних/внешних мероприятий</h6>

              <EPie :data="dataEventsTwoType" />
              <!-- <PieChart class="chart" :labels="labelsEventsTwoType" :data="dataEventsTwoType"
                            title="Количество внутренних/внешних мероприятий" label-name="число мероприятий" /> -->
            </div>
          </div>

        </div>
      </div>


      <!-- Коллективы -->
      <div v-if="statisticTeamsAndEvent" class="block-content">

        <div class="row d-flex justify-content-center text-center">
          <h4>Коллективы</h4>
          <div class="row mt-4 chartBorder">
            <h6>Топ коллективов с наибольшим числом мероприятий</h6>

            <div class="col">
              <EBar :labels="labelsTopTeams" :data="dataTopTeams" />
              <!-- <EBar class="chart" :labels="labelsTopTeams" :data="dataTopTeams"
                            title="Топ коллективов с наибольшим числом мероприятий" label-name="число мероприятий" /> -->
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>



<style lang="scss">
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


// statistic-----------------------------------------------------------------------------

.chart-container {
  width: 100%;
  margin: auto;

  .block-content {
    padding: 80px;
  }
}

.chart {
  margin: 15px;
  display: flex;
  width: 100%;
}

// блоки с содержимым-------------------------------------------------------------------
.block-content {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  padding: 40px;
  margin: 30px auto 30px auto;
  background: white;

  .directions {
    a {
      padding: 5px 30px;
      border: 0.5px solid var(--second-color);
      border-radius: 20px;

      &:hover {
        color: white;
        background: var(--second-color);
        opacity: 0.5;
      }

    }

    .active {
      background-color: var(--second-color);
      color: white;
    }
  }


  hr {
    height: 1.5px;
    border: 0;
    background: var(--second-color);
  }

  p {
    color: var(--second-color);
    font-weight: 500;
  }
}

.date {

  button {
    background: none;
    padding: 0.5rem 0.8rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 50px;
    margin: 8px;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
  }


}

// чекбоксы--------------------------------------------------------------------------------

.checkbox__container {
  color: #A1A1A1;
  padding: 0.2rem 0.5rem;
  display: flex;

  .checkbox {
    display: none;

    &:checked+.fake::before {
      opacity: 1;
    }

  }

  .span__title {
    font-size: 1rem;
    margin-left: 1rem;
    hyphens: manual;

  }

  .fake {
    display: inline-block;
    position: relative;
    background-image: url(@/assets/icon/checked.svg);
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.3rem;

    background-color: #5BD1D7;

    &:hover {
      cursor: pointer;
    }

  }

  .fake::before {
    content: "";
    position: absolute;
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    background-color: #CDEEF0;

    border-radius: 0.3rem;
    transform: (-50%, -50%);
    opacity: 0;
    transition: .2s;
  }
}



// accordeon--------------------------------------------------------------------------------


// colored-block

.colored-block-1,
.colored-block-2,
.colored-block-3,
.colored-block-4 {

  border-radius: 10px;
  padding: 20px 80px;
  min-width: fit-content;
  min-height: 100px;
}

.colored-block-1 {
  background: #CEEAB2;
  background: linear-gradient(120deg, #CEEAB2 0%, #ABECEC 100%);
}

.colored-block-2 {
  background: #FFADAD;
  background: linear-gradient(120deg, #FFADAD 0%, #E7C756 100%);
}

.colored-block-3 {
  background: #A9ADFF;
  background: linear-gradient(120deg, #A9ADFF 0%, #5BDFDF 100%);
}

.colored-block-4 {
  background: #E5ADFF;
  background: linear-gradient(120deg, #E5ADFF 0%, #718CED 100%);
}




// global

.form-select,
.accordion-header {
  border: 1px solid var(--second-color);
  border-radius: 0.25rem;
  line-height: 1.5;


  &:focus {
    box-shadow: 0 0 0.1rem 0.15rem rgba(91, 209, 215, 0.493);
    outline: 0;
    border: 0;
  }


  option {
    &:hover {
      background-color: #ff502f;
      color: #5BD1D7;
    }
  }

  .accordion-button {


    &:focus,
    &:hover {
      color: black;
      background: white;
      box-shadow: 0 0 0.1rem 0.15rem rgba(91, 209, 215, 0.493);
      outline: 0;
      border: 0;
    }
  }
}



.chartBorder {
  border: var(--main-border-card);
  border-radius: 5px;
  padding: 20px;

}
</style>




