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
        <div class="row g-2">
          <div class="col">
            <Search :handleTimerSearch="handleTimerSearch" />
          </div>
          <div class="col-auto">
            <Switch_toggle
              :on-event-change-state="handleEventChangeStateLayout"
            />
          </div>

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
          :class="[stateLayout ? 'wrapper-list' : 'wrapper-grid']"
          v-if="data && data.length > 0"
        >
          <div
            class="card border-block row-cols-auto"
            v-for="event in data"
            :key="event.id"
          >
            <div class="p-0 col-md-auto d-flex justify-content-center">
              <div class="card__banner">
                <img
                  v-if="event.images"
                  :src="event.images"
                  class="d-block"
                  style="width: 100%; object-fit: cover"
                  alt=""
                />
                <img
                  v-else
                  src="@/assets/icon/empty_photo.jpg"
                  class="d-block"
                  style="width: 100%; object-fit: cover"
                 alt=""/>
              </div>
            </div>
            <div class="wrapper col-lg col-md-auto px-4 py-4">
              <router-link :to="'/event/' + event.id">
                <div class="card__content">
                  <div class="row g-2">
                    <div class="col-12">
                      <div class="card__event-name">{{ event.title }}</div>
                    </div>
                    <div class="col-12">
                      <div class="row g-1 my-2">
                        <Tag
                          v-for="(item, index) in event.tags"
                          class="col-auto me-2"
                          :text="item"
                          :key="index"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <div
          v-else-if="loading"
          class="d-flex align-items-center justify-content-center mt-4"
        >
          <LoadingElem size-fa-icon="fa-3x" />
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
import "@/assets/nav-second.scss";
import Switch_toggle from "@/components/Buttons/SwitchToggle.vue";
import CheckBox_Menu from "@/components/CheckBoxMenu.vue";
import { useEventStore } from "@/store/events_store";
import { onBeforeMount, ref } from "vue";
import { usePermissionsStore } from "@/store/permissions_store";
import Pagination from "@/components/PaginationElem.vue";
import EventsRequests from "./EventsRequests.vue";
import ModalFull from "@/components/modals/ModalFull.vue";
import type { IEventSearch } from "@/store/models/event/events.model";
import UserEvents from "../user/UserEvents.vue";
import Search from "@/components/SearchField.vue";
import { Status, Type } from "@/store/enums/enum_event";
import Tag from "@/components/TagElem.vue";
import LoadingElem from "@/components/LoadingElem.vue";

const eventStore = useEventStore();
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
const visiblePages = 5;
//pagination ---------------------------------------------------------------------

const itemList = [
  { name: "Главная", permission: true },
  { name: "Заявки на создание", permission: can("can edit status events") },
  { name: "Мои мероприятия", permission: can("can create events") },
];

const selectedItem = ref(0);
const findEventTxt = ref();

const stateLayout = ref();

onBeforeMount(async () => {
  await fetchEvents();
});

function handleEventChangeStateLayout(stateL: boolean) {
  stateLayout.value = stateL;
}

async function handleTimerSearch(eventTxt: string) {
  findEventTxt.value = eventTxt;

  await fetchEvents();
}

const selectItem = (i: number) => {
  selectedItem.value = i;
};

async function fetchEvents() {
  loading.value = true;

  let event: IEventSearch = {
    limit: limit,
    offset: offset.value,
    search_text: findEventTxt.value,
    type: Type.OUTSIDE,
    status: Status.ACCEPTED,
  };

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
async function handleEventSetFilters() {
  // TODO document why this async function 'handleEventSetFilters' is empty
}

// сбросить фильтры
function handleEventResetFilters() {
  // TODO document why this function 'handleEventResetFilters' is empty
}
</script>

<style lang="scss" scoped>
.card {
}

.events__container {
  display: flex;
  padding-top: 1rem;

  .cards__container {
    width: 100%;

    .wrapper {
      width: fit-content;
      height: fit-content;
    }

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

    //list
    .wrapper-list {
      padding-top: 1rem;


      .card {
        &::-webkit-scrollbar {
          display: none;
        }

        margin: 1rem 0;
        border-radius: var(--border-radius);
        overflow: hidden;
        background-color: #fff;
        height: 15rem;
        width: 100%;

        display: flex;
        flex-direction: row;
        transition: all 0.5s;

        .card__banner {
          height: 100%;
          width: 15rem;
          border-radius: 5px 0 0 5px;
          overflow: hidden;
          background-position: center;
          display: flex;
        }

        .card__content {
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

    //grid
    .wrapper-grid {
      padding-top: 1rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      .card {
        &::-webkit-scrollbar {
          display: none;
        }

        background: white;
        border-radius: var(--border-radius);
        overflow: auto;
        width: 250px;
        height: 350px;
        margin: 0 1rem 1rem 0;
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
        box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.3);
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
  background-image: url("@/assets/icon/banner.png");
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

@media (max-width: 992px) {
  .wrapper-list {
    .card__banner {
      display: none !important;
    }
    .card{
      height: auto !important;
    }
  }
}
</style>
