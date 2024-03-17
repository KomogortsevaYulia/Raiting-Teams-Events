<template>
    <!-- Это вся обертка -->
    <div class="wrapper-team">
        <!-- Навигация -->
        <div class="wrapper-team__navigation">
            <!-- создание коллектива -->
            <div v-if="can('can create teams')">
                <!-- Button trigger modal -->
                <button
                        @click="editTeam(false, null)"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#editTeamModal"
                >
                    Создать коллектив
                </button>
                <ModalCreateTeam
                        :is-edit-team="isEditTeam"
                        :team-id="teamId"
                        :on-save-changes="handleModalSaveChanges"
                        id="editTeamModal"/>
            </div>
        </div>

        <!-- Обертка карточек коллективов -->
        <div v-if="show" class="wrapper-team__content">
            <!-- Фильтр вдимый-->
            <div class="nav-collapse collapse" id="collapseCkecker">
                <div class="filters-block border-block">
                    <CheckBox_Menu
                            :menu_items="menu_items"
                            :handleEventSetFilters="handleEventSetFilters"
                            :handleEventResetFilters="handleEventResetFilters"
                    />
                </div>
            </div>

            <!-- Обертка контента с карточками -->
            <div class="content-cards ms-md-4">
                <!-- Инпут с поиском -->
                <div class="cards__search">
                    <div class="row g-0">
                        <div class="col">
                            <Search :handleTimerSearch="handleTimerSearch"/>
                        </div>

                        <div class="col-auto">
                            <Switch_toggle
                                    :on-event-change-state="handleEventChangeStateLayout"
                            />
                        </div>

                        <!-- фильтры в модальнос окне -->
                        <div class="col-auto">
                            <div class="d-md-none">
                                <button
                                        type="button"
                                        class="btn-icon-rounded"
                                        data-bs-toggle="modal"
                                        data-bs-target="#filtersModal"
                                >
                                    <font-awesome-icon class="ic fa-lg" icon="filter"/>
                                </button>
                            </div>

                            <ModalFull modal-id="filtersModal">
                                <template #header> Фильтры</template>
                                <template #body>
                                    <CheckBox_Menu
                                            :menu_items="menu_items"
                                            :handleEventSetFilters="handleEventSetFilters"
                                            :handleEventResetFilters="handleEventResetFilters"
                                    />
                                </template>
                            </ModalFull>
                        </div>
                    </div>
                </div>

                <!-- Сами карточки -->
                <div :class="[stateLayout ? 'wrapper-list' : 'wrapper-grid']">
                    <div
                            v-for="team in data"
                            :class="[{ archive: team.is_archive }]"
                            class="cardEvent border-block row justify-content-center position-relative"
                            v-bind:key="team.id"
                    >
                        <!-- edit -->
                        <div v-if="can('can create teams')"
                             class="opacity-75 position-absolute w-auto top-0 end-0 p-2">
                            <div
                                    @click="editTeam(true, team)"
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editTeamModal"
                            >
                                <font-awesome-icon
                                        class="ic fa-1x btn-icon btn-icon-rounded"
                                        icon="pen-to-square"
                                />
                            </div>
                        </div>
                        <div class="p-0 col-md-auto d-flex justify-content-center">
                            <router-link :to="'/team/' + team.id">
                                <div class="card__banner">
                                    <img
                                            v-if="team?.image && team.image?.length > 0"
                                            :src="team?.image[0]"
                                            class="d-block"
                                            style="width: 100%; object-fit: cover"
                                            alt=""
                                    />
                                    <img
                                            v-else
                                            src="@/assets/icon/empty_photo.jpg"
                                            class="d-block"
                                            style="width: 100%; object-fit: cover"
                                            alt=""
                                    />
                                </div>
                            </router-link>
                        </div>

                        <div class="wrapperContent col-lg col-md-auto px-4 py-4">

                            <div class="row mb-2 g-2">
                                <!-- team title -->
                                <div class="col p-0">
                                    <div class="row g-2">
                                        <!-- набор -->
                                        <div class="col-12">
                                            <router-link :to="'/team/' + team.id">
                        <span
                                v-if="team.title && team.title.length > 50"
                                class="cardTitle"
                        >
                          {{ team.title.slice(0, 50) }} ...
                        </span>
                                                <span v-else class="cardTitle">{{ team.title }}</span>
                                            </router-link>
                                        </div>

                                        <div class="col-auto">
                      <span v-if="team.set_open" class="set set__open">
                        Набор открыт
                      </span>
                                            <span class="set set__closed" v-else> Набор закрыт</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-2 g-2">
                                <div class="navigation-tags my-2 row g-1">
                                    <Tag
                                            v-for="(item, index) in team.tags"
                                            class="col-auto me-1"
                                            :text="item"
                                            :key="index"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                            v-if="loading"
                            class="d-flex align-items-center justify-content-center mt-4"
                    >
                        <LoadingElem size-fa-icon="fa-3x"/>
                    </div>
                </div>

                <Pagination
                        :max-page="maxPages"
                        :visible-pages="visiblePages"
                        :handleEventChangePage="handleEventChangePage"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Switch_toggle from "@/components/Buttons/SwitchToggle.vue";
