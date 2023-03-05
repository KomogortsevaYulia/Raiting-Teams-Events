<script setup lang="ts" >
import { ref } from 'vue';
import BarChart from '@/components/Charts/BarJoininTheTeamDirections.vue';

const labels = ['НИД', 'КТД', 'СД', 'ОД', 'УД']
const data = [2, 5, 8, 8, 9]

const show = ref(true);
</script>

<template>
  <!-- Это вся обертка -->
  <div class="wrapper-team">

    <!-- Навигация -->
    <div class="wrapper-team__navigation">
      <a @click="show = true" :class="{ active: show }">Статистика</a>
      <a @click="show = false" :class="{ active: !show }">Отчетность</a>
      <ModalCreateTeam />
    </div>

    <!-- Обертка карточек коллективов -->
    <div v-if="show" class="wrapper-team__content chart">
      
        <BarChart :labels="labels" :data="data" />
      

    </div>

  </div>
</template>

<style lang="scss">
@import '@/assets/teams/teams.scss';

</style>