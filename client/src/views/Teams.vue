<script setup lang="ts">

import Filter from '@/components/Filter.vue';
import ModalCreateTeam from '@/views/Modals/ModalCreateTeam.vue';
import { onBeforeMount, ref } from 'vue';

import { useTeamStore } from "../store/team_store"
import { usePermissionsStore } from '@/store/permissions_store';

const permissions_store = usePermissionsStore();
const can = permissions_store.can;


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
      <a @click="show = true" :class="{ active: show }">Общий список</a>
      <!-- <a @click="show = false" :class="{ active: !show }">Создать коллектив</a> -->
      <ModalCreateTeam />
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
                <RouterLink to="/team-page">
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

<style lang="scss" scoped>
@import '../assets/globals.scss';

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
          width: 80%;
        }

        .search-toggle {
          display: flex;
          padding-left: 1rem;
          align-items: center;
          justify-content: center;

          img {
            cursor: pointer;
            padding-right: 1rem;
            transition: 0.3s;
            height: 28px;
            width: 28px;
            opacity: 0.5;

            &:hover {
              opacity: 1;
            }

            &:active {
              opacity: 0.5;
            }
          }

          .active {
            opacity: 1;
          }
        }
      }

      .card {
        display: flex;
        align-items: center;
        justify-content: center;
        border: var(--main-border-card);
        margin: 0 1rem 1rem 0;
        padding: 1rem;
        border-radius: 15px;

        a {
          cursor: pointer;
          text-align: center;
          font-size: 25px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        img {
          height: 150px;
          width: 150px;
          padding: 1rem;
          border-radius: 10rem;
        }
      }

      .wrapper-grid {
        display: flex;
        flex-wrap: wrap;

        .card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 35%;

          .wrapper-content {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .btn {
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
          }
        }
      }

      .wrapper-list {
        padding-bottom: 1rem;

        .card {
          width: 80%;
        }
      }
    }
  }

}
</style>