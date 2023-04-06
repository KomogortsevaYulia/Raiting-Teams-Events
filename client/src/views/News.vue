<template>
  <router-link :to="'/event-create'" v-if="can('can view directions')" >
    <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Создать мероприятие
    </button>
  </router-link>


  <div>
    <!-- <div class="full-width">
      <div class="mainBanner">
        <span class="descr">
          Надо что-то написать
          <button class="bannerBtn">Нажми меня</button>
        </span>
      </div>
    </div> -->
    <div class="events__container">
      <!-- Боковое меню -->
      <CheckBox_Menu :menu_items="menu_items" />
      <!-- Правая часть контейнера -->
      <div class="cards__container">
        <!-- Поисковые строки -->
        <div class="cards__search">
          <input class="title__search" placeholder="Начните поиск..." />
          <input class="date__search" placeholder="Выберите дату" type="date" />
          <Switch_toggle />
        </div>
        <div :class="[teamStore.layout === true ? 'wrapper-list' : 'wrapper-grid']" v-if="data.length  > 0">
          <div class="card" v-for="event in data" :key="event.id">
            <div class="card__banner">
              <img :src="event.images" class="d-block" style="width: 100%;object-fit: cover;">
            </div>
            <router-link :to="'/event/' + event.id">
              <div class="card__content">
                <div class="card__event-name">{{ event.title }}</div>
                <div class="teg__container">
                  <div v-for="el in event.tags" class="teg">{{ el }}</div>
                </div>
                <div class="card__text">{{ event.description.slice(0, 150) }}</div>
                <!-- <div class="btn__container">
                  <button class="card__btn">Подать заявку</button>
                </div> -->
              </div>
            </router-link>
          </div>
        </div>
        <div>
          Постов нет
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Switch_toggle from '@/components/Switch_toggle.vue';
import CheckBox_Menu from '@/components/CheckBox_Menu.vue';
import { useEventStore } from "@/store/events_store";
import { useTeamStore } from "../store/team_store";
import { onBeforeMount, ref } from 'vue';
import { usePermissionsStore } from '@/store/permissions_store';
const eventStore = useEventStore();
const teamStore = useTeamStore();
const menu_items = eventStore.menu_items;
const permissions_store = usePermissionsStore();
const can = permissions_store.can;
const data = ref()
onBeforeMount(async () => {
  fetchEvents()
})
async function fetchEvents() {
  data.value = await eventStore.fetchEvents()
}
</script>

<style lang="scss" scoped>
.events__container {
  display: flex;
  padding-top: 1rem;

  .cards__container {
    margin-left: 2rem;
    width: 100%;

    .cards__search {
      display: flex;
      justify-content: space-between;

      .title__search {
        width: 70%;
      }
    }

    .cards__wrap {
      background-color: #fff;
      width: 10%;
    }

    .wrapper-list {
      padding-top: 2rem;

      .card {
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
          border-radius: 5px 0 0 5px;
          width: 100%;
          overflow: hidden;
          background-position: center;
          display: flex;
        }

        .card__content {
          padding: 2rem;
          width: 100%;

          .card__event-name {
            color: #373737;
            font-size: 1.2rem;
          }

          .teg__container {
            display: flex;
            padding-bottom: 1rem;
            margin-top: 0.5rem;

            .teg {
              margin-right: 1rem;
              background-color: #B7EAED;
              padding: 0.2rem 1rem;
              color: #348498;
              border-radius: 5px;
            }
          }

          .card__text {
            color: #373737;
          }

          .btn__container {
            display: flex;
            justify-content: right;
            margin-top: 1rem;

            .card__btn {
              background-color: #FF502F;
              color: #fff;
              padding: 0.8rem 2rem;
            }
          }
        }
      }

      .card:hover {
        cursor: pointer;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
      }
    }

    .wrapper-grid {
      padding-top: 2rem;
      display: flex;
      flex-wrap: wrap;

      .card {
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
        width: 250px;
        background-color: #fff;
        height: 350px auto;
        margin: 0 1rem 1rem 0;
        flex-wrap: wrap;
        overflow: hidden;
        border: none;
        display: flex;
        // flex-direction: row;
        transition: all .5s;

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

        .card__content {
          padding: 2rem;
          width: 100%;
          flex-wrap: wrap;

          .card__event-name {
            color: #373737;
            font-size: 1.2rem;
          }

          .teg__container {
            display: flex;
            margin-top: 0.5rem;

            .teg {
              margin-right: 1rem;
              background-color: #B7EAED;
              padding: 0.2rem 1rem;
              color: #348498;
              border-radius: 5px;
            }
          }

          .card__text {
            color: #373737;
          }

          .btn__container {
            display: flex;
            justify-content: right;
            margin-top: 1rem;

            .card__btn {
              background-color: #FF502F;
              color: #fff;
              padding: 0.8rem 2rem;
            }
          }
        }
      }

      .card:hover {
        cursor: pointer;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
      }
    }
  }
}

.full-width {
  position: relative;
  margin-top: -1.5em;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.mainBanner {
  display: flex;
  width: 100%;
  overflow: hidden;
  height: 15rem;
  background-image: url("../assets/icon/banner.png");
  position: relative;
}

.bannerBtn {
  background-color: #fff;
  width: 10rem;
  border-radius: 2rem;
  right: 50px;
}

.descr {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding-top: 4rem;
  padding-left: 30rem;
  text-align: center;
  opacity: 0;
  transition: all .5s;
}

.mainBanner:hover .descr {
  cursor: pointer;
  opacity: 1;
}
</style>