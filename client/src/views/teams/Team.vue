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

    <div v-if="show" class="wrapper-team__content wrapper-content border-block">
      <!-- Навигация -->
      <div class="wrapper-second__navigation">
        <template v-for="(item, index) in itemList" :key="index">
          <a
            v-if="item.permission"
            @click="selectItem(index), (showCreate = false)"
            :class="{ active: index == selectedItem }"
            >{{ item.name }}</a
          >
        </template>
      </div>

      <div v-if="selectedItem === 0">
        <TeamMain :onUpdateTeam="handleUpdateTeam" :team="data" />
      </div>

      <div v-if="selectedItem === 1">
        <!-- Блок с НОВОСТЯМИ -->
        <TeamNews :team="team" />
      </div>

      <div v-if="selectedItem === 2">
        <WIP />
      </div>

      <!-- участники -->
      <div v-if="selectedItem === 3">
        <div class="top-bar row g-2 justify-content-between">
        <div class="block search col-md-5 col-sm-12">
          <div class="icon"> 
            <FontAwesomeIcon icon="search" />
          </div>
               Поиск по участникам
          </div>
          <div class="block order col-md-5 col-sm-12">
            <FontAwesomeIcon icon="sort" />
            Сначала недавно вступившие
            <FontAwesomeIcon icon="angle-down" />
          </div>
            <div class="view-selection col-md-1 col-sm-2">
              <svg v-on:click="isTable = true" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 59 40" fill="none">
                <rect width="59" height="40"/>
                <path d="M22.3333 15.8V13H41V15.8H22.3333ZM22.3333 21.4V18.6H41V21.4H22.3333ZM22.3333 27V24.2H41V27H22.3333ZM18.3333 15.8C17.9556 15.8 17.6389 15.6658 17.3833 15.3975C17.1278 15.1292 17 14.7967 17 14.4C17 14.0033 17.1278 13.6708 17.3833 13.4025C17.6389 13.1342 17.9556 13 18.3333 13C18.7111 13 19.0278 13.1342 19.2833 13.4025C19.5389 13.6708 19.6667 14.0033 19.6667 14.4C19.6667 14.7967 19.5389 15.1292 19.2833 15.3975C19.0278 15.6658 18.7111 15.8 18.3333 15.8ZM18.3333 21.4C17.9556 21.4 17.6389 21.2658 17.3833 20.9975C17.1278 20.7292 17 20.3967 17 20C17 19.6033 17.1278 19.2708 17.3833 19.0025C17.6389 18.7342 17.9556 18.6 18.3333 18.6C18.7111 18.6 19.0278 18.7342 19.2833 19.0025C19.5389 19.2708 19.6667 19.6033 19.6667 20C19.6667 20.3967 19.5389 20.7292 19.2833 20.9975C19.0278 21.2658 18.7111 21.4 18.3333 21.4ZM18.3333 27C17.9556 27 17.6389 26.8658 17.3833 26.5975C17.1278 26.3292 17 25.9967 17 25.6C17 25.2033 17.1278 24.8708 17.3833 24.6025C17.6389 24.3342 17.9556 24.2 18.3333 24.2C18.7111 24.2 19.0278 24.3342 19.2833 24.6025C19.5389 24.8708 19.6667 25.2033 19.6667 25.6C19.6667 25.9967 19.5389 26.3292 19.2833 26.5975C19.0278 26.8658 18.7111 27 18.3333 27Z" fill="#383838"/>
              </svg>
              <svg v-on:click="isTable = false" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 58 40" fill="none">
                <rect width="58" height="40"/>
                <path d="M20 19V11H28V19H20ZM20 29V21H28V29H20ZM30 19V11H38V19H30ZM30 29V21H38V29H30ZM22 17H26V13H22V17ZM32 17H36V13H32V17ZM32 27H36V23H32V27ZM22 27H26V23H22V27Z" fill="#383838"/>
              </svg>
            </div>
      </div>

              <div class="py-4">
                <div v-for="(item, ind) in team">
                  <div v-if="item.function?.title == 'Участник'">
                    <div>{{ ind + 1 }} участников</div>
                  </div>
                </div>
                  <div v-for="(item, inde) in team">
                  <div v-if="item.function?.title == 'Руководитель'">
                    <div>{{ inde + 1 }} руководителя</div>
                  </div>
                </div>
                          
              </div>

              
            
            <div v-if="isTable == false" class="members-list row g-2" >
              <div v-for="item in team" class="col-md-6 col-lg-6">
              <div class="member-card border rounded">
                <div class="image-container">
                  <img class="rounded" src="../../assets/icon/event3.png" alt="" />
                </div>
                <div class="text-container">
                  <div class="title">{{ item.user.fullname }}</div>
                  <div class="description">{{ item.function?.title }}</div>
                  <div class="group">{{ item.user.education_group }}</div>
                </div>
                <div class="row g-2 justify-content-end">
                  <div class="col-auto">
                    <button
                      class="btn-custom-secondary"
                      @click="isEditMode = true"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 18 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10ZM11.207 2.5 13.5 4.793 4.793 13.5l-2-2L11.207 2.5zm1.586 3L10.5 3.207 12.793 1l2 2L12.793 5.5z"/>
  </svg>
                    </button>
                  </div>
              </div>
            </div>
                  <div v-if="isEditMode">
                        <div class="row g-2">
                          <label>Группа:</label>
                          <input v-model="item.user.education_group" />
                        </div>
                        <div class="row g-2">
                          <label>Роль:</label>
                          <input v-model="item.function.title" />
                        </div>
                        <div class="row g-2 d-flex justify-content-end mt-3">
                          <div class="col-auto">
                            <button
                              class="btn-custom-accept"
                              @click="
                                saveChanges(
                                  item.user.education_group,
                                  item.function?.title,
                                  item.user.id,
                                )
                              "
                            >
                              Сохранить
                            </button>
                          </div>
                          <div class="col-auto">
                            <button @click="cancelEditMode">Отмена</button>
                          </div>
                        </div>
                      </div>
            
            </div>
          
        </div>          
              <div v-if="isTable==true">
                          <table class="table table-hover">
                              <thead>
                                <tr>
                                  <th scope="col">№</th>
                                  <th scope="col">ФИО</th>
                                  <th scope="col">Роль</th>
                                  <th scope="col">Группа</th>
                                  <th scope="col">Дата вступления</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(it, index) in team">
                                  <th scope="row">{{ index + 1 }}</th>
                                  <td>{{ it.user.fullname }}</td>
                                  <td>{{it.function?.title }}</td>
                                  <td>{{ it.user.education_group }}</td>
                                  <td>01.01.2023</td>
                                </tr>
                              </tbody>
                            </table>       
              </div>  
         
        
                
                  
       
      <Pagination class="d-flex" :visiblePages=10 :maxPage=1 :handleEventChangePage="changePage"/>
    </div>
    

      <div v-if="selectedItem === 4">
        <Ankets />
      </div>

      <!-- заявки -->
      <div v-if="selectedItem == 5">
        <TeamRequests :idTeam="idTeam" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import "@/assets/nav-second.scss"
