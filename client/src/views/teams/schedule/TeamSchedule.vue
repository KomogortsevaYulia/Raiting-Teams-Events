<template>
  <div class="row">
    <div class="row overflow-hidden p-2">
      <!--        schedule table-->
      <div :class="['col-12', { 'col-lg-8': seeTime }]">
        <div class="col-12 overflow-scroll" style="max-height: 500px">
          <table class="table">
            <thead>
              <tr class="header">
                <th class="p-2 bg-transparent"></th>
                <th
                  v-for="(week, index) in dates.weeks"
                  v-bind:key="index"
                  class="p-2 bg-transparent"
                >
                  <div class="text-center">{{ week }}</div>

                  <div class="text-center">
                    {{ dates.dateRange[index].getDate() }}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <!--   hours-->
              <tr v-for="(hour, index1) in time" :key="index1" class="">
                <td class="header fw-bold">{{ hour }}</td>
                <!--  weeks-->
                <td
                  v-for="(week, index2) in dates.weeks"
                  :key="index2"
                  class="p-0 position-relative week-cell"
                >
                  <!--  cell settings -->
                  <div
                    v-if="can('can edit own teams')"
                    class="cell-settings position-absolute top-0 start-0 p-2"
                  >
                    <!--    search auditories -->
                    <div
                      class="btn-search mb-3"
                      @click="onSearchClick(dates.dateRange[index2], hour)"
                    >
                      <FontAwesomeIcon icon="search" />
                    </div>
                    <router-link :to="`/team/${teamId}/schedule/add-class?date=${dates.dateRange[index2]}&time=${hour}&team_name=${teamName}`">
                      <button class="btn-order">Забронировать</button>
                    </router-link>
                  </div>
                  <!--  data-->

                  <div v-if="timeDayWeek[week] && timeDayWeek[week][hour]">
                    <div
                      v-for="(lesson, index3) in timeDayWeek[week][hour]"
                      :key="index3"
                    >
                      <!--  DATA in cell-->
                      <div
                        v-if="
                          lesson.repeat ||
                          checkDatesYMDEquivalent(
                            lesson.date,
                            dates.dateRange[index2],
                          )
                        "
                        class="selected-day p-1"
                      >
                        <p>{{ lesson.cabinet.name }}</p>
                        <div class="">{{ lesson?.user?.fullname }}</div>
                        <div>{{ lesson?.endTime }}</div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div v-if="!time || time.length <= 0" class="">
            <div class="alert alert-danger" role="alert">
              Время занятий не задано
              <button v-if="can('can edit own teams')" class="btn-order">
                Забронировать
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- select auditory-->
      <div class="col-lg-4 col-12" v-if="seeTime">
        <AuditoriumField
          :onCloseAuditories="handleCloseAuditories"
          :date="selectedCell.date"
          :time="selectedCell.time"
          :handle-on-auditory-click="onAuditoryClick"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCabinetsTimeStore } from "@/store/schedule/cabinets-time_store";
import type { ICabinetsTimeSearch } from "@/store/models/schedule/cabinets-time.model";
import { onBeforeMount, ref } from "vue";
import type { ISchedule } from "@/store/models/schedule/schedule.model";
import type { ICabinet } from "@/store/models/schedule/cabinet.model";
import type { IUser } from "@/store/models/user/user.model";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { usePermissionsStore } from "@/store/permissions_store";
import AuditoriumField from "@/views/teams/schedule/AuditoriesWindow.vue";

const permissions_store = usePermissionsStore();
const can = permissions_store.can;
const selectedCell = ref({ date: new Date(), time: "" });

interface TimeData {
  [time: string]: {
    cabinet: ICabinet;
    user: IUser;
    endTime: string;
    date: Date;
    repeat: boolean;
  }[];
}

interface DayWeek {
  [dayWeek: string]: TimeData;
}

const cabinetsTimeStore = useCabinetsTimeStore();
// const teamStore = useTeamStore();

const props = defineProps<{
  teamId: number;
  teamName:string;
  dates: {
    dateStart: Date;
    dateEnd: Date;
    dateRange: Date[];
    weeks: string[];
    formattedDate: string;
  };
}>();

const cabinetsTimeSearch = ref<ICabinetsTimeSearch>({ team_id: props.teamId });
const schedule = ref<ISchedule>({});
const timeDayWeek = ref<DayWeek>({});

const time = ref<string[]>([]);
const seeTime = ref(false);

onBeforeMount(() => {
  getCabinetsTime();
});

async function onAuditoryClick(auditory: ICabinet) {
  cabinetsTimeSearch.value.cabinet_id = auditory.id;
  await getCabinetsTime();
}

function onSearchClick(date: Date, time: string) {
  seeTime.value = true;
  selectedCell.value = { date: date, time: time };
}

function handleCloseAuditories() {
  seeTime.value = false;
}

async function getCabinetsTime() {
  schedule.value = await cabinetsTimeStore.getCabinetsTime(
    cabinetsTimeSearch.value,
  );
  await setTime();
}

async function setTime() {
  time.value = [];
  timeDayWeek.value = {};

  const cT = schedule.value.cabinets_time;
  cT?.forEach((el) => {
    const dayWeek = el.day_week.name;
    const tStart = el.time_start;
    // week date
    if (!timeDayWeek.value[dayWeek]) {
      timeDayWeek.value[dayWeek] = {};
    }

    // push time
    if (!timeDayWeek.value[dayWeek][tStart]) {
      timeDayWeek.value[dayWeek][tStart] = [];
    }

    if (!time.value.includes(tStart)) time.value.push(tStart);

    timeDayWeek.value[dayWeek][tStart].push({
      cabinet: el.cabinet,
      user: el.user,
      endTime: el.time_end,
      repeat: el.repeat,
      date: new Date(el.date),
    });
  });

  //   sort time
  time.value.sort((a, b) => {
    const timeToSec = (time: string) => {
      const [hours, mins, sec] = time.split(":").map(Number);
      return hours * 3600 + mins * 60 + sec;
    };
    return timeToSec(a) - timeToSec(b);
  });
}

function checkDatesYMDEquivalent(date1: Date, date2: Date) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}
</script>

<style lang="scss" scoped>
.header {
  background: #e6e6e6;
}

th,
td {
  border: var(--main-border-card);
  min-width: 120px; /* Adjust the number of columns here */
  max-width: 120px;
  height: 80px;

  text-align: center; /* Center-align horizontally */
  vertical-align: middle; /* Vertical centering */
  display: table-cell; /* Required for vertical centering */
}

.selected-day {
  background: var(--second-color);
  color: white;
}

.week-cell {
  &:hover {
    .cell-settings {
      display: block;
    }
  }

  .cell-settings {
    display: none;
  }
}

.btn-order {
  padding: 5px;
  font-size: 0.7rem;
}

.btn-search {
  background: var(--dusk-color);
  border-radius: 5px;
  width: fit-content;
  padding: 2px 5px;

  cursor: pointer;
}
</style>
