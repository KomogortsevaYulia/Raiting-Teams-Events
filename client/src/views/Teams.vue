<script setup lang="ts">


import Filter from '@/components/Filter.vue';
import ModalCreateTeam from '@/views/Modals/ModalCreateTeam.vue';
import { onBeforeMount, ref } from 'vue';
import TeamsForm from './TeamsForm.vue'

import { useTeamStore } from "../store/team_store"


const show = ref(true);
const layout = ref(true);


const data = ref()

onBeforeMount(async () => {
  // вытащить коллективы из бд и отобразить их
  fetchTeams()
})


// вытащить коллективы из бд 
async function fetchTeams() {
  data.value = await useTeamStore().fetchTeams()
}

const itemLink = [{ name: "Новости", path: "/news" }, { name: "Коллективы", path: "/teams" },]


</script>

<template>
  <!-- Это вся обертка -->
  <div class="wrapper-team">

    <!-- Навигация -->
    <div class="wrapper-team__navigation">
      <a @click="show = true" :class="{active: show}">Общий список</a>
      <!-- <a @click="show = false" :class="{ active: !show }">Создать коллектив</a> -->
      <ModalCreateTeam/>
    </div>
   
    <!-- Обертка карточек коллективов -->
    <div v-if="show" class="wrapper-team__content">

      <!-- Фильтр -->
      <div class="content-filter">
        <Filter />
      </div>

      <!-- Обертка контента с карточками -->
      <div class="content-cards">

        <!-- Инпут с поиском -->
        <div class="cards__search">
          <input placeholder="Начните поиск..." />
          <div class="search-toggle">
            <img @click="layout = true" :class="{ active: layout }" src="@/assets/icon/grid.png">
            <img @click="layout = false" :class="{ active: !layout }" src="@/assets/icon/list.png">
          </div>
        </div>
<!--  {{ data }}-->
        <!-- Сами карточки -->
        <div :class="[layout === true ? 'wrapper-grid' : 'wrapper-list']">


          <div v-for="team in data" class="card">
            <img :src="team.image">
            <div class="wrapper-content">
              <div>
                <a>{{ team.title }}</a>
                <p>{{ team.description }}</p>
                <p>Руководители: 
                    <span v-for="leader in (team.functions[0]).userFunctions">     
                        {{ leader.user.fullname}}<br>
                    </span>
                </p>
              </div>
              <div class="btn">
                <RouterLink to="/team-1">
                  <button>Подробнее</button>
                </RouterLink>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>

  </div>

</template>

<style lang="scss">
@import '@/assets/teams/teams.scss';
</style>