<script setup lang="ts">
import WIP from '@/components/WIP.vue';
import { onBeforeMount, ref, reactive } from 'vue';
import Ankets from '@/views/teams/Questionnaire.vue';

import axios from 'axios';
import { useRoute } from "vue-router";
import { useTeamStore } from '@/store/team_store';
import ModalQuestionnaire from '@/components/modals/ModalQuestionnaire.vue';
import TeamNews from './TeamNews.vue';
import Participation from './Participation.vue';
import TeamRequests from './TeamRequests.vue';
import { usePermissionsStore } from '@/store/permissions_store';
import TeamMain from './TeamMain.vue';


const route = useRoute()

const permissions_store = usePermissionsStore();
const can = permissions_store.can;

const idTeam = Number(route.params.id);

const teamStore = useTeamStore();
const show = ref(true);


const data = ref()
const team = ref()


onBeforeMount(async () => {
  fetchCurrentTeam();
  fetchUsersOfTeam()
})


async function fetchUsersOfTeam() {
  team.value = await teamStore.fetchUserOfTeam(idTeam)
}



async function fetchCurrentTeam() {
  // я эту хуйню позже перепишу
  await axios.get('/api/teams/' + route.params.id)
    .then((respose: any) => {
      data.value = respose.data
    })
}


////////////////////////////////////////////
const selectedItem = ref(0);
const showCreate = ref(false);

const itemList = [
  { name: "Главная", permission: true },
  { name: "Новости", permission: true },
  { name: "Расписание занятий", permission: true },
  { name: "Участники", permission: true },
  { name: "Редактор анкеты", permission: can('can create questionnaires') },
  { name: "Заявки", permission: can('can edit status requisitions') },
]
///////////////////////////////////////////////////////////
const selectItem = (i: number) => {
  selectedItem.value = i
}

itemList.forEach((item, index) => {
  return (item == itemList[index])
})

async function handleDeleteMemberEvent() {
  await fetchUsersOfTeam()
}

async function handleUpdateTeam() {
  fetchCurrentTeam()
}

////////////////////////////////////////////

// const itemLink = [{ name: "Тег", path: "/news" }, { name: "Тег 2", path: "/teams" },]

</script>

<template>
  <!-- Это вся обертка -->
  <div class="wrapper-team">

    <!-- Обертка карточек коллективов -->
    <div class="full-width">
      <div class="wrapper-team__top-panel">
        <div class="text-area">
          <div class="container">
            <p>{{ data.title }}</p>
            <ModalQuestionnaire v-model="data.title" />
          </div>
        </div>
      </div>
    </div>

    <div v-if="show" class="wrapper-team__content wrapper-content">

      <!-- Навигация -->
      <div class="wrapper-team__navigation">
        <template v-for="(item, index) in itemList" :key="index">
          <a v-if="item.permission" @click="selectItem(index), showCreate = false"
            :class="{ active: index == selectedItem }">{{ item.name }}</a>
        </template>

      </div>

      <div v-if="(selectedItem === 0)">
        <TeamMain :onUpdateTeam="handleUpdateTeam" :team="data" />
      </div>

      <div v-if="(selectedItem === 1)">
        <!-- Блок с НОВОСТЯМИ -->
        <TeamNews :team="team" />
      </div>

      <div v-if="(selectedItem === 2)">
        <WIP />
      </div>

      <!-- участники -->
      <div v-if="(selectedItem === 3)">
        <div v-for="item in team">
          <Participation :onDeleteMemberEvent="handleDeleteMemberEvent" :user=item.user :func=item.function
            :idTeam="idTeam" />
        </div>
      </div>

      <div v-if="(selectedItem === 4)">
        <Ankets />
      </div>

      <!-- заявки -->
      <div v-if="(selectedItem == 5)">
        <TeamRequests :idTeam="idTeam" />
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 89px;
  margin: 1rem;
  background: #d1cdcd;
  border-radius: 10px;
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
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .wrapper-team__top-panel {
    background-image: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.6) 10%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%), url('https://sun9-70.userapi.com/impg/hoGoGUgoywvDUTx8l17HB-5Rnpn3xKM7M1IP0Q/aRoqzu5at1s.jpg?size=2560x1707&quality=95&sign=f10e37ffd001af7dbd3cd5ab53041dee&type=album');
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
        ;
        margin: 0;
        margin-bottom: 2rem;
      }
    }
  }

  .wrapper-team__navigation {
    padding-bottom: 2rem;

    a {
      cursor: pointer;
      font-family: var(--font-family-title);
      font-weight: 600;
      font-size: 14px;
      transition: 0.3s;
      color: #348498;
      margin-inline: 1rem;
      padding-bottom: 0.75rem;

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