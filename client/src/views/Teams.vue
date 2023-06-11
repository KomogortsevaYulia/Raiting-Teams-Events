<script setup lang="ts">

import Filter from '@/components/WIP.vue';
import ModalCreateTeam from '@/views/Modals/ModalCreateTeam.vue';
import Switch_toggle from '@/components/Switch_toggle.vue';
import { onBeforeMount, ref, watch, type Ref } from 'vue';
import { usePermissionsStore } from '@/store/permissions_store';
import { useTeamStore } from "../store/team_store";
import CheckBox_Menu from '@/components/CheckBox_Menu.vue';
import _ from 'lodash';
import { DirectionName } from '@/store/enums/enum_teams';
import Pagination from '@/components/Pagination.vue';

const permissions_store = usePermissionsStore();
const teamStore = useTeamStore();

const can = permissions_store.can;
const menu_items = ref(_.cloneDeep(teamStore.menu_items));

const show = ref(true);
const data = ref()

// переключить на редактирвоание коллектива или на создание новаого
const isEditTeam = ref(false)
const teamEdit = ref()

const findTeamTxt = ref()

const filters = ref({
  directions: [0],
  is_archive: menu_items.value[2].menu_types[0].checked,
  is_active: menu_items.value[2].menu_types[1].checked,

})

// загрузка
const loading = ref(false)

//pagination ---------------------------------------------------------------------
const limit = 5 //сколько колелктивов отображается на странице
const offset = ref(0) //сколько коллективов пропустить прежде чем отобрад+зить

const maxPages = ref(1)
const visiblePages = 7
//pagination ---------------------------------------------------------------------


// найденные направления из системы
const foundDirections = ref([{ id: 0, shortname: "-", idDB: 0 }])           //дата

onBeforeMount(async () => {
  // вытащить коллективы из бд и отобразить их

  await getDirections()
  await handleEventSetFilters()

})


function editTeam(editT: boolean, team: any) {
  // редактируем колектив или создаем новый
  isEditTeam.value = editT
  teamEdit.value = team
}


const fetchTeamsTimer = _.debounce(() => {
  fetchTeams()
}, 300)


watch(findTeamTxt, () => {
  fetchTeamsTimer()
})


// вытащить коллективы из бд 
async function fetchTeams() {
  loading.value = true

  let txt = findTeamTxt.value
  let d = await teamStore.fetchTeamsSearch(txt, filters.value, limit, offset.value)

  data.value = d[0]

  const teamsCount = d[1]
  maxPages.value = teamsCount >= limit ? Math.ceil(teamsCount / limit) : 1

  loading.value = false
}


async function handleEventSetFilters() {

  menu_items.value.forEach((el) => {
    // el.menu_types.forEach((elType) => {
    switch (el.id) {
      case 1:

        break
      case 2:
        let directions: number[] = []
        // пройтись по элементам меню
        el.menu_types.forEach((elType) => {

          // пройтись по направлениям
          foundDirections.value.forEach((direction) => {
            let dir = -1

            if (elType.checked) {
              switch (elType.id) {
                case 1:
                  dir = direction.shortname == DirectionName.NID ? direction.idDB : -1
                  break
                case 2:
                  dir = direction.shortname == DirectionName.UD ? direction.idDB : -1
                  break
                case 3:
                  dir = direction.shortname == DirectionName.OD ? direction.idDB : -1
                  break
                case 4:
                  dir = direction.shortname == DirectionName.SD ? direction.idDB : -1
                  break
                case 5:
                  dir = direction.shortname == DirectionName.KTD ? direction.idDB : -1
                  break
              }
            }

            if (dir > 0)
              directions.push(dir)
          })

        })

        // задать выбранные направления
        filters.value.directions = directions
        break
      case 3:
        filters.value.is_archive = el.menu_types[0].checked
        filters.value.is_active = el.menu_types[1].checked
        break
    }
  })

  await fetchTeams()
}

// сбросить фильтры
function handleEventResetFilters() {
  menu_items.value = _.cloneDeep(teamStore.menu_items)
}

// получить идшники направлений с бд, чтобы по этим идшникам найти
// эти направления 
async function getDirections() {

  let data = await teamStore.fetchTeamsOfDirection(-1, "direction")

  let directions = data[0]
  let arrayData = []

  for (let i = 0; i < directions.length; i++) {
    let direction = directions[i]

    arrayData[i + 1] = { id: i + 1, shortname: direction.shortname, idDB: direction.id };
  }

  foundDirections.value = arrayData
}


