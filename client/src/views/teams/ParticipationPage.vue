<template>
  <div v-if="props.func && props.func.title === 'Руководитель'" class="mt-5">
    <div class="about" style="margin-top: 20px">
      <div class="member-card">
        <div class="member-info">
          <div>
            <h1>{{ props.user.fullname }}</h1>

            <h2>Роль: {{ props.func?.title }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    <div class="about">
      <div class="member-card py-2">
        <div class="row ms-lg-3">
          <!-- image member -->
          <div class="col-lg-2 d-flex col-md-12 justify-content-center mt-4">
            <img class="member-image" src="@/assets/icon/user.png" alt="" />
          </div>

          <div class="col-lg-10 col-md-12">
            <div class="member-info">
              <div class="col">
                <div class="row">
                  <h1>{{ props.user.fullname }}</h1>
                </div>
                <div class="row">
                  <h2>Группа: {{ props.user.education_group }}</h2>
                </div>
                <div class="row">
                  <h2>Роль: {{ props.func.title }}</h2>
                </div>

                <div class="row g-2 justify-content-end">
                  <div class="col-auto">
                    <button
                      class="btn-custom-secondary"
                      @click="isEditMode = true"
                    >
                      Редактировать
                    </button>
                  </div>
                  <div class="col-auto g-2">
                    <button
                      class="btn-custom-primary"
                      @click="deleteUserFromTeam('Отклонена')"
                    >
                      Удалить
                    </button>
                  </div>
                </div>

                <template v-if="isEditMode">
                  <div class="row g-2">
                    <label>Группа:</label>
                    <input />
                  </div>
                  <div class="row g-2">
                    <label>Роль:</label>
                    <input />
                  </div>
                  <div class="row g-2 d-flex justify-content-end mt-3">
                    <div class="col-auto">
                      <button class="btn-custom-accept">Сохранить</button>
                    </div>
                    <div class="col-auto">
                      <button @click="cancelEditMode">Отмена</button>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTeamStore } from "@/store/team_store";
import { useUserFunctionsStore } from "@/store/user_functions.store";
import { ref } from "vue";
import type { IUser } from "@/store/models/user/user.model";
import type { IFunction } from "@/store/models/user/functions.model";
import type { IURequisition } from "@/store/models/teams/update-requisition.model";

const teamStore = useTeamStore();
const uFStore = useUserFunctionsStore();

const props = defineProps<{
  user: IUser;
  func?: IFunction;
  idTeam: number;
  onDeleteMemberEvent: () => void;
}>();

const isEditMode = ref(false);

async function deleteUserFromTeam(status_name: string) {
  let requis: IURequisition = {};
  requis.team_id = props.idTeam;
  requis.user_id = props.user.id;

  // заявка меняет статус
  let requisitions = await teamStore.fetchRequisitions(requis);

  if (requisitions && requisitions[0]?.id) {
    let requis: IURequisition = {};
    requis.id = requisitions[0].id;
    requis.status_name = status_name;

    await teamStore.updateRequisition(requis);
  }

  // remove user functions
  let uFs = await uFStore.findUserFunctions(props.idTeam, props.user.id ?? -1);

  for (const uF of uFs) {
    // удалить роль в коллективе
    await uFStore.removeUserFunction(uF.id);
  }

  props.onDeleteMemberEvent();
}

// TODO реализовать метод для сохранения изменений
// async function saveChanges(
//   education_group: string,
//   title_role: string,
//   id: number,
// ) {
//   await userStore.update(education_group, title_role, id);
//   isEditMode.value = false;
// }

async function cancelEditMode() {
  isEditMode.value = false;
}
</script>

<style lang="scss" scoped>
@import "@/assets/globals.scss";

.member-card {
  width: 100%;
  margin-bottom: 12px;
  background: rgb(243, 243, 243);
  border-radius: 25px 20px 20px 25px;
}

.member-info {
  width: 100%;
  padding: 19px 50px 19px 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  font-size: 16px;
  line-height: 24px;
}
</style>
