
<!-- в БД в teams->direction->shortname должны быть
   (НИД, КТД, УД, СД, ОД) хардкод, а как по другому определить вид направления? -->

<script setup lang="ts" >
import { computed, onBeforeMount, onMounted, ref, watch, type Ref } from 'vue';
import { DatePicker } from 'v-calendar';
import DownloadReport from './DowloadReport.vue';

// graphics
import ColorfulBlocks from '@/components/Charts/ColorfulBlocks.vue';
import EPie from '@/components/Charts/EPie.vue';
import EBar from '@/components/Charts/EBar.vue';

import { useTeamStore } from '@/store/team_store';
import { useJournalStore } from '@/store/journals_store';
import _ from 'lodash';
import { useEventStore } from '@/store/events_store';
import { Direction, Level } from '@/store/enums/enum_event';
import { useChartStore } from './chart_logic';

import { Type } from '@/store/enums/enum_event';
import { TimeRange, TypeReport } from '@/store/enums/enums_report';

// store
const teamStore = useTeamStore();
const journalStore = useJournalStore();
const eventStore = useEventStore();

const chartStore = useChartStore();

// константные значения

// direction
// const directions = [{ id: 0, data: 'ВСЕ', fullname: Direction.ALL }, { id: 1, data: 'НИД', fullname: Direction.NID }, { id: 2, data: 'КТД', fullname: Direction.KTD },
// { id: 3, data: 'СД', fullname: Direction.SD }, { id: 4, data: 'ОД', fullname: Direction.OD }, { id: 5, data: 'УД', fullname: Direction.UD }]

// grdphics
const typeGraphics = [{ id: 0, data: 'Статистика дат проведения мероприятий' },
{ id: 1, data: 'Статистика коллективов с количество мероприятий' },
{ id: 2, data: 'Общие показатели' }]

// dates
const dates = [{ id: 0, date: '1н', timeRange: TimeRange.WEEK }, { id: 1, date: '1м', timeRange: TimeRange.MONTH }, { id: 2, date: '1г', timeRange: TimeRange.YEAR }]


// dropdowns
const levels = [{ id: 0, data: Level.ALL }, { id: 1, data: Level.UNIVERSITY },
{ id: 2, data: Level.CITY }, { id: 3, data: Level.REGION }]

const types = [{ id: 0, data: Type.ALL }, { id: 1, data: Type.INSIDE }, { id: 2, data: Type.OUTSIDE }]

const typeReports = [{ id: 0, data: TypeReport.DIRECTION }, { id: 1, data: TypeReport.TEAM }]

//start 1 year millis * 5 = 5 years millis  and current year -  5 years
const dateRange = ref({ start: new Date(new Date().getTime() - 31556952000 * 5), end: new Date() })    //дата

const selectedDirection = ref(0)    //все направления
// const selectedTeam = ref(0)    //все направления

const selectedLevel = ref(0)    //уровень
const selectedType = ref(0)     //тип мероприятия
const selectedTypeReport = ref(TypeReport.DIRECTION) //тип отчета
const selectedTeam = ref({ name: "Все", id: 0 })

// const dateStart = ref(new Date())
// const dateEnd = ref(new Date())

//statitstic graphics
const statisticDateEvent = ref(true)      //Статистика дат проведения мероприятий
const statisticTeamsAndEvent = ref(true)  //Статистика коллективов с количество мероприятий
const defaultStatistic = ref(true)        //Общие показатели

const datessOfEvents = [
  { value: 10, name: 'Осень' },
  { value: 75, name: 'Зима' },
  { value: 50, name: 'Лето' },
  { value: 4, name: 'Весна' },
]
// данные для вывода в графики
let labelsTopTeams = ['Лыжные гонки', 'Хоккей с мячом', 'Волейбол',
  'Бокс', 'Футбол и мини-футбол',
]
let dataTopTeams = [2, 5, 8, 0, 9]

// data for graphics---------------------------------------------------

//данные для графика внутренние/внешние мероприятия
let dataEventsInnerOuter = ref([
  { value: 0, name: Type.INSIDE },
  { value: 0, name: Type.OUTSIDE },])


const colorfulBlocksData = ref([
  { value: 0, name: "Число мероприятий" },
  { value: 0, name: "Число коллективов" },])

// dropdowns-----------------------------------------------------------

const foundTeams = ref([{ name: "Все", id: 0 }])
const foundEvents = ref()
const foundJournals = ref()


// { id: number, shortname: string }
const foundDirections = ref([{ id: 0, shortname: Direction.ALL, idDB: 0 }])           //дата

onBeforeMount(async () => {
  await getDirections()
  getEvents()
})

// если выбран коллектив то получить статистику с мероприятий
watch(() => selectedTeam.value, async () => {
  getEvents()
  // alert("eeeeeeeeeeee")
})

