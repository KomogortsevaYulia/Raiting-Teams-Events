<template>
  <!-- Навигация -->
  <div class="navigation wrapper-second__navigation border-block">
    <router-link :to="'/event-create'" v-if="can('can view directions')">
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Создать мероприятие
      </button>
    </router-link>

    <template v-for="(item, index) in itemList" :key="index">
      <a
        @click="selectItem(index)"
        v-if="item.permission"
        :class="{ active: index == selectedItem }"
        >{{ item.name }}</a
      >
    </template>
  </div>

  <!-- see events -->
  <div v-if="selectedItem === 0">
    <div class="events__container">
      <!-- Фильтр вдимый-->
      <div class="nav-collapse collapse" id="collapseCkecker">
        <div class="filters-block border-block">
          <!-- Боковое меню -->
          <CheckBox_Menu
            :menu_items="menu_items"
            :handle-event-set-filters="handleEventSetFilters"
            :handle-event-reset-filters="handleEventResetFilters"
          />
        </div>
      </div>

      <!-- Правая часть контейнера -->
      <div class="cards__container ms-md-4">
        <!-- Поисковые строки -->
        <div class="cards__search">
          <Search :handleTimerSearch="handleTimerSearch" />
          <Switch_toggle />
          <div class="d-md-none">
            <button
              type="button"
              class="btn-icon-rounded"
              data-bs-toggle="modal"
              data-bs-target="#filtersModal"
            >
              <font-awesome-icon class="ic" icon="filter" />
            </button>
          </div>
          <ModalFull modal-id="filtersModal">
            <template #header> Фильтры</template>
            <template #body>
              <!-- Боковое меню -->
              <CheckBox_Menu
                :menu_items="menu_items"
                :handle-event-set-filters="handleEventSetFilters"
                :handle-event-reset-filters="handleEventResetFilters"
              />
            </template>
          </ModalFull>
        </div>
        <div
          :class="[teamStore.layout ? 'wrapper-list' : 'wrapper-grid']"
          v-if="data && data.length > 0"
        >
          <div class="card border-block" v-for="event in data" :key="event.id">
            <div class="card__banner">
              <img
                :src="event.images"
                class="d-block"
                style="width: 100%; object-fit: cover"
              />
            </div>
            <router-link :to="'/event/' + event.id">
              <div class="card__content">
                <div class="card__event-name">{{ event.title }}</div>
                <div class="row g-1 my-2">
                  <Tag
                    v-for="(item, index) in event.tags"
                    class="col-auto me-2"
                    :text="item"
                    :key="index"
                  />
                </div>

                <div class="card__text">
                  <p v-if="event.description != null">
                    {{ event.description.slice(0, 150) }}
                  </p>
                  <p v-else>{{ event.description }}</p>
                  <!-- <div class="btn__container">
                  <button class="card__btn">Подать заявку</button>
                </div> -->
                </div>
              </div>
            </router-link>
          </div>
        </div>

        <div
          v-else-if="loading"
          class="d-flex align-items-center justify-content-center mt-4"
        >
          <Loading size-fa-icon="fa-3x" />
        </div>

        <Pagination
          :max-page="maxPages"
          :visible-pages="visiblePages"
          :handleEventChangePage="handleEventChangePage"
        />
      </div>
    </div>
  </div>

  <!-- see request for creation event -->
  <div v-if="selectedItem === 1">
    <EventsRequests />
  </div>

  <div v-if="selectedItem === 2">
    <UserEvents :idUser="permissions_store.user_id" />
  </div>
</template>

