<script setup lang="ts" >
import { ref } from 'vue';
import PieChart from '@/components/Charts/Pie.vue';
import LineChart from '@/components/Charts/Line.vue';
import { DatePicker } from 'v-calendar';


const date = ref(1)
const selectedLevel = ref(0)
const selectedType = ref(0)
const selectedEvOrTeam = ref(0)

function changeDate(start: Date = new Date(), end: Date = new Date()) {
}


const labelsTopTeams = ['Лыжные гонки', 'Хоккей с мячом', 'Волейбол',
  'Бокс', 'Футбол и мини-футбол',
]
const dataTopTeams = [2, 5, 8, 8, 9]

const labelsDatesOfEvents = ['Осень', 'Зима', 'Лето', 'Весна']
const dataDatesOfEvents = [2, 5, 8, 8]

const labelsEventsTwoType = ['Внешние', 'Внутренние']
const dataEventsTwoType = [2, 5]


const show = ref(true);
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
          <button class=" btn-secondary" v-for="dt in dates" @click="changeDate()">{{ dt.date }}</button>

          <div class="my-dropdown" style="float:center;">
            <button class="dropbtn btn-secondary"><font-awesome-icon icon="calendar-days" /></button>
            <div class="dropdown-content">
              <DatePicker v-model="date" is-range />
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- time -->

    <!-- выбрать направление -->
    <div class="row my-4 d-flex justify-content-md-center">
      <div v-for="direc in directions" class="col-auto d-flex my-1">
        <a href="#">{{ direc }}</a>
      </div>
    </div>
    <!-- выбрать направление -->

    <!-- dropdowns select property for event or team -->
    <div class="row">
      <!-- date -->
      <div class="col-auto  d-flex my-1">
        <!-- events_or_teams -->
        <select class="form-select" aria-label="Default select example" v-model="selectedEvOrTeam">
          <option v-for="et in events_or_teams" :value="et.id" :selected="et.id == 1">{{ et.data }}</option>
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
    <!-- select property for event or team -->


    <!--Отчетность  -->
    <div class="my-4">
      <p>Отчетность</p>
      <hr>
    </div>

    <div class="accordion" id="accordionExample">
      <div class="accordion-item">

        <h2 class="accordion-header" id="headingOne">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
            aria-expanded="true" aria-controls="collapseOne">
            Итоговая отчетность
          </button>
        </h2>

        <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne"
          data-bs-parent="#accordionExample">
          <div class="accordion-body m-4">
            <div class="row">
              <div class="col"> направление: </div>
              <div class="col">НИД</div>
            </div>

            <div class="row my-3">
              <div class="col"> вид: </div>
              <div class="col"> {{ events_or_teams[selectedEvOrTeam].data }}</div>
            </div>

            <div class="row  my-3">
              <div class="col"> колективы:</div>
              <div class="col"> все коллективы</div>
            </div>

            <div class="row  my-3">
              <div class="col"> уровень: </div>
              <div class="col">{{ levels[selectedLevel].data }}</div>
            </div>

            <div class="row  my-3">
              <div class="col"> тип мероприятия: </div>
              <div class="col"> {{ types[selectedType].data }}</div>
            </div>

            <div class="row  my-3">
              <div class="col"> дата:</div>
              <div class="col"> 01.01.2023 - 01.02.2023</div>
            </div>

            <div class="row mt-4 mx-3 d-flex  justify-content-end">
              <button type="button" class="btn-primary">
                Скачать
              </button>
            </div>


          </div>
        </div>
      </div>

    </div>


    <!-- Graphics -->
    <div class="my-4">
      <p>Отобразить графики</p>
      <hr>
    </div>

    <!-- checkboxes -->
    <div class="row">

      <div class="col-auto d-flex" v-for="g in typeGraphics">
        <div class="checkbox__block">
          <label class="checkbox__container">
            <input type="checkbox" class="checkbox">
            <span class="fake"></span>
            <span class="span__title">{{ g }}</span>
          </label>
        </div>
      </div>

    </div>


  </div>





  <div class="chart-container">
    <!-- statistic -->
    <div v-if="show" class="col">


      <div class="block-content">
        <h4>Коллективы</h4>
        <div class="row justify-content-center">
          <div class="col">
            <LineChart class="chart" :labels="labelsTopTeams" :data="dataTopTeams"
              title="Топ коллективов с наибольшим числом мероприятий" label-name="число мероприятий" />
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


      <div class="block-content">
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
  width: 100%;
  margin: auto;
}

.chart {
  margin: 15px;
  display: flex;
  width: 100%;
}

// блоки с содержимым
.block-content {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  padding: 40px;
  margin: 30px auto 30px auto;
  background: white;

  a {
    padding: 5px 30px;
    border: 0.5px solid var(--second-color);
    border-radius: 20px;

    &:hover {
      color: white;
      background: var(--second-color);
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




// чекбоксы

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
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.3rem;
    background-color: #CDEEF0;

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
    background-color: #5BD1D7;
    background-image: url(@/assets/icon/checked.svg);
    border-radius: 0.3rem;
    transform: (-50%, -50%);
    opacity: 0;
    transition: .2s;
  }
}



// accordeon
</style>


<!-- data -->
<script lang="ts">
export default {

  data() {
    return {
      directions: ['ВСЕ', 'НИД', 'КТД', 'СД', 'ОД', 'УД'],
      typeGraphics: ['Статистика дат проведения мероприятий',
        'Статистика коллективов с количество мероприятий',
        'Общие показатели'],
      dates: [{ id: 0, date: '1н' }, { id: 1, date: '1м' }, { id: 2, date: '1г' }],

      levels: [{ id: 0, data: "Все уровни" }, { id: 1, data: 'вузовский' },
      { id: 2, data: 'городской' }, { id: 3, data: 'региональный' }],
      types: [{ id: 0, data: 'Все типы' }, { id: 1, data: 'внутренние' }, { id: 2, data: 'внешние' }],
      events_or_teams: [{ id: 0, data: 'Мероприятия' }, { id: 1, data: 'Коллективы' }],

    }
  }
}
</script>