async function handleEventChangePage(currentPage: number) {
  offset.value = (currentPage - 1) * limit

  await fetchTeams()
}

//const itemLink = [{ name: "Новости", path: "/news" }, { name: "Коллективы", path: "/teams" },]
</script>

<template>
  <!-- Это вся обертка -->
  <div class="wrapper-team">
    <!-- Навигация -->
    <div class="wrapper-team__navigation">
      <!-- <div v-if="can('can create teams')" class="mt-4"> -->
      <!-- Button trigger modal -->
      <button @click="editTeam(false, null)" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Создать коллектив
      </button>
      <ModalCreateTeam :is-edit-team="isEditTeam" :team="teamEdit" />

      <!-- </div> -->
      <!-- <a @click="show = true" :class="{ active: show }">Общий список</a>
                <div v-if="can('can create teams')" class="mt-4">
                  <ModalCreateTeam />
                </div> -->
    </div>

    <!-- Обертка карточек коллективов -->
    <div v-if="show" class="wrapper-team__content">



      <!-- Фильтр -->
      <CheckBox_Menu :menu_items="menu_items" :handleEventSetFilters="handleEventSetFilters"
        :handleEventResetFilters="handleEventResetFilters" />



      <!-- Обертка контента с карточками -->
      <div class="content-cards">

        <!-- Инпут с поиском -->
        <div class="cards__search">
          <input class="search-inp" placeholder="Начните поиск..." v-model="findTeamTxt" />
          <input placeholder="Выберите дату" type="date" />
          <div class="search-toggle">
            <Switch_toggle />
          </div>
        </div>
        <!--  {{ data }}-->

        <!-- Сами карточки -->
        <div :class="[teamStore.layout === true ? 'wrapper-list' : 'wrapper-grid']">
          <div v-if="!loading" v-for="team in data" class="cardEvent row  justify-content-center">

            <router-link class=" col-lg-auto p-0 col-md-auto d-flex justify-content-center" :to="'/team/' + team.id">
              <div class="card__banner">
                <img v-if="team.image.length > 0" :src="team.image" class="d-block"
                  style="width: 100%;object-fit: cover;">
                <img v-else src="@/assets/icon/empty_photo.jpg" class="d-block" style="width: 100%;object-fit: cover;">
              </div>
            </router-link>

            <div class=" col-lg col-md-auto p-4 overflow-hidden">
              <div class="wrapperContent">
                <!-- <div class="card__event-name"> -->
                <div class="row mb-2">

                  <!-- team title -->
                  <div class="col p-0">
                    <router-link :to="'/team/' + team.id">
                      <div v-if="team.title && team.title.length > 50" class="cardTitle">
                      {{ team.title.slice(0, 50)}} ... </div>
                      <div v-else class="cardTitle"> {{ team.title }}</div>
                    </router-link>

                    <p class="fs-6 text-bg-danger" v-if="team != null && team.is_archive != null && team.is_archive"> (В
                      архиве)</p>
                  </div>

                  <div class="col-auto d-flex justify-content-end align-items-end">
                    <div @click="editTeam(true, team)" type="button" data-bs-toggle="modal"
                      data-bs-target="#exampleModal">
                      <font-awesome-icon class="ic" icon="pencil-square" />
                    </div>
                  </div>
                </div>
                <!-- </div>
                  </div> -->



                <!-- </div> -->

                <div class="row mb-2">
                  <div class="row" style="max-height: 100px;">
                    <div class="navigation-tags row g-1">
                      <div v-for="el in team.tags" class="teg col-auto">{{ el }}</div>
                    </div>
                    <div class="row">
                      {{ team.short_description }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <font-awesome-icon v-else icon="circle-notch" class="fas fa-spin fa-xl m-5 loading" />

        </div>

        <Pagination :max-page="maxPages" :visible-pages="visiblePages" :handleEventChangePage="handleEventChangePage" />

      </div>

    </div>


  </div>
</template>

<style lang="scss" scoped>
.wrapper-team {
  display: block;
  width: 100%;
  justify-content: center;

  .wrapper-team__navigation {
    padding-bottom: 1rem;
    width: 100%;

    a {
      // cursor: pointer;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 14px;
      text-decoration: none;
      transition: 0.3s;
      color: #348498;
      margin-inline: 1rem;
      padding-bottom: 5px;

      &:hover {
        color: var(--main-color);
      }
    }

    // Первому элементу ставим отступ = 0, чтобы не выпирал
    a:first-child {
      margin-left: 0;
    }

    .active {
      color: var(--main-color);
      border-bottom: var(--main-border-bottom);
    }
  }


  .wrapper-team__content {
    display: flex;
    height: 100%;
    width: 100% auto;


    .content-filter {
      border-radius: 15px;
      border: var(--main-border-card);
      height: 300px;
      width: 15rem;
    }

    .content-cards {
      margin-left: 2rem;
      width: 80%;

      .cards__search {
        display: flex;
        justify-content: space-between;
        // padding-bottom: 1rem;

        .search-inp {
          width: 70%;
        }

        input {
          // margin: 0;
          // height: 40px;
          // width: 80%;
        }

        .search-toggle {
          display: flex;
          padding-left: 1rem;
        }
      }

      .wrapper-grid {
        padding-top: 1rem;
        display: flex;
        flex-wrap: wrap;

        .cardEvent {
          border-radius: 5px;
          overflow: hidden;
          box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
          width: 250px;
          height: 350px auto;
          margin: 0 1rem 1rem 0;
          flex-wrap: wrap;
          overflow: hidden;
          border-radius: 5px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          transition: all .5s;

          .cardTitle {
            color: #373737;
            font-size: 1.2rem;

            &:hover {
              color: var(--main-color-hover);
            }

            &:active {
              color: var(--main-color);
            }
          }

          a {
            color: #000;
          }
        }

        .card__banner {
          cursor: pointer;
          height: 15rem;
          max-width: 15rem;
          width: 100%;
          max-width: 100%;
          flex-wrap: wrap;
          border-radius: 5px 0 0 0;
          width: 100%;
          overflow: hidden;
          background-position: center;
          display: flex;
        }

        .cardEvent:hover {
          box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);

        }



        .imgEvent {
          position: relative;
          height: 13rem;
          overflow: hidden;

          p {
            font-weight: 100;
            font-size: 1.4rem;
            margin: 4rem 0 0 1rem;
            color: #fff;
            position: absolute;
          }

          div {
            width: 100%;
            height: 13rem;
            background-color: rgba(0, 0, 0, 0.295);
            position: absolute;
          }

          img {
            width: 100%;
          }

        }

        .wrapperContent {

          margin: 10px;
          width: 100%;

          .navigation-tags {
            // flex-wrap: wrap;
            // padding-bottom: 1rem;
            // display: flex;
            // width: max-content;

            .teg {
              margin-right: 1rem;
              margin-bottom: 1rem;
              background-color: #B7EAED;
              padding: 0.2rem 1rem;
              color: #348498;
              border-radius: 5px;
            }

            .teg:last-child {
              margin-bottom: 0;
            }
          }

          .date {
            text-align: end;
            font-size: 1.6rem;
            font-weight: 100;
          }
        }

      }




      .wrapper-list {

        .cardEvent {
          margin: 1rem 0;
          border-radius: 5px;
          overflow: hidden;
          width: 100%;
          background-color: #fff;
          height: 15rem;
          margin-bottom: 1rem;
          border: none;
          box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: row;
          transition: all .5s;

          .cardTitle {
            color: #373737;
            font-size: 1.2rem;

            &:hover {
              color: var(--main-color-hover);
            }

            &:active {
              color: var(--main-color);
            }
          }

          .card__banner {
            height: 100%;
            width: 15rem;
            max-width: 15rem;
            border-radius: 5px 0 0 0;
            width: 100%;
            overflow: hidden;
            background-position: center;
            display: flex;
          }
        }

        .ic {
          width: 30px;
          height: 30px;
          color: grey;

          &:hover {
            transition: 0.4s;
            color: var(--main-color-hover);
          }
        }

        .card__event-name {
          color: #373737;
          font-size: 1.2rem;
          width: 100%;
        }

        .cardEvent:hover {

          box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
        }

        .wrapperContent {
          width: 100%;

          p {
            color: #000;
          }

          .navigation-tags {
            margin-top: 0.5rem;
            padding-bottom: 1rem;


            .teg {
              margin-right: 1rem;
              background-color: #B7EAED;
              padding: 0.2rem 1rem;
              color: #348498;
              border-radius: 5px;
            }
          }

          .date {
            text-align: end;
            font-size: 1.6rem;
            font-weight: 100;
          }
        }

      }
    }
  }

}

@media (max-width: 992px) {


  .cardEvent {
    height: 25rem !important;

  }

  .card__banner {
    max-width: 100% !important;
    max-height: 15rem !important;
  }

}
</style>