<script setup lang="ts">
import "@/assets/nav-second.scss"
import Switch_toggle from "@/components/Switch_toggle.vue";
import CheckBox_Menu from "@/components/CheckBox_Menu.vue";
import { useEventStore } from "@/store/events_store";
import { onBeforeMount, ref } from "vue";
import { usePermissionsStore } from "@/store/permissions_store";
import Pagination from "@/components/Pagination.vue";
import EventsRequests from "./EventsRequests.vue";
import { useTeamStore } from "@/store/team_store";
import ModalFull from "@/components/modals/ModalFull.vue";
import { Event } from "@/store/models/events.model";
import UserEvents from "../user/UserEvents.vue";
import Search from "@/components/Search.vue";
import Loading from "@/components/Loading.vue";
import Tag from "@/components/Tag.vue";

const eventStore = useEventStore();
const teamStore = useTeamStore();
const menu_items = eventStore.menu_items;
const permissions_store = usePermissionsStore();
const can = permissions_store.can;
const data = ref();

// загрузка
const loading = ref(false);

//pagination ---------------------------------------------------------------------
const limit = 5; //сколько  отображается на странице
const offset = ref(0); //сколько  пропустить прежде чем отобразить

const maxPages = ref(1);
const visiblePages = 7;
//pagination ---------------------------------------------------------------------

const itemList = [
  { name: "Главная", permission: true },
  { name: "Заявки на создание", permission: can("can edit status events") },
  { name: "Мои мероприятия", permission: can("can create events") },
];

const selectedItem = ref(0);
const findEventTxt = ref();

onBeforeMount(async () => {
  await fetchEvents();
});

async function handleTimerSearch(eventTxt: string) {
  findEventTxt.value = eventTxt;

  await fetchEvents();
}

const selectItem = (i: number) => {
  selectedItem.value = i;
};

async function fetchEvents() {
  loading.value = true;

  let event = new Event();
  event.limit = limit;
  event.offset = offset.value;
  event.search_text = findEventTxt.value;

  let d = await eventStore.fetchEvents(event);
  data.value = d[0];

  const eventsCount = d[1];
  maxPages.value = eventsCount >= limit ? Math.ceil(eventsCount / limit) : 1;
  loading.value = false;
}

async function handleEventChangePage(currentPage: number) {
  offset.value = (currentPage - 1) * limit;

  await fetchEvents();
}

// задать фильтры
async function handleEventSetFilters() {}

// сбросить фильтры
function handleEventResetFilters() {}
</script>

<style lang="scss" scoped>
.events__container {
  display: flex;
  padding-top: 1rem;

  .cards__container {
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
      padding-top: 1rem;

      .card {
        width: 100%;
        background-color: #fff;
        height: 15rem;
        margin-bottom: 1rem;
        display: flex;
        flex-direction: row;
        transition: all 0.5s;

        .card__banner {
          height: 100%;
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
          }

          .card__text {
            color: #373737;
          }

          .btn__container {
            display: flex;
            justify-content: right;
            margin-top: 1rem;

            .card__btn {
              background-color: #ff502f;
              color: #fff;
              padding: 0.8rem 2rem;
            }
          }
        }
      }

      .card:hover {
        cursor: pointer;
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
      }
    }

    .wrapper-grid {
      padding-top: 2rem;
      display: flex;
      flex-wrap: wrap;

      .card {
        width: 250px;
        background-color: #fff;
        height: 350px;
        margin: 0 1rem 1rem 0;
        flex-wrap: wrap;
        overflow: hidden;
        display: flex;
        // flex-direction: row;
        transition: all 0.5s;

        .card__banner {
          height: 15rem;
          width: 100%;
          max-width: 100%;
          flex-wrap: wrap;
          border-radius: 5px 0 0 0;
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
          }

          .card__text {
            color: #373737;
          }

          .btn__container {
            display: flex;
            justify-content: right;
            margin-top: 1rem;

            .card__btn {
              background-color: #ff502f;
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
  transition: all 0.5s;
}

.mainBanner:hover .descr {
  cursor: pointer;
  opacity: 1;
}

.navigation {
  border-radius: var(--border-radius);
  padding: 20px;
  background: white;
}

.filters-block {
  background-color: #fff;
  padding: 2rem;
  border-radius: var(--border-radius);
}
</style>