// date in calendar changed
watch(() => dateRange.value, () => {
  getEvents()
})


async function getEvents() {

  switch (selectedTypeReport.value) {
    case TypeReport.DIRECTION:
      await getEventsByDirection()
      break
    case TypeReport.TEAM:
      await getEventsOfTeam(selectedTeam.value.id)
      // foundEvents.value = journals.data
      // colorfulBlocksData.value[0].value = journals.count
      break
  }

  updateCharts()

}

async function changeTimeViaButton(timeRange: TimeRange) {

  let dStart = new Date()
  let dEnd: Date = new Date()

  switch (timeRange) {
    case TimeRange.WEEK:
      dStart.setTime(dStart.getTime() - 604800000)//week in millis
      break;
    case TimeRange.MONTH:
      dStart.setTime(dStart.getTime() - 2629800000)//month in millis
      break;
    case TimeRange.YEAR:
      dStart.setFullYear(dStart.getFullYear() - 1)
      break;
    case TimeRange.RANGE:
      break;
  }

  dateRange.value.start = dStart
  dateRange.value.end = dEnd
}

async function getEventsOfTeam(teamId: number) {

  const eventsOfTeam = await getEventsViaJournalsByTeam(teamId)

  foundEvents.value = eventsOfTeam.data
  colorfulBlocksData.value[0].value = eventsOfTeam.count
}

async function updateCharts() {

  if (statisticDateEvent.value) {
    dataEventsInnerOuter.value = chartStore.countEventsInnerOuter(foundEvents.value)
  }

}


// получить идшники направлений с бд, чтобы по этим идшникам найти
// эти направления 
async function getDirections() {

  let data = await teamStore.fetchTeamsOfDirection(-1, "direction")

  let directions = data[0]
  let arrayData = []
  arrayData[0] = { id: 0, shortname: Direction.ALL, idDB: 0 }

  for (let i = 0; i < directions.length; i++) {
    // console.log("directions " + directions[i].shortname)
    let direction = directions[i]

    arrayData[i + 1] = { id: i + 1, shortname: direction.shortname, idDB: direction.id };
  }

  foundDirections.value = arrayData
}


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


// получить всех пользователей и выбрать из них нужных
async function getTeamsOfDirection(directionId: number) {

  let data = await teamStore.fetchTeamsOfDirection(directionId)

  // console.log("selectedDirection.value " + selectedDirection.value+ " " + data)
  let teams = data[0]
  colorfulBlocksData.value[1].value = data[1]
  let arrayData = []

  //arrayData[0] = { name: "Все", id: 0 }


  for (let i = 0; i < teams.length - 1; i++) {
    let team = teams[i]
    // console.log("team " + team)
    arrayData[i] = { name: team.title, id: team.id };
  }

  if (teams.length > 0)
    selectedTeam.value = arrayData[0]
  else selectedTeam.value = { name: "Все", id: 0 }


  foundTeams.value = arrayData
}

//получит Events via journals-------------------------------------------------


async function getEventsViaJournalsByTeam(teamId: number) {

  // alert("teamId " + teamId)
  let data = await journalStore.fetchJournals(teamId)
  let countAppropriate = 0

  //получить всех найденне journal
  let journals = data[0]

  let arrayData = []


  for (let i = 0; i < journals.length; i++) {
    let journal = journals[i]


    let eventId = journal.event.id
    // console.log("eventId   " + eventId)

    let event = await eventStore.fetchEventById(eventId,
      dateRange.value.start, dateRange.value.end,
      levels[selectedLevel.value].data,
      types[selectedType.value].data,)


    if (event??false){
      // console.log("arrayData " + event)
      arrayData[i] = event
      countAppropriate++
   
    }

  

    // arrayData[i + 1] = { id: journal.id };
  }

  return { data: arrayData, count: countAppropriate }


  // console.log("journal" + arrayData[0].id)
}



// получить мероприятия
async function getEventsByDirection() {

  let directionName = Direction.ALL
  directionName = foundDirections.value[selectedDirection.value].shortname

  let data = await eventStore.getEventsByDirection(directionName,
    dateRange.value.start, dateRange.value.end,
    levels[selectedLevel.value].data,
    types[selectedType.value].data,)

  let events = data[0]
  colorfulBlocksData.value[0].value = data[1]

  foundEvents.value = events
  // console.log("evnt " + foundEvents.value)
  // console.log("directions " + foundDirections.value[selectedDirection.value].shortname + "   selectedDirection " + selectedDirection.value)
}


async function changeDirection(direction: any) {

  selectedDirection.value = direction.id

  switch (selectedTypeReport.value) {
    case TypeReport.DIRECTION:
      getEvents()
      break
    case TypeReport.TEAM:
      await getTeamsOfDirection(direction.idDB)
      getEvents()

      // getEventsOfTeam(selectedTeam.value.id)
      break
  }

}