import {onBeforeMount, ref} from "vue";
import {usePermissionsStore} from "@/store/permissions_store";
import CheckBox_Menu from "@/components/CheckBoxMenu.vue";
import _ from "lodash";
import {DirectionName} from "@/store/enums/enum_teams";
import Pagination from "@/components/PaginationElem.vue";
import {useTeamStore} from "@/store/team_store";
import ModalCreateTeam from "@/components/modals/ModalCreateTeam.vue";
import {FilterTeam} from "@/store/models/teams/filter-teams.model";
import ModalFull from "@/components/modals/ModalFull.vue";
import Search from "@/components/SearchField.vue";
import Tag from "@/components/TagElem.vue";
import type {ITeam} from "@/store/models/teams/team.model";
import type {Ref} from "vue";
import LoadingElem from "@/components/LoadingElem.vue";

const permissions_store = usePermissionsStore();
const teamStore = useTeamStore();

const can = permissions_store.can;
const menu_items = ref(_.cloneDeep(teamStore.menu_items));

const show = ref(true);
const data: Ref<ITeam[]> = ref([]);

// переключить на редактирвоание коллектива или на создание новаого
const isEditTeam = ref(false);
const teamId = ref(-1);

const findTeamTxt = ref();

const filterTeam = ref(new FilterTeam());

// загрузка
const loading = ref(false);

//pagination ---------------------------------------------------------------------
const limit = 5; //сколько колелктивов отображается на странице
const offset = ref(0); //сколько коллективов пропустить прежде чем отобрад+зить

const maxPages = ref(1);
const visiblePages = 5;
//pagination ---------------------------------------------------------------------

const stateLayout = ref();

// найденные направления из системы
const foundDirections = ref([{id: 0, shortname: "-", idDB: 0}]); //дата

onBeforeMount(async () => {
    // вытащить коллективы из бд и отобразить их
    await getDirections();
    await handleEventSetFilters();
});

async function handleModalSaveChanges() {
    await fetchTeams();
}

function editTeam(editT: boolean, team: ITeam | null) {
    // редактируем колектив или создаем новый
    isEditTeam.value = editT;
    teamId.value = team?.id ? team.id : -1;
}

function handleEventChangeStateLayout(stateL: boolean) {
    stateLayout.value = stateL;
}

// вытащить коллективы из бд
async function fetchTeams() {
    loading.value = true;

    filterTeam.value.searchTxt = findTeamTxt.value;

    let d = await teamStore.fetchTeamsSearch(filterTeam.value);

    data.value = d[0];

    const teamsCount = d[1];
    maxPages.value = teamsCount >= limit ? Math.ceil(teamsCount / limit) : 1;

    loading.value = false;
}

