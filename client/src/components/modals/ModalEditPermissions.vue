<template>
  <ModalFull :modal-id="modalId">
    <template #header> Редактировать пользователя</template>

    <template #body>
      <div v-if="responseMsg" class="alert alert-warning" role="alert">
        {{ responseMsg }}
      </div>
      <!--     fullname   -->
      <div class="row my-2">
        <label for="userName" class="form-label">Имя пользователя</label>
        <input
          id="userName"
          class="form-control"
          type="text"
          :value="user?.fullname"
          disabled
        />
      </div>
      <!--        email-->
      <div class="row my-2">
        <label for="userName" class="form-label">Почта</label>
        <input
          id="userName"
          class="form-control"
          type="text"
          :value="user?.email"
          disabled
        />
      </div>
      <!--        permissions-->
      <div class="row my-2">
        <label for="userName">Разрешения</label>
        <div id="userName" class="row g-2" type="text">
            <div
                    class="col-auto create-perm"
            >
              <input type="text" placeholder="Добавить" v-model="newPermission">
                <font-awesome-icon :icon="['fas', 'circle-plus']" class="btn-icon fa-lg" @click="addPermission()" />
            </div>
          <div
            class="col-auto position-relative align-items-center d-flex"
            v-for="(perm, index) in user?.permissions"
            v-bind:key="index"
          >
            <TagElem :text="perm" />
            <div class="position-absolute top-0 end-0">
              <font-awesome-icon
                @click="deletePermission(perm, index)"
                :icon="['fas', 'circle-xmark']"
                class="fa-lg btn-icon"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="row g-2 justify-content-end mt-4">
        <div class="col-auto">
          <button
            class="btn-custom-primary"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            Отмена
          </button>
        </div>
        <div class="col-auto">
          <button
            class="btn-custom-accept"
            @click="saveChanges()"
          >
            Сохранить
          </button>
        </div>
      </div>
    </template>
    <body></body>
  </ModalFull>
</template>

<script setup lang="ts">
import ModalFull from "@/components/modals/ModalFull.vue";
import TagElem from "@/components/TagElem.vue";
import { useUserStore } from "@/store/user_store";
import { onBeforeMount, ref, watch } from "vue";
import { usePermissionsStore } from "@/store/permissions_store";

const props = defineProps<{
  userId: number; //задать id user
  modalId: string;
  onSaveChanges: () => void;
}>();

const userStore = useUserStore();
const permissionsStore = usePermissionsStore();

const user = ref();
const responseMsg = ref("");

const newPermission = ref("");

onBeforeMount(() => {
  fetchUser();
});

watch(
  () => props.userId,
  async () => {
    await fetchUser();
  },
);

async function fetchUser() {
  const res = await userStore.getUser(props.userId);
  user.value = res.data;
}

async function deletePermission(perm: string, index: number) {
  if (user.value.permissions && user.value.permissions.length > 0)
    user.value.permissions?.splice(index, 1);
}

async function saveChanges() {
  await permissionsStore
    .changePermissions(user.value.id, user.value.permissions)
    .then(async () => {
        responseMsg.value = "Сохранено";
        await fetchUser();
        props.onSaveChanges();
    })
    .catch((err) => {
      responseMsg.value = err;
    });
}
async function addPermission() {
    user.value.permissions = user.value.permissions ?? []
    user.value.permissions.push(newPermission.value)
}

</script>

<style lang="scss" scoped>
.create-perm{
  border: var(--main-border-card);
  border-radius: 50px;
  overflow: hidden;

 input{
   border: none;
  &:hover, &:focus, &:active {
     border: none;
     box-shadow: none;
   }
 }
}
</style>