import WIP from "@/components/WIP.vue";

import { onBeforeMount, ref } from "vue";
import Ankets from "@/views/teams/Questionnaire.vue";
import Pagination from "@/components/Pagination.vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { useTeamStore } from "@/store/team_store";
import ModalQuestionnaire from "@/components/modals/ModalQuestionnaire.vue";
import TeamNews from "./TeamNews.vue";
import { useFunctionsStore } from "@/store/fucntion_store";
import TeamRequests from "./TeamRequests.vue";
import { usePermissionsStore } from "@/store/permissions_store";
import TeamMain from "./TeamMain.vue";

const route = useRoute();
const userStore = useFunctionsStore();
const permissions_store = usePermissionsStore();
const can = permissions_store.can;

const idTeam = Number(route.params.id);
const isTable = ref(false);
const teamStore = useTeamStore();
const show = ref(true);
const isEditMode = ref(false);
const data = ref();
const team = ref();


onBeforeMount(async () => {
  await fetchCurrentTeam();
  await fetchUsersOfTeam();
});

async function saveChanges(
  education_group: string,
  title_role: string,
  id: number,
) {
  await userStore.update(education_group, title_role, id);
  isEditMode.value = false;
}
async function cancelEditMode() {
  isEditMode.value = false;
}



async function fetchUsersOfTeam() {
  team.value = await teamStore.fetchUserOfTeam(idTeam);
}
async function changePage(page: number) {

}
async function fetchCurrentTeam() {
  
  await axios.get("/api/teams/" + route.params.id).then((respose: any) => {
    data.value = respose.data;
  });
}

////////////////////////////////////////////
const selectedItem = ref(0);
const showCreate = ref(false);

const itemList = [
  { name: "Главная", permission: true },
  { name: "Новости", permission: true },
  { name: "Расписание занятий", permission: true },
  { name: "Участники", permission: true },
  { name: "Редактор анкеты", permission: can("can create questionnaires") },
  { name: "Заявки", permission: can("can edit status requisitions") },
];
///////////////////////////////////////////////////////////
const selectItem = (i: number) => {
  selectedItem.value = i;
};

itemList.forEach((item, index) => {
  return item == itemList[index];
});

async function handleDeleteMemberEvent() {
  await fetchUsersOfTeam();
}

async function handleUpdateTeam() {
  await fetchCurrentTeam();
}

////////////////////////////////////////////

// const itemLink = [{ name: "Тег", path: "/news" }, { name: "Тег 2", path: "/teams" },]
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

.block {
  padding: 7px 15px;
  border: 1.5px solid rgba(61, 61, 61, 0.1);
  border-radius: 15px;
}

.view-selection {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1.5px solid rgba(61, 61, 61, 0.1);
  border-radius: 15px;
}

.order {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.search {
  .icon {
    margin-right: 10px;
  }

  display: flex;
  align-items: center;
}

.member-card {
  display: flex;
  align-items: center;

  img {
    height: 120px;
    width: 120px;
    object-fit: cover;
    overflow: hidden;
  }

  @media screen and (min-width: 768px) {
    img {
      height: 200px;
      width: 200px;
      object-fit: cover;
      overflow: hidden;
    }
  }

  .date {
    text-align: right;
    font-weight: bold;
    font-size: 10px;
    color: #7d7d7d;
  }

  .title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .description {
    text-align: justify;
    font-size: 13px;
  }
  .group {
    text-align: justify;
    font-size: 13px;
  }

  .text-container {
    flex: 1;
    padding: 25px;
  }
}
</style>