async function handleEventSetFilters() {
    menu_items.value.forEach((el) => {
        let open = undefined;
        let directions: number[] = [];

        switch (el.id) {
            // is open
            case 1:
                if (el.menu_types[0].checked && el.menu_types[1].checked) {
                    open = undefined;
                } else if (el.menu_types[0].checked) {
                    open = true;
                } else if (el.menu_types[1].checked) {
                    open = false;
                }

                filterTeam.value.set_open = open;
                break;
            // directions
            case 2:
                // пройтись по элементам меню
                el.menu_types.forEach((elType) => {
                    // пройтись по направлениям
                    foundDirections.value.forEach((direction) => {
                        let dir = -1;

                        if (elType.checked) {
                            switch (elType.id) {
                                case 1:
                                    dir =
                                        direction.shortname == DirectionName.NID
                                            ? direction.idDB
                                            : -1;
                                    break;
                                case 2:
                                    dir =
                                        direction.shortname == DirectionName.UD
                                            ? direction.idDB
                                            : -1;
                                    break;
                                case 3:
                                    dir =
                                        direction.shortname == DirectionName.OD
                                            ? direction.idDB
                                            : -1;
                                    break;
                                case 4:
                                    dir =
                                        direction.shortname == DirectionName.SD
                                            ? direction.idDB
                                            : -1;
                                    break;
                                case 5:
                                    dir =
                                        direction.shortname == DirectionName.KTD
                                            ? direction.idDB
                                            : -1;
                                    break;
                            }
                        }

                        if (dir > 0) directions.push(dir);
                    });
                });

                // задать выбранные направления
                filterTeam.value.directions = directions;
                break;
            // archive
            case 3:
                filterTeam.value.is_archive = el.menu_types[0].checked;
                filterTeam.value.is_active = el.menu_types[1].checked;
                break;
        }
    });

    await fetchTeams();
}

// сбросить фильтры
function handleEventResetFilters() {
    menu_items.value = _.cloneDeep(teamStore.menu_items);
}

// получить идшники направлений с бд, чтобы по этим идшникам найти
// эти направления
async function getDirections() {
    let data = await teamStore.fetchDirections();

    let directions = data[0];
    let arrayData = [];

    for (let i = 0; i < directions.length; i++) {
        let direction = directions[i];

        arrayData[i + 1] = {
            id: i + 1,
            shortname: direction.shortname,
            idDB: direction.id,
        };
    }

    foundDirections.value = arrayData;
}

async function handleEventChangePage(currentPage: number) {
    offset.value = (currentPage - 1) * limit;
    filterTeam.value.offset = offset.value;

    await fetchTeams();
}

async function handleTimerSearch(seachText: string) {
    findTeamTxt.value = seachText;

    await fetchTeams();
}
</script>

<style lang="scss" scoped>
.filters-block {
  background-color: #fff;
  padding: 2rem;
}

.navigation-tags {
}

.wrapper-team {
  display: block;
  width: 100%;
  justify-content: center;

  .set {
    padding: 5px 15px;
    border-radius: var(--border-radius);
    font-size: 1rem;

    &__open {
      background: var(--green-color);
    }

    &__closed {
      background: var(--red-color);
    }
  }

  .wrapper-team__navigation {
    padding-bottom: 1rem;
    width: 100%;

    a {
      // cursor: pointer;
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
    width: 100%;

    .archive {
      opacity: 0.5;
    }

    .content-filter {
      border-radius: var(--border-radius);
      border: var(--main-border-card);
      height: 300px;
      width: 15rem;
    }

    .content-cards {
      width: 100%;
      // margin-left: 2rem;

      .cards__search {
        .search-inp {
          width: 100%;
        }
      }

      //grid
      .wrapper-grid {
        padding-top: 1rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        .cardEvent {
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

          .cardTitle {
            color: #373737;

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
          width: 100%;
          max-width: 100%;
          flex-wrap: wrap;
          border-radius: 5px 0 0 0;
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

          img {
            width: 100%;
          }
        }

        .wrapperContent {
          margin: 10px;
          width: 100%;

          .date {
            text-align: end;
          }
        }
      }

      //list
      .wrapper-list {
        .cardEvent {
          margin: 1rem 0;
          border-radius: var(--border-radius);
          background-color: #fff;
          height: 15rem;
          width: 100%;
          overflow: hidden;
          transition: all 0.5s;

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
            overflow: hidden;
            background-position: center;
            display: flex;
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
        }
      }
    }
  }
}

@media (max-width: 992px) {
  .wrapper-list {
    .card__banner {
      display: none !important;
    }

    .cardEvent {
      height: auto !important;
    }
  }
}
</style>
