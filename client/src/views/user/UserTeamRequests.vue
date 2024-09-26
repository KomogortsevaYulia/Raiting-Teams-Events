<template>
  <!-- анкета -->
  <ModalQuestionnaireAnswers :form="currentRequisition" />

  <div class="alert alert-danger" v-if="teamStore.apiRequest.error">
    {{ teamStore.apiRequest.error }}
  </div>

  <LoadingElem v-if="teamStore.apiRequest.loading" size-fa-icon="" />

  <div
    class="member-card border-block"
    v-for="(item, index) in requests"
    :key="index"
  >
    <div class="row my-3">
      <h4>{{ item.team?.title }}</h4>
    </div>
    <div class="row">
      <span>Дата последнего рассмотрения: {{ item.date_update }}</span>
    </div>
    <div class="row">
      <span>Статус вашей заявки: {{ item.status.name }}</span>
    </div>
    <div class="row">
      <span>Комментарий: {{ item.comment_leader ?? "-" }}</span>
    </div>
    <div class="row my-3 justify-content-end">
      <div class="col-auto">
        <button class="" @click="deleteRequisition(item.id ?? -1)">
          Отозвать
        </button>
      </div>
      <div class="col-auto">
        <button
          class="btn-custom-secondary px-4 "
          data-bs-toggle="modal"
          data-bs-target="#viewReqFormModal"
          @click="setCurrentRequisition(item)"
        >
          Анкета
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { type Ref } from "vue";
import { type IRequisition } from "@/store/models/teams/requisition.model";
import { useTeamStore } from "@/store/team_store";
import { usePermissionsStore } from "@/store/permissions_store";
import LoadingElem from "@/components/LoadingElem.vue";
import ModalQuestionnaireAnswers from "@/components/modals/ModalQuestionnaireAnswers.vue";

const requests: Ref<IRequisition[]> = ref([]);
const permissions_store = usePermissionsStore();

const teamStore = useTeamStore();

const currentRequisition = ref();

onBeforeMount(() => {
  fetchRequisitions();
});

function setCurrentRequisition(req: IRequisition) {
  currentRequisition.value = req;
}

async function fetchRequisitions() {
  requests.value = await teamStore.getUserRequisitions(
    permissions_store.user_id,
  );
}

async function deleteRequisition(requisId: number) {
  await teamStore.deleteRequisition(requisId);
  await fetchRequisitions()
}
</script>

<style scoped lang="scss">
.member-card {
  width: 100%;

  margin-bottom: 12px;
  background: #fff;
  padding: 20px;
  border-radius: var(--border-radius);
}
</style>
