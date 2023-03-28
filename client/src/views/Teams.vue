<script setup lang="ts">

import Filter from '@/components/Filter.vue';
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
      <a @click="show = true" :class="{ active: show }">Общий список</a>
      <!-- <a @click="show = false" :class="{ active: !show }">Создать коллектив</a> -->
      <ModalCreateTeam />
    </div>

    <!-- Обертка карточек коллективов -->
    <div v-if="show" class="wrapper-team__content">

      <!-- Фильтр -->
      <CheckBox_Menu :menu_items = "menu_items"/>

    <!-- Обертка контента с карточками -->
    <div class="content-cards">

      <!-- Инпут с поиском -->
      <div class="cards__search">
        <input placeholder="Начните поиск..." />
        <div class="search-toggle">
          <Switch_toggle />
        </div>
        </div>
        <!--  {{ data }}-->


        <!-- Сами карточки -->
        <div :class="[teamStore.layout === true ? 'wrapper-grid' : 'wrapper-list']">
          <div v-for="team in data" class="cardEvent">
            <div class="imgEvent">
              <div></div>
              <p>{{ team.title }}</p>
              <img :src="team.image">
            </div>
            <div class="wrapperContent">
              <div>
                <p>{{ team.description }}</p>
                <!-- <p class="date">06.04.2021</p> -->
              </div>
            </div>
            <!-- <img class="imgTeams" width="250" height="145" :src="team.image"> -->
            <!-- <div class="wrapper-content">
                                                <a>{{ team.title }}</a>
                                                <p>{{ team.description }}</p>
                                                <p>Руководители:
                                                  <span v-for="leader in (team.functions[0]).userFunctions">
                                                    {{ leader.user.fullname }}<br>
                                                  </span>
                                                </p>
                                                <div class="btn">
                                                  <RouterLink to="/team-page">
                                                    <button>Подробнее</button>
                                                  </RouterLink>
                                                </div>
                                              </div> -->
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
// @import '../assets/globals.scss';

.wrapper-team {
  display: block;
  width: 100%;
  justify-content: center;

  .wrapper-team__navigation {
    padding-bottom: 2rem;
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
    height: 600px;
    width: 100%;

    .content-filter {
      border-radius: 15px;
      border: var(--main-border-card);
      height: 300px;
      width: 15rem;
    }

    .content-cards {
      padding-left: 2rem;
      width: 80%;

      .cards__search {
        display: flex;
        padding-bottom: 1rem;

        input {
          margin: 0;
          // height: 40px;
          width: 80%;
        }

        .search-toggle {
          display: flex;
          padding-left: 1rem;
          // align-items: center;
          // justify-content: center;

          // img {
          //   cursor: pointer;
          //   padding-right: 1rem;
          //   transition: 0.3s;
          //   height: 28px;
          //   width: 28px;
          //   opacity: 0.5;

          //   &:hover {
          //     opacity: 1;
          //   }

          //   &:active {
          //     opacity: 0.5;
          //   }
          // }

          // .active {
          //   opacity: 1;
          // }
        }
      }

      .wrapper-grid {
        display: flex;
        flex-wrap: wrap;

        .cardEvent {
          box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
          width: 250px;
          height: 350px;
          margin: 0 1rem 1rem 0;
          flex-wrap: wrap;
          overflow: hidden;
          border-radius: 5px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          transition: all .5s;
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

          .date {
            text-align: end;
            font-size: 1.6rem;
            font-weight: 100;
          }
        }

      }

      .wrapper-list {
        display: flex;
        flex-wrap: wrap;

        .cardEvent {
          box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
          width: 830px;
          height: 350px;
          margin: 0 1rem 1rem 0;
          flex-wrap: wrap;
          overflow: hidden;
          border-radius: 5px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          transition: all .5s;
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