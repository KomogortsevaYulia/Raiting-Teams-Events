<template>
  <ModalEditPermissions
    :user-id="userId"
    modal-id="modalEditPerms"
    :on-save-changes="handleSaveChanges"
  />
  <div class="wrapper-admin-teams">
    <div class="row mb-4 align-items-end">
      <div class="col-auto">
        <SearchField :handle-timer-search="handleTimerSearch" />
      </div>
    </div>
    <div class="overflow-auto">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">ФИО руководителя</th>
            <th scope="col">Почта</th>
            <th scope="col">Разрешения</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(user, index) in data"
            :class="['table-elem']"
            v-bind:key="user.id"
          >
            <th scope="row">{{ offset + index + 1 }}</th>
            <td>
              {{ user.fullname }}
            </td>
            <td>{{ user.email }}</td>
            <td>
              <div class="row g-2">
                <div v-for="(permission, index) in user.permissions" class="col-auto" v-bind:key="index">
                  <TagElem :text="permission" />
                </div>
              </div>
            </td>
            <td
              @click="editUser(user.id)"
              data-bs-toggle="modal"
              data-bs-target="#modalEditPerms"
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

    <PaginationElem
      :max-page="maxPages"
      :visible-pages="visiblePages"
      :handleEventChangePage="handleEventChangePage"
    />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import LoadingElem from "@/components/LoadingElem.vue";
import TagElem from "@/components/TagElem.vue";
import { FilterUser } from "@/store/models/user.model";
import { useUserStore } from "@/store/user_store";
import ModalEditPermissions from "@/components/modals/ModalEditPermissions.vue";
import PaginationElem from "@/components/PaginationElem.vue";
import SearchField from "@/components/SearchField.vue";

const userStore = useUserStore();

// переключить на редактирвоание коллектива или на создание новаого
const userId = ref(-1);

const findUserTxt = ref();
const filterUser = ref(new FilterUser());
const loading = ref(false);

const data = ref();

//pagination ---------------------------------------------------------------------
const limit = 8; //сколько  отображается на странице
const offset = ref(0); //сколько коллективов пропустить прежде чем отобразить

const maxPages = ref(1);
const visiblePages = 5;
//pagination ---------------------------------------------------------------------

onBeforeMount(async () => {
  filterUser.value.limit = limit;
  await fetchUsers();
});

function editUser(id: number) {
  userId.value = id;
}

async function handleSaveChanges() {
  await fetchUsers();
}

async function handleTimerSearch(userTxt: string) {
  findUserTxt.value = userTxt;
  filterUser.value.searchTxt = userTxt;
  await fetchUsers();
}

async function fetchUsers() {
  loading.value = true;
  let res = await userStore.getUsersByNameEmail(filterUser.value);
  data.value = res.data[0];

  const teamsCount = res.data[1];
  maxPages.value = teamsCount >= limit ? Math.ceil(teamsCount / limit) : 1;

  loading.value = false;
}

async function handleEventChangePage(currentPage: number) {
  offset.value = (currentPage - 1) * limit;
  filterUser.value.offset = offset.value;

  await fetchUsers();
}
</script>

<style scoped lang="scss">
.wrapper-admin-teams {
  .btn-empty {
    background: white;
    border-radius: 10px;
    border: 1.5px solid var(--border-color);
  }

  tbody {
    vertical-align: middle;
  }
}
</style>
