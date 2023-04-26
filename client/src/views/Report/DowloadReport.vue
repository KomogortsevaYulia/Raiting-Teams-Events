<script setup lang="ts">
import type { Direction } from '@/store/enums/enum_event';
import type { TypeReport } from './enums_report';
import type { DirectionName } from '@/store/enums/enum_teams';
import { computed, onBeforeMount, ref } from 'vue';


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

const levelName = ref()

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

            <div class="row mt-4 mx-3 d-flex  justify-content-end">
              <button type="button" class="btn-custom-primary">
                Скачать
              </button>
            </div>


          </div>
        </div>
      </div>

    </div>
</template>

<style lang="scss"></style>