<template>
  
</template>

<script setup lang="ts">
import { useFunctionsStore } from "@/store/fucntion_store";
import { useTeamStore } from "@/store/team_store";
import { useUserFunctionsStore } from "@/store/user_functions.store";
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Search from "@/components/Search.vue";


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
  isTable:Boolean;
  idTeam: number;
  onDeleteMemberEvent: Function;
}>();


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
