<script setup  lang="ts">
import type { Direction } from '@/store/enums/enum_event';
import type { TypeReport } from './enums_report';
import type { DirectionName } from '@/store/enums/enum_teams';
import { computed, onBeforeMount, ref, watch } from 'vue';
import { useEventStore } from '@/store/events_store';

const eventStore = useEventStore();

const props = defineProps<{
  direction: {
    id: number;
    shortname: string;
    idDB: number;
    idDirectionEvent: Direction;
  },
  typeReport: TypeReport,
  levels: {
    id: number;
    name: string;
  }[],
  level: {
    id: number;
    name: string;
  },
  typeEvent: {
    id: number;
    name: string;
  },
  types: {
    id: number;
    name: string;
  }[],
  dateRange: { start: Date, end: Date }
}>()

const resFile = ref()
const fileURL = ref()


async function getReportEventsOfDirection() {
  let res = await eventStore.getReportEventsOfDirection(props.direction.id, props.dateRange.start,
    props.dateRange.end, props.level.id, props.typeEvent.id)
  resFile.value = res.data
}


async function downloadFile() {
  //const byteArray = new Uint8Array(resFile.value);
  const file = new Blob([resFile.value], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  fileURL.value = URL.createObjectURL(file);
}

</script>


<template lang="">

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
              <div class="col">{{direction.shortname}}</div>
            </div>

            <div class="row my-3">
              <div class="col"> вид отчета: </div>
              <div class="col"> {{ typeReport }}</div>
            </div>

            <!-- <div class="row  my-3">
              <div class="col"> колективы:</div>
              <div class="col"> {{ teams}}</div>
            </div> -->

            <div class="row  my-3">
              <div class="col"> уровень мероприятия: </div>
              <div class="col">{{ level.name  }}</div>
            </div>

            <div class="row  my-3">
              <div class="col"> тип мероприятия: </div>
              <div class="col"> {{ typeEvent.name }}</div>
            </div>

            <div class="row  my-3">
              <div class="col"> дата:</div>
              <div class="col"> {{ dateRange.start.toLocaleDateString() }} - {{ dateRange.end.toLocaleDateString() }}</div>
            </div>

            <div class="row g-2 mt-4 mx-3 d-flex  justify-content-end ">
              <div class="col d-flex justify-content-end">
                <a v-if="resFile" :href="fileURL" download="reportEvents.xlsx">
               <button @click="downloadFile()"> <font-awesome-icon icon="file-download" /></button>
               </a>
              </div>
              <div class="col-auto d-flex justify-content-end">
                <button type="button"  @click="getReportEventsOfDirection">
                Сформировать
              </button>
              </div>
             
            </div>


          </div>
        </div>
      </div>

    </div>
</template>

<style lang="scss"></style>