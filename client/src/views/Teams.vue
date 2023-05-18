<script setup lang="ts">

import Filter from '@/components/WIP.vue';
import ModalCreateTeam from '@/views/Modals/ModalCreateTeam.vue';
import Switch_toggle from '@/components/Switch_toggle.vue';
import { onBeforeMount, ref, watch } from 'vue';
import { usePermissionsStore } from '@/store/permissions_store';
import { useTeamStore } from "../store/team_store";
import CheckBox_Menu from '@/components/CheckBox_Menu.vue';
import _ from 'lodash';

const permissions_store = usePermissionsStore();
const teamStore = useTeamStore();

const can = permissions_store.can;
const menu_items = teamStore.menu_items;

const show = ref(true);
const data = ref()

// переключить на редактирвоание коллектива или на создание новаого
const isEditTeam = ref(false)
const teamEdit = ref()

const findTeamTxt = ref()

onBeforeMount(async () => {
  // вытащить коллективы из бд и отобразить их
  fetchTeams()
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
  let txt = findTeamTxt.value
  data.value = await teamStore.fetchTeamsSearch(txt, txt, txt)
}


const itemLink = [{ name: "Новости", path: "/news" }, { name: "Коллективы", path: "/teams" },]


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
      <CheckBox_Menu :menu_items="menu_items" />

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
          <div v-for="team in data" class="cardEvent">

            <router-link :to="'/team/' + team.id">
              <div class="card__banner">
                <img v-if="team.image.length > 0" :src="team.image" class="d-block"
                  style="width: 100%;object-fit: cover;">
                <img v-else src="@/assets/icon/empty_photo.jpg" class="d-block" style="width: 100%;object-fit: cover;">
              </div>
            </router-link>

            <div class="wrapperContent col ">
              <!-- <div class="card__event-name"> -->
              <div class="row mb-2">

                <div class="col ">
                  <router-link :to="'/team/' + team.id">
                    <div class="col-8"> {{ team.title }} </div>
                  </router-link>

                  <p class="fs-6 text-bg-danger" v-if="team != null && team.is_archive != null && team.is_archive"> (В
                    архиве)</p>
                </div>

                <div class="col-auto d-flex justify-content-end align-items-end">
                  <div @click="editTeam(true, team)" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <font-awesome-icon class="ic" icon="pencil-square" />
                  </div>
                </div>
                <!-- </div>
                  </div> -->

              </div>

              <!-- </div> -->

              <div class="row mb-2">
                <div class="row overflow-auto" style="max-height: 100px;">
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
        display: flex;
        flex-wrap: wrap;

        .cardEvent {
          box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
          width: 250px;
          height: 350px auto;
          margin: 0 1rem 1rem 0;
          flex-wrap: wrap;
          overflow: hidden;
          border-radius: 5px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          transition: all .5s;

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
          padding: 1rem;
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
        padding-top: 2rem;

        .cardEvent {
          width: 100%;
          background-color: #fff;
          height: 15rem;
          margin-bottom: 1rem;
          border: none;
          box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: row;
          transition: all .5s;

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
          padding: 2rem;
          
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
</style>