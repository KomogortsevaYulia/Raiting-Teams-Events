<template>
  <!-- Это вся обертка -->
  <div class="wrapper-team">
    <!-- Обертка карточек коллективов -->
    <div class="full-width">
      <div class="wrapper-team__top-panel">
        <div class="text-area">
          <div class="container" v-if="team && team.title">
            <p>{{ team.title }}</p>
            <ModalQuestionnaire v-model="team.title" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="show" class="wrapper-team__content wrapper-content border-block">
      <!-- Навигация -->
      <div class="wrapper-second__navigation">
        <template v-for="(item, index) in itemList" :key="index">
          <a
            v-if="item.permission"
            @click="
              selectItem(index);
              showCreate = false;
            "
            :class="{ active: index == selectedItem }"
            >{{ item.name }}</a
          >
        </template>
      </div>

      <div v-if="selectedItem === 0">
        <TeamMain :onUpdateTeam="handleUpdateTeam" :teamId="teamId" />
      </div>

      <div v-if="selectedItem === 1">
        <!-- Блок с НОВОСТЯМИ -->
        <TeamNews :idTeam="teamId" />
      </div>
<!--расписание-->
      <div v-if="selectedItem === 2">
        <TeamSchedule :team-id="teamId"/>
      </div>
      <!-- участники -->
      <div v-if="selectedItem === 3">
        <ParticipationsPage :idTeam="teamId" />
      </div>

      <div v-if="selectedItem === 4">
        <Ankets />
      </div>

      <!-- заявки -->
      <div v-if="selectedItem == 5">
        <TeamRequests :idTeam="teamId" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "@/assets/nav-second.scss";
import TeamSchedule from "@/views/teams/schedule/TeamPage.vue";

import { onBeforeMount, ref } from "vue";
import Ankets from "@/views/teams/QuestionnairePage.vue";

import axios from "axios";
import { useRoute } from "vue-router";
import ModalQuestionnaire from "@/components/modals/ModalQuestionnaire.vue";
import TeamNews from "./TeamNews.vue";
import TeamRequests from "./TeamRequests.vue";
import { usePermissionsStore } from "@/store/permissions_store";
import TeamMain from "./TeamMain.vue";
import type { ITeam } from "@/store/models/teams/team.model";
import type { Ref } from "vue";
import ParticipationsPage from "@/views/teams/ParticipationsPage.vue";

const route = useRoute();
const permissions_store = usePermissionsStore();
const can = permissions_store.can;

const teamId = Number(route.params.id);
const show = ref(true);


const team: Ref<ITeam> = ref({});

onBeforeMount(async () => {
  await fetchCurrentTeam();
});

async function fetchCurrentTeam() {
  await axios.get("/api/teams/" + route.params.id).then((respose) => {
    team.value = respose.data;
  });
}

const selectedItem = ref(0);
const showCreate = ref(false);

const itemList = [
  { name: "Главная", permission: true },
  { name: "Новости", permission: true },
  { name: "Расписание занятий", permission: true },
  { name: "Участники", permission: true },
  { name: "Редактор анкеты", permission: can("can create questionnaires") },
  { name: "Заявки", permission: can("can create questionnaires") },
];

const selectItem = (i: number) => {
  selectedItem.value = i;
};

itemList.forEach((item, index) => {
  return item == itemList[index];
});

async function handleUpdateTeam() {
  await fetchCurrentTeam();
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 89px;
  margin: 1rem;
  background: #d1cdcd;
}

.wrapper-team {
  display: block;
  width: 100%;
  justify-content: center;

  // Это для баннера, что бы он был на фулл экран
  .full-width {
    position: relative;
    margin-top: -1.5em;
    width: 100vw;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .wrapper-team__top-panel {
    background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.6) 10%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 100%
      ),
      url("https://sun9-70.userapi.com/impg/hoGoGUgoywvDUTx8l17HB-5Rnpn3xKM7M1IP0Q/aRoqzu5at1s.jpg?size=2560x1707&quality=95&sign=f10e37ffd001af7dbd3cd5ab53041dee&type=album");
    background-size: 100% auto;
    background-color: rgba(0, 0, 0, 0.5);
    background-position: center;
    height: 350px;
    width: 100%;
    overflow: hidden;

    display: flex;
    justify-content: start;
    align-items: center;
    position: relative;

    .text-area {
      display: flex;
      align-items: center;
      background-size: 100% auto;
      height: 350px;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      opacity: 1;

      p {
        font-size: 36px;
        font-weight: 600;
        font-family: var(--font-family-title);
        margin: 0 0 2rem;
      }
    }
  }

  .wrapper-team__section-name {
    padding-bottom: 3rem;
    padding-top: 2rem;
    width: 100%;
    transition: 0.3s;
    text-align: center;

    label {
      cursor: pointer;
      font-family: var(--font-family-title);
      font-size: 32px;
      padding: 0 0.75rem 0.75rem 0.75rem;
      border-bottom-color: var(--main-color-hover);
    }

    .active {
      border-bottom: var(--main-border-bottom);
    }
  }

  .wrapper-team__content {
    // border: 2px solid red;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2.5rem 1.5rem 2.5rem;
    width: 100%;
  }
}
</style>
