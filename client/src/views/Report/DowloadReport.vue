<script setup lang="ts">
import type { TypeReport } from '@/store/enums/enums_report';


const props = defineProps<{
    direction: {
        id: number;
        data: string;
    },
    eventOrTeam: TypeReport,
    teams: string,
    level: {
        id: number;
        data: string;
    },
    typeEvent: {
        id: number;
        data: string;
    },
    date: any
}>()


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
              <div class="col">{{direction.data}}</div>
            </div>

            <div class="row my-3">
              <div class="col"> вид: </div>
              <div class="col"> {{ eventOrTeam.data }}</div>
            </div>

            <div class="row  my-3">
              <div class="col"> колективы:</div>
              <div class="col"> {{ teams}}</div>
            </div>

            <div class="row  my-3">
              <div class="col"> уровень: </div>
              <div class="col">{{  level.data }}</div>
            </div>

            <div class="row  my-3">
              <div class="col"> тип мероприятия: </div>
              <div class="col"> {{ typeEvent.data }}</div>
            </div>

            <div class="row  my-3">
              <div class="col"> дата:</div>
              <div class="col"> 01.01.2023 - 01.02.2023</div>
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