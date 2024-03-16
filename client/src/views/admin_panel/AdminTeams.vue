<template>
  <ModalCreateTeam :is-edit-team="isEditTeam" :team-id="teamId"  :on-save-changes="handleSaveChanges"  id="editTeamModal"/>

  <div class="wrapper-admin-teams">
    <div class="row mb-4 align-items-end">
      <div class="col-auto">
        <Search :handle-timer-search="handleTimerSearch" />
      </div>
      <div class="col justify-content-end d-flex">
        <div>
          <label class="form-label">Типы коллективов</label>
          <select
            class="form-select"
            aria-label="Default select example"
            v-model="selectedTypeTeam"
            @change="fetchTeams()"
          >
            <option
              v-for="type in typeTeams"
              :value="type"
              v-bind:key="type.id"
            >
              {{ type.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="overflow-auto">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">ФИО руководителя</th>
            <th scope="col">Назавание</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(team, index) in data"
            :class="['table-elem']"
            v-bind:key="team.id"
          >
            <th scope="row">{{ offset + index + 1 }}</th>
            <td>
              <div
                v-for="leader in teamLeaders[index]"
                v-bind:key="leader.id"
                class="row-cols-auto"
                style="width: fit-content"
              >
              <span class="text-secondary"><strong>{{leader.fullname}}({{leader.email}})</strong></span>
              </div>
            </td>
            <td>{{ team.title }}</td>
            <td
              @click="editTeam(true, team.id)"
              data-bs-toggle="modal"
              data-bs-target="#editTeamModal"
              class="text-end"
            >
              <button class="btn-icon-rounded">
                <font-awesome-icon :icon="['fas', 'gear']" class="fa-lg" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="loading"
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
</template>

<script setup lang="ts">
import Search from "@/components/SearchField.vue";
import { onBeforeMount, ref } from "vue";
import Pagination from "@/components/PaginationElem.vue";
import { useTeamStore } from "@/store/team_store";
import LoadingElem from "@/components/LoadingElem.vue";
import { TeamRoles } from "@/store/enums/team_roles";
import ModalCreateTeam from "@/components/modals/ModalCreateTeam.vue";
import {FilterTeam} from "@/store/models/teams/filter-teams.model";
import type {ITeam} from "@/store/models/teams/team.model";

const teamStore = useTeamStore();

// переключить на редактирвоание коллектива или на создание новаого
const isEditTeam = ref(true);

const findTeamTxt = ref();
const filterTeam = ref(new FilterTeam());
const loading = ref(false);

const data = ref();
const teamLeaders = ref();

//pagination ---------------------------------------------------------------------
const limit = 8; //сколько  отображается на странице
const offset = ref(0); //сколько коллективов пропустить прежде чем отобразить

const maxPages = ref(1);
const visiblePages = 5;
//pagination ---------------------------------------------------------------------

const teamId = ref(-1);

const typeTeams = [
  { id: 0, name: "Коллективы", type: "teams" },
  { id: 1, name: "Направления", type: "direction" },
];

const selectedTypeTeam = ref(typeTeams[0]); //тип коллективв

onBeforeMount(async () => {
  filterTeam.value.fields = ["leaders"];
  filterTeam.value.limit = limit;
  await fetchTeams();
});

function editTeam(editT: boolean, id: number) {
  // редактируем колектив или создаем новый
  isEditTeam.value = editT;
  teamId.value = id;
}

async function handleTimerSearch(eventTxt: string) {
  findTeamTxt.value = eventTxt;

  await fetchTeams();
}

async function fetchTeams() {
  loading.value = true;

  filterTeam.value.searchTxt = findTeamTxt.value;

  filterTeam.value.type = selectedTypeTeam.value.type;
  let d = await teamStore.fetchTeamsSearch(filterTeam.value);

  data.value = d[0];

  const teamsCount = d[1];
  maxPages.value = teamsCount >= limit ? Math.ceil(teamsCount / limit) : 1;

  teamLeaders.value = [];
  for (let i = 0; i < data.value.length; i++) {
    const leaders = getLeader(data.value[i]);
    teamLeaders.value.push(leaders);
  }

  loading.value = false;
}

function getLeader(team: ITeam) {
  const leaders = [];
  if(team.functions)
  for (let i = 0; i < team.functions.length; i++) {
    const func = team.functions[i];
    if (func.title === TeamRoles.Leader && func.userFunctions) {
      for (let io = 0; io < func.userFunctions.length; io++) {
        const userFunc = func.userFunctions[io];
        leaders.push(userFunc.user);
      }
    }
  }

  return leaders;
}

async function handleEventChangePage(currentPage: number) {
  offset.value = (currentPage - 1) * limit;
  filterTeam.value.offset = offset.value;

  await fetchTeams();
}

async function handleSaveChanges() {
    await fetchTeams();
}

</script>

<style scoped lang="scss">
.wrapper-admin-teams {
  .btn-empty {
    background: white;
    border-radius: 10px;
    border: 1.5px solid var(--border-color);
  }

  //.table-elem {
  //  cursor: pointer;
  //}

  tbody {
    vertical-align: middle;
  }
}
</style>
