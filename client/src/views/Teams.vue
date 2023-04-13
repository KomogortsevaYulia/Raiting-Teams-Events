<script setup lang="ts">

import Filter from '@/components/WIP.vue';
import ModalCreateTeam from '@/views/Modals/ModalCreateTeam.vue';
import Switch_toggle from '@/components/Switch_toggle.vue';
import { onBeforeMount, ref } from 'vue';
import { usePermissionsStore } from '@/store/permissions_store';
import { useTeamStore } from "../store/team_store";
import CheckBox_Menu from '@/components/CheckBox_Menu.vue';

const permissions_store = usePermissionsStore();
const teamStore = useTeamStore();

const can = permissions_store.can;
const menu_items = teamStore.menu_items;

const show = ref(true);
const data = ref()

onBeforeMount(async () => {
  // вытащить коллективы из бд и отобразить их
  fetchTeams()
})


// вытащить коллективы из бд 
async function fetchTeams() {
  data.value = await teamStore.fetchTeams()
}

const itemLink = [{ name: "Новости", path: "/news" }, { name: "Коллективы", path: "/teams" },]


</script>

<template>
  <!-- Это вся обертка -->
  <div class="wrapper-team">

    <!-- Навигация -->
    <div class="wrapper-team__navigation">
      <!-- <div v-if="can('can create teams')" class="mt-4"> -->
        <ModalCreateTeam />
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
          <input class="search-inp" placeholder="Начните поиск..." />
          <input placeholder="Выберите дату" type="date" />
          <div class="search-toggle">
            <Switch_toggle />
          </div>
        </div>
        <!--  {{ data }}-->


        <!-- Сами карточки -->
        <div :class="[teamStore.layout === true ? 'wrapper-list' : 'wrapper-grid']">
          <div v-for="team in data" class="cardEvent">
            <div class="card__banner">
              <img :src="team.image" class="d-block" style="width: 100%;object-fit: cover;">
            </div>
            <router-link :to="'/team/' + team.id">
              <div class="wrapperContent">
                <div class="card__event-name">{{ team.title }}</div>
                <div class="navigation-tags">
                  <div v-for="el in team.tags" class="teg">{{ el }}</div>
                </div>
                <p>{{ team.short_description }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/globals.scss';

.wrapper-team {
  display: block;
  width: 100%;
  justify-content: center;

  .wrapper-team__navigation {
    padding-bottom: 1rem;
    width: 100%;

    a {
      cursor: pointer;
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
          cursor: pointer;
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

          .navigation-tags {
            flex-wrap: wrap;
            padding-bottom: 1rem;
            display: flex;

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

        .card__event-name {
          color: #373737;
          font-size: 1.2rem;
        }

        .cardEvent:hover {
          cursor: pointer;
          box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
        }

        .wrapperContent {
          padding: 2rem;

          p {
            color: #000;
          }

          .navigation-tags {
            margin-top: 0.5rem;
            padding-bottom: 1rem;
            display: flex;

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