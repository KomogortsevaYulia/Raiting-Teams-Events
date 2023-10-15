<template>
  <div v-if="req.length <= 0" class="alert alert-warning" role="alert">
    Заявок нет
  </div>

  <!-- анкета -->
  <ModalQuestionnaireAnswers :requisition="currentRequisition" />

  <div v-for="item in req" v-bind:key="item.id">
    <div class="member-card">
      <div class="row ms-lg-3">
        <div class="col-lg-2 d-flex col-md-12 justify-content-center mt-4">
          <img
            class="member-image"
            src="@/assets/icon/user.png"
            alt="картинка пользователя"
          />
        </div>
        <div class="col-lg-10 col-md-12">
          <div class="member-info p-3">
            <div class="col">
              <div class="row">
                <h1>{{ item.user.fullname }}</h1>
              </div>
              <div class="row">
                <h2>Дата последнего рассмотрения: {{ item.date_update }}</h2>
              </div>
              <div class="row">
                <h2>Статус: {{ item.status.name }}</h2>
              </div>
              <div class="row d-flex justify-content-end g-2">
                <div class="col-auto">
                  <!-- anketa -->

                  <button
                    class="btn-custom-secondary"
                    @click="setCurrentRequisition(item)"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#viewReqFormModal"
                  >
                    Анкета
                    <font-awesome-icon icon="id-card-clip" />
                  </button>
                </div>
                <div class="col-auto">
                  <button
                    class="btn-custom-accept"
                    @click="updateRequisition(item, 'Принята')"
                  >
                    Принять
                  </button>
                </div>

                <div class="col-auto">
                  <button
                    class="btn-custom-primary"
                    @click="updateRequisition(item, 'Отклонена')"
                  >
                    Отклонить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ModalQuestionnaireAnswers from "@/components/modals/ModalQuestionnaireAnswers.vue";
import { useTeamStore } from "@/store/team_store";
import { useUserFunctionsStore } from "@/store/user_functions.store";
import { ref, onBeforeMount } from "vue";
import type { IRequisition } from "@/store/models/forms/requisition.model";
import type { Ref } from "vue";

const teamStore = useTeamStore();
const uFStore = useUserFunctionsStore();

const props = defineProps<{
  idTeam: number;
}>();

const req: Ref<IRequisition[]> = ref([]);
const currentRequisition = ref();

onBeforeMount(async () => {
  await fetchRequisitions();
});

async function fetchRequisitions() {
  req.value = await teamStore.fetchRequisitions(props.idTeam);
}

async function updateRequisition(req: IRequisition, status_name: string) {
  await teamStore.updateRequisition(req.id ?? -1, status_name);
  await fetchRequisitions();

  if (status_name == "Принята" && req.user?.id) {
    await uFStore.assignNewParticipant(props.idTeam, req.user.id);
  }
}

function setCurrentRequisition(req: IRequisition) {
  currentRequisition.value = req;
}
</script>

<style lang="scss" scoped>
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
