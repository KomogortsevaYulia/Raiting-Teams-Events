<template>
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
    <div>10 участников</div>
    <div>2 руководителя   8 студентов</div>
  </div>

  <div v-if="isTable == false" class="members-list row g-2">
    <div class="col-md-12 col-lg-6">
      <div class="member-card border rounded">
        <div class="image-container">
          <img class="rounded" src="../../assets/icon/event3.png" alt="" />
        </div>
        <div class="text-container">
          <div class="title">{{ props.user.fullname }}</div>
          <div class="description">{{ props.func?.title }}</div>
          <div class="group">{{ props.user.education_group }}</div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
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
    <tr>
      <th scope="row">1</th>
      <td>{{ props.user.fullname }}</td>
      <td>{{ props.func?.title }}</td>
      <td>{{ props.user.education_group }}</td>
      <td>01.01.2023</td>
    </tr>
  </tbody>
</table>
  </div>
  <Pagination class="d-flex" :visiblePages=10 :maxPage=100 :handleEventChangePage="changePage"/>
</template>

<script setup lang="ts">
import { useFunctionsStore } from "@/store/fucntion_store";
import { useTeamStore } from "@/store/team_store";
import { useUserFunctionsStore } from "@/store/user_functions.store";
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Search from "@/components/Search.vue";
import Pagination from "@/components/Pagination.vue";

const userStore = useFunctionsStore();
const teamStore = useTeamStore();
const uFStore = useUserFunctionsStore();

const findTeamTxt = ref();

const users = [ 
  { id: 0, fullname: "Фамилия Имя Отчество", education_group: "ИСТб-20-3" },
  { id: 0, fullname: "Фамилия Имя Отчество", education_group: "ИСТб-20-3" },
  { id: 0, fullname: "Фамилия Имя Отчество", education_group: "ИСТб-20-3" },
  { id: 0, fullname: "Фамилия Имя Отчество", education_group: "ИСТб-20-3" },
  { id: 0, fullname: "Фамилия Имя Отчество", education_group: "ИСТб-20-3" },
  { id: 0, fullname: "Фамилия Имя Отчество", education_group: "ИСТб-20-3" },
  { id: 0, fullname: "Фамилия Имя Отчество", education_group: "ИСТб-20-3" },
];

interface User {
  id: number;
  fullname: string;
  education_group: string;
}

interface Func {
  title: string;
}

const props = defineProps<{
  user: User;
  func: Func;
  idTeam: number;
  onDeleteMemberEvent: Function;
}>();

const isTable = ref(false);
const isEditMode = ref(false);

async function deleteUserFromTeam(status_name: string) {
  // заявка меняет статус
  let requisitions = await teamStore.fetchRequisitions(
    props.idTeam,
    props.user.id,
  );

  if (requisitions && requisitions[0]?.id)
    await teamStore.updateRequisition(requisitions[0].id, status_name);

  // remove user functions
  let uFs = await uFStore.findUserFunctions(props.idTeam, props.user.id);

  uFs.forEach(async (uF: any) => {
    // удалить роль в коллективе
    await uFStore.removeUserFunction(uF.id);
  });

  props.onDeleteMemberEvent();
}

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

async function handleTimerSearch(seachText: string) {
  findTeamTxt.value = seachText;
}

async function changePage(page: number) {

}

</script>

<style lang="scss" scoped>
@import "@/assets/globals.scss";

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
