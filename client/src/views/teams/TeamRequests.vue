<template>
  <div v-if="req == null || req[0] == null" class="alert alert-warning" role="alert">
    Заявок нет
  </div>

  <!-- анкета -->
  <ModalQuestionnaireAnswers :requisition="currentRequisition" />
  <div class="filters">
    <div class="block search">
      <div class="icon">
        <FontAwesomeIcon icon="search" />
      </div>
      Поиск по новостям
    </div>
    <div class="dropdown">
      <div class="block filter" @click="isFilterExpanded = !isFilterExpanded" type="button" id="dropdownFilter" data-bs-toggle="dropdown" aria-expanded="false">
        <FontAwesomeIcon icon="sort" />
        Фильтрация заявок
        <FontAwesomeIcon v-if="!isFilterExpanded" icon="angle-down" />
        <FontAwesomeIcon v-if="isFilterExpanded" icon="angle-up" />
      </div>
      <ul class="block dropdown-menu" aria-labelledby="dropdownFilter">
        <li><a class="dropdown-item" href="#">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              Утверждённые
            </label>
          </div>
        </a></li>
        <li><a class="dropdown-item" href="#">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">
            Отклонённые
          </label>
        </div>
        </a></li>
        <li><a class="dropdown-item" href="#">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              Не просмотренные
            </label>
          </div>
        </a></li>
        <li><a class="dropdown-item" href="#">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              Приглашены на собеседование
            </label>
          </div>
        </a></li>
      </ul>
    </div>
    <div class="dropdown">
      <div class="block order" @click="isOrderExpanded = !isOrderExpanded" type="button" id="dropdownOrder" data-bs-toggle="dropdown" aria-expanded="false">
        <FontAwesomeIcon icon="sort" />
        Сначала новые
        <FontAwesomeIcon v-if="!isOrderExpanded" icon="angle-down" />
        <FontAwesomeIcon v-if="isOrderExpanded" icon="angle-up" />
      </div>
      <ul class="block dropdown-menu" aria-labelledby="dropdownOrder">
        <li><a class="dropdown-item" href="#">
          <FontAwesomeIcon icon="sort" />
          Сначала новые
        </a></li>
        <li><a class="dropdown-item" href="#">
          <FontAwesomeIcon icon="sort" />
          Сначала старые
        </a></li>
      </ul>
    </div>
  </div>
  <div v-for="item in req">
    <div class="card mb-3 rounded-4">
      <div class="row g-0">
        <div class="col-md-2">
          <img src="@/assets/icon/user.png" class="img-fluid rounded-4" alt="">
        </div>
        <div class="col-md-10">
          <div class="card-body d-flex flex-column">
            <div class="member-title mb-2">{{ item.user.fullname }}</div>
            <div class="member-desc mb-5">Дата отправки заявки: {{ item.date_update }}</div>
            <div class="mt-auto row align-content-center">
              <div class="member-status col">Статус: {{ item.status.name }}</div>
              <div class="col-auto">
                <button class="button-outline px-4 button-text-dark" @click="setCurrentRequisition(item)">Открыть</button>
              </div>
              <div class="col-auto">
                <button class="button-orange px-4 button-text-light">Написать</button>
              </div>
              <div class="col-auto">
                <button class="button-green px-4 button-text-light" @click="updateRequisition(item, 'Принята')">Утвердить</button>
              </div>
              <div class="col-auto">
                <button class="button-red px-4 button-text-light" @click="updateRequisition(item, 'Отклонена')">Отклонить</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ModalQuestionnaireAnswers from "@/components/modals/ModalQuestionnaireAnswers.vue";
import { useTeamStore } from "@/store/team_store";
import { useUserFunctionsStore } from "@/store/user_functions.store";
import { ref, onBeforeMount } from "vue";

const teamStore = useTeamStore();
const uFStore = useUserFunctionsStore();

const props = defineProps<{
  idTeam: number;
}>();


const isFilterExpanded = ref(false);
const isOrderExpanded = ref(false);

const req = ref();
const currentRequisition = ref();

onBeforeMount(async () => {
  await fetchRequisitions();
});

async function fetchRequisitions() {
  req.value = await teamStore.fetchRequisitions(props.idTeam);
}

async function updateRequisition(req: any, status_name: string) {
  await teamStore.updateRequisition(req.id, status_name);
  await fetchRequisitions();

  if (status_name == "Принята") {
    await uFStore.assignNewParticipant(props.idTeam, req.user.id);
  }
}

async function getRequisitions(req_id: number, status_name: string) {
  await teamStore.updateRequisition(req_id, status_name);
}

function setCurrentRequisition(req: any) {
  // редактируем колектив или создаем новый
  currentRequisition.value = req;
}
</script>

<style lang="scss" scoped>
.member-title {
  color: #383838;
  font-family: Montserrat;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.member-desc {
  color: #383838;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.member-status {
  color: #383838;
  font-family: Montserrat;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.button-text-light {
  color: #FFF;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.button-text-dark {
  color: #383838;
  font-family: Montserrat;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.button-outline {
  border-radius: 10px;
  border: 1.5px solid;
  background: #FFF;
}

.button-orange {
  border-radius: 10px;
  background: #FF9457;
}

.button-green {
  border-radius: 10px;
  background: #61E2A1;
}

.button-red {
  border-radius: 10px;
  background: #D22043;
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
  background: rgb(243, 243, 243);
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
</style>
