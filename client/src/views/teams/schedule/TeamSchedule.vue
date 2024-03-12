<template>
  <!--    schedule-->
  <!--  time {{ time }} -->
<!--  timeDayWeek {{ timeDayWeek }}-->
  <div class="row">
    <div class="col-12 overflow-scroll">
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
          <!--        hours-->
          <tr v-for="(hour, index1) in time" :key="index1" class="">
            <td class="header fw-bold">{{ hour }}</td>
            <!--              weeks-->
            <td v-for="(week, index2) in dates.weeks" :key="index2" class="p-0">
              <!--                data-->
              <div v-if="timeDayWeek[week] && timeDayWeek[week][hour]">
                <div
                  v-for="(lesson, index3) in timeDayWeek[week][hour]"
                  :key="index3"
                >
                  <!--                    DATA-->
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

onBeforeMount(() => {
  getCabinetsTime().then(() => {
    setTime();
  });
});

async function getCabinetsTime() {
  schedule.value = await cabinetsTimeStore.getCabinetsTime(
    cabinetsTimeSearch.value,
  );
}

async function setTime() {
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
  min-width: 100px; /* Adjust the number of columns here */
  max-width: 100px;
  max-height: 10px; /* Adjust the height of rows as needed */

  text-align: center; /* Center-align horizontally */
  vertical-align: middle; /* Vertical centering */
  display: table-cell; /* Required for vertical centering */
}

tr {
}

.selected-day {
  background: var(--second-color);
  color: white;
}
</style>