function changeTypeReport() {
  const tR = selectedTypeReport.value
  switch (tR) {
    case TypeReport.DIRECTION:
      selectedTeam.value = { name: "Все", id: 0 }
      break
    case TypeReport.TEAM:
      let directionName = Direction.ALL
      directionName = foundDirections.value[selectedDirection.value].shortname
      getTeamsOfDirection(foundDirections.value[selectedDirection.value].idDB)
      break
  }
}

</script>
      
      
      
<template>
  <!-- selectedDirection
      {{ selectedDirection }}   {{ foundDirections[selectedDirection] }}
      {{ dateRange }}
      {{ selectedTeam }}
      <hr />
      {{ dataEventsInnerOuter }} -->
  <!-- menu -->
  <div class=" block-content">

    <div class="row text-center mb-2">
      <h6>{{ dateRange.start.toDateString()}} - {{ dateRange.end.toDateString()}}</h6> 
    </div>

    <!-- time -->

    <div class="row">
      <div class="w-100 justify-content-center d-flex">
        <div class="date">
          <button class=" btn-custom-secondary date" v-for="dt in dates" @click="changeTimeViaButton(dt.timeRange)">{{
            dt.date
          }}</button>

          <div class="my-dropdown" style="float:center;">
            <button class="dropbtn btn-custom-secondary date"><font-awesome-icon icon="calendar-days" /></button>
            <div class="dropdown-content">
              <DatePicker v-model="dateRange" is-range />
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- time -->




    <!-- выбрать направление -->
    <div class="row my-4 d-flex justify-content-md-center directions">

      <div v-for="direc in foundDirections" class="col-auto d-flex my-1">
        <a href="#" @click="changeDirection(direc)" :class="{ active: selectedDirection == direc.id }">{{ direc.shortname
        }}</a>
      </div>

    </div>
    <!-- выбрать направление -->




    <!-- dropdowns select property for event or team -->

    <!-- team statistic or directions statistic -->
    <div class="row my-4 d-flex ">

      <label class="form-label">Тип отчетности</label>
      <div class="form-check col-auto mx-2" v-for="drT in typeReports">
        <input class="form-check-input" type="radio" name="flexRadioDefault" :checked="drT.data == selectedTypeReport"
          :value="drT.data" v-model="selectedTypeReport" @change="changeTypeReport()">
        <label class="form-check-label">
          {{ drT.data }}
        </label>
      </div>

    </div>

    <div class="row">


      <!-- team -->
      <div class="col-auto  d-flex my-1" v-if="selectedTypeReport == TypeReport.TEAM">
        <div class="mb-3">
          <label class="form-label">коллектив</label>
          <v-select placeholder="Название коллектива" label="name" :options="foundTeams"
            v-model="selectedTeam"></v-select>
        </div>
      </div>

      <!-- level -->
      <div class="col-auto  d-flex my-1">
        <div class="mb-3">
          <label class="form-label">уровень мероприятий</label>
          <select class="form-select" aria-label="Default select example" v-model="selectedLevel" @change="getEvents()">
            <option v-for="lvl in levels" :value="lvl.id">{{ lvl.data }}</option>
          </select>
        </div>
      </div>
      <!-- types -->
      <div class="col-auto  d-flex my-1">
        <div class="mb-3">

          <label class="form-label">тип мероприятий</label>
          <select class="form-select" aria-label="Default select example" v-model="selectedType" @change="getEvents()">
            <option v-for="tp in types" :value="tp.id">{{ tp.data }}</option>
          </select>
        </div>
      </div>

    </div>



    <!--Отчетность  -->
    <DownloadReport :date="0" :event-or-team="selectedTypeReport" :direction="foundDirections[selectedDirection]"
      :teams="selectedTeam.name" :level="levels[selectedLevel]" :type-event="types[selectedType]" />
    <!--Отчетность  -->




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

      <ColorfulBlocks :data="colorfulBlocksData" />

    </div>
  </div>


  <div class="chart-container">



    <!-- statistic -->
    <div class="col">

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

              <EPie :data="dataEventsInnerOuter" />
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
@import 'vue-select/dist/vue-select.css';

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
  padding: 5px;
  min-width: 150px;
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

  button.date {
    background: none;
    padding: 0.5rem 0.8rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 50px;
    margin: 8px;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      background-color: var(--main-color);
    }
  }

  .dropdown-content {
    button {
      background: white;
      color: black;
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



// global

.form-select,
.accordion-heade {
  border: 1px solid var(--second-color);
  border-radius: 0.25rem;
  line-height: 1.5;
  box-shadow: none;

  &:focus {
    box-shadow: 0 0 0.1rem 0.15rem rgba(91, 209, 215, 0.493);
    outline: 0;
    border: 0;
  }

}

.accordion-header {


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
      
      
      
      
      