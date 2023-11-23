<template>
  <div class="p-4 justify-content-center d-flex align-items-center fs-6">
    <div v-if="loading">
      <LoadingElem size-fa-icon="" />
    </div>
    <div v-else>
      <div v-if="!errMsg">
        <span class="me-2">Авторизация прошла успешно</span>
        <font-awesome-icon
          :icon="['fas', 'circle-check']"
          class="fa-2xl text-success"
        />
      </div>
      <div v-else>
        <span class="me-2"> {{ errMsg }}</span>
        <font-awesome-icon
          :icon="['fas', 'circle-xmark']"
          class="fa-2xl text-danger"
        />
      </div>
        <div class="my-4">Перенаправление через {{ timer }} сек.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { onBeforeMount, ref, watch } from "vue";
import { usePermissionsStore } from "@/store/permissions_store";
import LoadingElem from "@/components/LoadingElem.vue";
import { useRouter } from "vue-router";
import _ from "lodash";

const router = useRouter();

const permissionsStore = usePermissionsStore();

const route = useRoute();
const code = String(route.query.code);
const errMsg = ref("");
const loading = ref(false);
const redirectTime = 3000; //time before redirect
const timer = ref(0); // timer for visualization before redirection

onBeforeMount(() => {
  loginBitrix();
});

// make timer for visualization change
watch(
  () => timer.value,
  async () => {
    if (timer.value > 0) countTimer();
  },
);

const countTimer = _.debounce(() => {
  timer.value--;
}, 1000);

const redirectTimer = _.debounce((login: boolean) => {
  redirectPage(login);
}, redirectTime);

function redirectPage(login: boolean) {
  let namePage = login ? "Login" : "News";
  router.push({ name: namePage });
}

async function loginBitrix() {
  loading.value = true;
  let redirectOnLogin = true;
  try {
    await permissionsStore.loginCampus(code);
    redirectOnLogin = false;
  } catch (e) {
    errMsg.value = String(e);
  }
  redirectTimer(redirectOnLogin);
  timer.value = redirectTime / 1000;

  loading.value = false;
}
</script>

<style scoped lang="scss"></style>
