<template>
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
        <button class="" @click="deleteRequisition()">Отозвать</button>
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

const requests: Ref<IRequisition[]> = ref([]);
const permissions_store = usePermissionsStore();

onBeforeMount(async () => {
  requests.value = await useTeamStore().getUserRequisitions(
    permissions_store.user_id,
  );
});

function deleteRequisition() {

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
