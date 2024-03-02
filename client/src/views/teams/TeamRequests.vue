<template>
  <!-- анкета -->
  <ModalQuestionnaireAnswers
    :form="currentRequisition"
  />

  <div class="filters row g-3">
    <!--   поиск -->
    <div class="col-auto">
      <SearchField :handle-timer-search="handleTimerSearch" />
    </div>
    <!--   фильтр по статусу   -->
    <div class="col-auto">
      <div class="dropdown">
        <div
          class="block filter"
          @click="isFilterExpanded = !isFilterExpanded"
          type="button"
          id="dropdownFilter"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon="sort" class="mx-2" />
          Фильтрация заявок
          <FontAwesomeIcon
            v-if="!isFilterExpanded"
            icon="angle-down"
            class="mx-2"
          />
          <FontAwesomeIcon
            v-if="isFilterExpanded"
            icon="angle-up"
            class="mx-2"
          />
        </div>
        <ul class="block dropdown-menu" aria-labelledby="dropdownFilter">
          <li v-for="value in filterRequisitions" v-bind:key="value.id">
            <div class="dropdown-item">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                  :checked="value.checked"
                  @change="
                    value.checked = !value.checked;
                    fetchRequisitions();
                  "
                />
                <label class="form-check-label" for="flexCheckDefault">
                  {{ value.name }}
                </label>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--   фильтр по дате   -->
    <div class="col-auto">
      <div class="dropdown">
        <div
          class="block order"
          @click="isOrderExpanded = !isOrderExpanded"
          type="button"
          id="dropdownOrder"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon="sort" class="mx-2" />
          {{ filters.selectedFilterDate.name }}
          <FontAwesomeIcon
            v-if="!isOrderExpanded"
            icon="angle-down"
            class="mx-2"
          />
          <FontAwesomeIcon
            v-if="isOrderExpanded"
            icon="angle-up"
            class="mx-2"
          />
        </div>
        <ul class="block dropdown-menu" aria-labelledby="dropdownOrder">
          <li
            v-for="value in filterDate"
            @click="
              filters.selectedFilterDate = value;
              fetchRequisitions();
            "
            v-bind:key="value.id"
          >
            <div class="dropdown-item">
              <FontAwesomeIcon icon="sort" />
              {{ value.name }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div
    v-if="req?.length <= 0 && !teamStore.apiRequest.loading"
    class="alert alert-warning"
    role="alert"
  >
    Заявок нет
  </div>

  <div v-for="item in req" v-bind:key="item.id">
    <div class="member-card mb-3 rounded-4 border-block">
      <div class="row g-1 align-items-center">
        <div
          class="col-lg-auto col-md-auto col-sm-auto img-container align-items-center d-flex justify-content-center"
        >
          <img class="" src="@/assets/icon/user.png" alt="" />
        </div>
        <div class="col-lg col-md col-sm p-3">
          <div class="card-body d-flex flex-column">
            <div class="member-title mb-2">{{ item.user?.fullname }}</div>
            <div class="member-desc mb-5">
              Дата отправки заявки: {{ item.date_update }}
            </div>
            <div class="mt-auto row align-content-center g-2">
              <div class="member-status col">
                Статус: {{ item.status?.name }}
              </div>
              <div class="col-auto">
                <button
                  class="button-outline px-4 button-text-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#viewReqFormModal"
                  @click="setCurrentRequisition(item)"
                >
                  Анкета
                </button>
              </div>
              <div class="col-auto">
                <button
                  class="px-4"
                  data-bs-toggle="modal"
                  @click="
                    sendCommentReqId =
                      sendCommentReqId == item.id ? -1 : item.id ?? -1
                  "
                >
                  Написать
                </button>
              </div>
              <div class="col-auto">
                <button
                  class="button-green px-4"
                  @click="updateStatus(item, Status.ACCEPTED)"
                >
                  Утвердить
                </button>
              </div>
              <div class="col-auto">
                <button
                  class="button-red px-4"
                  @click="updateStatus(item, Status.CANCELLED)"
                >
                  Отклонить
                </button>
              </div>
              <div class="col-12">
                <div class="col-auto">
                  Комментарий:
                  {{ item.comment_leader ?? "-" }}
                </div>
              </div>
            </div>
            <!--              send comment-->
            <div v-if="sendCommentReqId == item.id" class="row my-2 g-2">
              <div class="col">
                <input type="text" class="comment" v-model="commentLeader" />
              </div>
              <div class="col-auto">
                <font-awesome-icon
                  :icon="['fas', 'paper-plane']"
                  class="btn-icon-rounded"
                  @click="sendComment(item.id ?? -1, commentLeader)"
                />
              </div>
            </div>
            <div class="row">
              <div v-if="teamStore.apiRequest.error" class="col-auto">
                <div class="alert alert-warning" role="alert">
                  {{ teamStore.apiRequest.error }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="teamStore.apiRequest.loading"
    class="d-flex align-items-center justify-content-center mt-4"
  >
    <LoadingElem size-fa-icon="fa-3x" />
  </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ModalQuestionnaireAnswers from "@/components/modals/ModalQuestionnaireAnswers.vue";
import { useTeamStore } from "@/store/team_store";
import { useUserFunctionsStore } from "@/store/user_functions.store";
import type { Ref } from "vue";
import { onBeforeMount, ref } from "vue";
import type { IRequisition } from "@/store/models/teams/requisition.model";
import SearchField from "@/components/SearchField.vue";
import LoadingElem from "@/components/LoadingElem.vue";
import type { RURequisition } from "@/store/models/teams/update-requisition.model";
import { Status } from "@/store/enums/enum_event";

const teamStore = useTeamStore();
useUserFunctionsStore();
const props = defineProps<{
  idTeam: number;
}>();

const sendCommentReqId = ref(-1);

const isFilterExpanded = ref(false);
const isOrderExpanded = ref(false);

const req: Ref<IRequisition[]> = ref([]);
const currentRequisition = ref();
const commentLeader = ref();

const searchTxt = ref("");

const filterRequisitions = ref([
  { id: 0, name: "Утверждённые", checked: true, status: Status.ACCEPTED },
  { id: 1, name: "Отклонённые", checked: true, status: Status.CANCELLED },
  { id: 2, name: "Не просмотренные", checked: true, status: Status.CREATED },
  // { id: 3, name: "Приглашены на собеседование", checked: true },
]);

const filterDate = [
  { id: 0, name: "Сначала новые", order: "DESC" },
  { id: 1, name: "Сначала старые", order: "ASC" },
];

const filters = ref({
  selectedFilterDate: filterDate[0],
});

onBeforeMount(async () => {
  await fetchRequisitions();
});

async function handleTimerSearch(seachText: string) {
  searchTxt.value = seachText;

  await fetchRequisitions();
}

async function fetchRequisitions() {
  let requis: RURequisition = {};
  requis.fullname = searchTxt.value;
  requis.team_id = props.idTeam;
  requis.date_update_order = filters.value.selectedFilterDate.order;
  requis.statuses = [];
  filterRequisitions.value.forEach((status) => {
    if (status.checked) requis.statuses?.push(status.status);
  });

  req.value = await teamStore.fetchRequisitions(requis);
}

async function updateStatus(req: IRequisition, status_name: string) {
  let requis: RURequisition = {};
  requis.id = req.id;
  requis.status_name = status_name;

  await updateRequisition(requis);

  if (status_name == "Принята") {
    await teamStore.assignNewParticipant(props.idTeam, req.user?.id ?? -1);
  }
}

async function updateRequisition(req: RURequisition) {
  await teamStore.updateRequisition(req);
  await fetchRequisitions();
}

function setCurrentRequisition(req: IRequisition) {
  currentRequisition.value = req;
}

async function sendComment(requis_id: number, comment: string) {
  let requis: RURequisition = {};
  requis.id = requis_id;
  requis.comment_leader = comment;

  await updateRequisition(requis);
}
</script>

<style lang="scss" scoped>
.comment {
  width: 100%;
}

.img-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 150px;
  height: 150px;
  background-size: cover;
  overflow: hidden;
  border-radius: 25px;

  img {
    max-width: 100%;
    height: auto;
  }
}

.img-fluid {
  height: fit-content;
  max-height: 150px;
}

.member-title {
  color: #383838;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.member-desc {
  color: #383838;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.member-status {
  color: #383838;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.button-text-dark {
  color: #383838;
  font-style: normal;
  line-height: normal;
}

.button-outline {
  border-radius: 10px;
  border: 1.5px solid;
  background: #fff;
}

.button-orange {
  border-radius: 10px;
  background: #ff9457;
}

.button-green {
  background: #61e2a1;
}

.button-red {
  background: #d22043;
}

.filters {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 11px;
  margin-bottom: 30px;

  .block {
    padding: 7px 15px;
    border: 1.5px solid rgba(61, 61, 61, 0.1);
    border-radius: 15px;
  }

  .search {
    .icon {
      margin-right: 10px;
    }

    display: flex;
    align-items: center;
  }

  .filter {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .order {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.member-card {
  width: 100%;
  margin-bottom: 12px;
  border-radius: var(--border-radius);
}

.member-image {
  object-fit: cover;
  height: 89px;
  width: 89px;
  border-radius: 20px 0 0 20px;
}

.member-info h1 {
  color: black;
  font-size: 22px;
  line-height: 38px;
  padding-bottom: 10px;
}

.member-info h2 {
  color: rgba(90, 90, 90, 1);
  font-size: 15px;
  line-height: 24px;
}

@media (max-width: 768px) {
  .img-container {
    display: none !important;
  }
}
</style>