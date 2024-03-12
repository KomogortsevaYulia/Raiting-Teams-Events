<template>
  <!-- Modal -->
  <div
    class="modal fade bd-example-modal-lg"
    :id="id"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content px-3 py-4">
        <div class="modal-header text-center">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            <!-- редактирование или создание нвого колелктива -->
            <b v-if="isEditTeam">
              Редактировать коллектив {{ teamObj.shortname }}
            </b>
            <b v-else>Создать коллектив </b>
            <!-- если коллектив в архиве -->
            <sup v-if="teamObj.is_archive" class="text-bg-danger"
              >(В архиве)</sup
            >
            <!-- если он действующий -->
            <sup v-else class="text-bg-success"> (действующий)</sup>
          </h1>
          <div
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></div>
        </div>
        <div class="modal-body">
          <!-- Это вся обертка -->

          <div class="wrapper-team__create">
            <div v-if="!isEditTeam" class="alert alert-primary" role="alert">
              Прежде чем создать в системе новый коллектив, нужно утвердить его
              приказом!
            </div>

            <div
              v-if="teamStore.apiRequest.message || teamStore.apiRequest.error"
              class="alert alert-warning"
              role="alert"
            >
              {{ teamStore.apiRequest.message ?? teamStore.apiRequest.error }}
            </div>

            <!-- Форма с полями для создания -->
            <form
              class="form-team__create"
              @submit.prevent="isEditTeam ? updateTeam() : createTeam()"
            >
              <div class="create-filds">
                <div class="filds-area">
                  <input
                    type="text"
                    placeholder="Название коллектива"
                    v-model="title"
                    required
                  />
                  <!--  tags-->
                  <template v-if="can('can edit own teams')">
                    <div
                      class="col-auto position-relative align-items-center d-flex"
                      v-for="(tag, index) in teamObj?.tags"
                      v-bind:key="index"
                    >
                      <TagElem :text="tag" />
                      <div class="position-absolute top-0 end-0">
                        <font-awesome-icon
                          @click="deleteTag(index)"
                          :icon="['fas', 'circle-xmark']"
                          class="fa-lg btn-icon"
                        />
                      </div>
                    </div>

                    <!-- links-->
                    <div
                      class="col-auto position-relative align-items-center d-flex"
                      v-for="(link, index) in teamObj?.links"
                      v-bind:key="index"
                    >
                      <TagElem :text="link" />
                      <div class="position-absolute top-0 end-0">
                        <font-awesome-icon
                          @click="deleteLink(index)"
                          :icon="['fas', 'circle-xmark']"
                          class="fa-lg btn-icon"
                        />
                      </div>
                    </div>
                  </template>
                </div>
              </div>

              <input
                type="text"
                placeholder="Краткое название"
                v-model="shortname"
                required
              />

              <v-select
                v-if="can('can create teams')"
                placeholder="ФИО Руководителя или email"
                class="v-select"
                label="data"
                @input="onTextChange"
                :options="foundUsers"
                v-model="leaderSelect"
              ></v-select>

              <div v-if="can('can create teams')" class="row g-2 mb-4">
                <!-- selected leaders-->
                <div
                  class="col-auto position-relative align-items-center d-flex"
                  v-for="(leader, index) in leaders"
                  v-bind:key="index"
                >
                  <TagElem :text="leader.name" />
                  <div class="position-absolute top-0 end-0">
                    <font-awesome-icon
                      @click="deleteLeader(index)"
                      :icon="['fas', 'circle-xmark']"
                      class="fa-lg btn-icon"
                    />
                  </div>
                </div>
              </div>

              <div class="row" v-if="can('can create teams')">
                <div class="col-auto">
                  <!-- select direction -->
                  <select
                    class="form-select mb-3"
                    style="min-width: 80px"
                    aria-label="Default select example"
                    v-model="selectedDirection"
                  >
                    <option
                      v-for="direction in directions"
                      :value="direction.id"
                      v-bind:key="direction.id"
                    >
                      {{ direction.shortname }}
                    </option>
                  </select>
                </div>

                <div class="col">
                  <v-select
                    placeholder="Аудитория(кабинет)"
                    class="v-select"
                    label="name"
                    :options="foundAuditories"
                    v-model="auditorySelect"
                  ></v-select>
                </div>
              </div>

              <div class="row g-2 mb-4" v-if="can('can create teams')">
                <!-- selected cabinets-->
                <div
                  class="col-auto position-relative align-items-center d-flex"
                  v-for="(audit, index) in auditories"
                  v-bind:key="index"
                >
                  <TagElem :text="audit.name" />
                  <div class="position-absolute top-0 end-0">
                    <font-awesome-icon
                      @click="deleteAuditory(index)"
                      :icon="['fas', 'circle-xmark']"
                      class="fa-lg btn-icon"
                    />
                  </div>
                </div>
              </div>

              <div v-if="can('can create teams')" class="mb-2">
                <label for="formFile" class="form-label">загрузить устав</label>
                <input
                  class="form-control"
                  type="file"
                  id="formFile"
                  @change="(e) => handleFileUpload(e, false)"
                />
                <p v-if="isEditTeam && teamObj != null">
                  {{ teamObj.charter_team }}
                </p>
                <img
                  v-if="isEditTeam"
                  :src="charterTeamBase64"
                  style="width: 100px; height: 100px"
                  alt="Устав"
                />
              </div>

              <div v-if="can('can create teams')" class="mb-2">
                <label for="formFile1" class="form-label"
                  >загрузить документ(ы)</label
                >
                <input
                  class="form-control"
                  type="file"
                  id="formFile1"
                  @change="(e) => handleFileUpload(e, true)"
                />
                <p v-if="isEditTeam && teamObj != null">
                  {{ teamObj.document }}
                </p>
              </div>

              <textarea
                placeholder="Описание"
                v-model="description"
                required
              ></textarea>

              <!-- main photos -->
              <div
                class="row g-2 mb-4"
                v-if="can('can edit own teams') && isEditTeam"
              >
                <b>Заглавные фотографии: </b>
                <div
                  class="col-md-6 col-lg-4 col-12 position-relative align-items-center"
                  v-for="(img, index) in teamObj?.image"
                  v-bind:key="index"
                >
                  <AddImage
                    :handle-on-delete="handleOnDeleteAvatar"
                    :index="index"
                    :src="img"
                  />
                </div>
                <!--                    upload avatars-->
                <div class="col-auto d-flex align-items-center">
                  <div>
                    <input
                      class="form-control"
                      type="file"
                      id="formFile"
                      @change="(e) => handleAvatarUpload(e)"
                    />
                    <!--                      <FontAwesomeIcon icon="add" />-->
                    <!--                      Добавить изображение-->
                  </div>
                </div>
              </div>

              <!-- photo gallery -->
              <div
                class="row g-2 mb-4"
                v-if="can('can edit own teams') && isEditTeam"
              >
                <b>Фотографии из галереи: </b>
                <div
                  class="col-md-6 col-lg-4 col-12 position-relative align-items-center"
                  v-for="(teamPhoto, index) in teamObj?.team_photos"
                  v-bind:key="index"
                >
                  <AddImage
                    :handle-on-delete="handleOnDeletePhoto"
                    :index="index"
                    :src="teamPhoto.image"
                  />
                </div>
                <div class="col-auto d-flex align-items-center">
                  <input
                    class="form-control"
                    type="file"
                    id="formFile"
                    @change="(e) => handlePhotoUpload(e)"
                  />
                </div>
              </div>

              <div class="fuck-off-btn">
                <div class="row">
                  <div class="col">
                    <button type="submit">Сохранить коллектив</button>
                  </div>
                  <div class="col-auto" v-if="isEditTeam">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      @click="
                        archiveTeam(teamObj?.id ?? -1, !teamObj?.is_archive)
                      "
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Архивировать коллектив"
                    >
                      <font-awesome-icon icon="archive" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { onBeforeMount, ref, watch } from "vue";
import _ from "lodash";
import { useTeamStore } from "@/store/team_store";
import { useUserStore } from "@/store/user_store";
import UpdateTeamModel from "../../store/models/teams/update-team.model";
import type { ITeam } from "@/store/models/teams/team.model";
import { TeamRoles } from "@/store/enums/team_roles";
import { FilterUser } from "@/store/models/user.model";
import { useAuditoriesStore } from "@/store/schedule/cabinets_store";
import TagElem from "@/components/TagElem.vue";
import type { IScheduleSearch } from "@/store/models/schedule/schedule.model";
import { usePermissionsStore } from "@/store/permissions_store";
import AddImage from "@/components/AddImage.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const teamStore = useTeamStore();
const auditoryStore = useAuditoriesStore();

const permissions_store = usePermissionsStore();
const can = permissions_store.can;

const props = defineProps<{
  isEditTeam: boolean; //если модальное окно вызвано для редактирования (не создание нового коллектива)
  teamId: number;
  id: string;
  onSaveChanges: () => void;
}>();

const teamObj: Ref<ITeam> = ref({});

// values from form
const title = ref("");
const shortname = ref("");
const leaders = ref<{ id: number; name: string; email: string }[]>([]);
const tags = ref<string[]>([]);
const links = ref<string[]>([]);

const searchTxtUser = ref();
const auditories = ref<{ id: number; name: string }[]>([]);

const description = ref("");

// files
const charterTeamFile = ref();
const documentFile = ref();

const charterTeamBase64 = ref();

// найденные юзеры
const foundUsers = ref();
const foundAuditories = ref();

// найденные направления из системы
const directions = ref([{ id: 0, shortname: "Все" }]); //дата
const selectedDirection = ref(0);

//получить юзеров
const timerFetchUsers = _.debounce(() => {
  getUsers();
}, 300);

const leaderSelect = ref();
const auditorySelect = ref();

//отслеживать изменение текста для v-select
async function onTextChange(e: InputEvent) {
  const el = e.target as HTMLInputElement;
  searchTxtUser.value = el.value;
  timerFetchUsers();
}

async function deleteLeader(index: number) {
  leaders.value.splice(index, 1);
}

async function deleteTag(index: number) {
  tags.value.splice(index, 1);
}

async function deleteLink(index: number) {
  links.value.splice(index, 1);
}

// CABINETS------------------------------------------------------------------------------------------

async function deleteAuditory(index: number) {
  auditories.value.splice(index, 1);
}

watch(
  () => props.teamId,
  async (value) => {
    if (value) {
      await fetchTeam(value);
    }
  },
);

// on auditory selected
watch(
  () => auditorySelect.value,
  async (value) => {
    if (value?.id && !auditories.value.includes(value?.id)) {
      auditories.value.push({ id: value.id, name: value.name });
    }
  },
);
// CABINETS------------------------------------------------------------------------------------------

// on user selected
watch(
  () => leaderSelect.value,
  async (value) => {
    if (value?.id && !leaders.value.includes(value?.id)) {
      leaders.value.push({
        id: value.id,
        name: value.name,
        email: value.email,
      });
    }
  },
);

onBeforeMount(() => {
  fetchTeam(props.teamId);
  fillForm();
});

async function fetchTeam(id: number) {
  if (id) {
    teamObj.value = await teamStore.fetchTeam(id);
  } else teamObj.value = {};

  let ldrs = getLeaders(teamObj.value);
  leaders.value = ldrs?.map((el) => {
    return {
      id: el?.id ?? -1,
      name: el?.fullname ?? "",
      email: el?.email ?? "",
    };
  });

  await fillForm();
}

onBeforeMount(async () => {
  await getUsers();
  await getAuditories();

  await getDirections();
});

async function getDirections() {
  let data = await teamStore.fetchDirections();

  let dir = data[0];
  let arrayData = [];
  arrayData[0] = { id: 0, shortname: "Все" };

  for (let i = 0; i < dir.length; i++) {
    arrayData[i + 1] = dir[i];
  }

  directions.value = arrayData;
}

// заполнить форму данными
async function fillForm() {
  // make files is empty
  charterTeamFile.value = null;
  documentFile.value = null;
  leaderSelect.value = null;

  if (teamObj.value) {
    let t = teamObj.value;

    selectedDirection.value = t.id_parent ? t.id_parent.id ?? 0 : 0;
    title.value = t.title ?? "";
    shortname.value = t.shortname ?? "";
    description.value = t.description ?? "";
    // get auditories
    if (t.cabinets && t.cabinets.length > 0) {
      let resCabinets = await auditoryStore.getCabinets({
        ids: t.cabinets,
      });

      let cabinets = resCabinets?.cabinets;

      auditories.value =
        cabinets.length > 0
          ? cabinets?.map((cab: { id: number; name: string }) => {
              return cab;
            })
          : [];
    } else auditories.value = [];

    //если коллектив не задан , то очистить все поля
  } else {
    title.value = shortname.value = description.value = "";
    auditorySelect.value = null;
    selectedDirection.value = 0;
    auditories.value = [];
  }
}

// получить всех пользователей и выбрать из них нужных
async function getUsers() {
  let filterUser = new FilterUser();
  filterUser.limit = 5;
  filterUser.searchTxt = searchTxtUser.value;
  let r = await useUserStore().getUsersByNameEmail(filterUser);

  //получить всех найденных юзеров
  let users = r.data[0];

  let arrayData = [];
  for (let i = 0; i < users.length; i++) {
    let user = users[i];

    arrayData[i] = {
      name: user.fullname,
      email: user.email,
      id: user.id,
      data: `${user.fullname} ${user.email}`,
    };
  }
  foundUsers.value = arrayData;
}

async function getAuditories() {
  let sch: IScheduleSearch = { ids: auditories.value.map((el) => el.id) };
  let r = await auditoryStore.getCabinets(sch);
  foundAuditories.value = r.cabinets;
}

//создать коллектив
async function createTeam() {
  //create team
  await teamStore
    .createTeam(
      selectedDirection.value,
      title.value,
      description.value,
      shortname.value,
      leaders.value.map((el) => el.id),
      auditories.value.map((item) => item.id),
      charterTeamFile.value,
      documentFile.value,
    )
    .then(() => {
      props.onSaveChanges();
    });
}

// обночить коллектив
async function updateTeam() {
  //create team
  const uT = new UpdateTeamModel();
  uT.id_parent = selectedDirection.value;
  uT.cabinets = auditories.value.map((el) => el.id);
  uT.description = description.value;
  uT.id = teamObj.value.id ?? -1;
  uT.leaders = leaders.value.map((el) => el.id);
  uT.shortname = shortname.value;
  uT.title = title.value;
  uT.documentPath = teamObj.value.document ?? "";
  uT.charterPath = teamObj.value.charter_team ?? "";
  // files
  uT.fileUstav = charterTeamFile.value;
  uT.fileDocument = documentFile.value;

  await teamStore.updateTeam(uT);
  await fetchTeam(props.teamId);
}

async function handleFileUpload(
  event: { target: { files: File[] } },
  document: boolean,
) {
  const file = event.target.files[0];

  if (!document) charterTeamFile.value = file;
  else {
    documentFile.value = file;
  }
}

async function handleAvatarUpload(event: { target: { files: File[] } }) {
  const file = event.target.files[0];
  await teamStore.addImage(props.teamId, file).then(() => {
    fetchTeam(props.teamId);
  });
}

async function handlePhotoUpload(event: { target: { files: File[] } }) {
  const file = event.target.files[0];
  await teamStore.addPhoto(props.teamId, file).then(() => {
    fetchTeam(props.teamId);
  });
}

// архивировать коллектив
async function archiveTeam(id: number, isArchive: boolean) {
  await teamStore.archiveTeam(id, isArchive).then(() => {
    teamObj.value.is_archive = isArchive;
  });
}

function getLeaders(team: ITeam) {
  const ldrs = [];
  if (!team.functions) return [];

  for (let i = 0; i < team.functions.length; i++) {
    const func = team.functions[i];
    if (func.title === TeamRoles.Leader && func.userFunctions) {
      for (let io = 0; io < func.userFunctions.length; io++) {
        const userFunc = func.userFunctions[io];
        ldrs.push(userFunc.user);
      }
    }
  }

  return ldrs;
}

async function handleOnDeletePhoto(index: number) {
  if (teamObj.value.team_photos) {
    let photo = teamObj.value.team_photos[index];
    await teamStore.deletePhotos(photo.id).then(() => {
      fetchTeam(props.teamId);
    });
  }
}

async function handleOnDeleteAvatar(index: number) {
  if (teamObj.value.image && teamObj.value.id) {
    let img = teamObj.value.image[index];
    await teamStore.deleteAvs(teamObj.value.id, img).then(() => {
      fetchTeam(props.teamId);
    });
  }
}
</script>

<style lang="scss" scoped>
.btn-add {
  padding: var(--padding-form);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: 0.3s;
}

.btn-close {
  &:hover {
    background-color: var(--main-color-hover);
    transition: 0.3s;
  }
}

.wrapper-team__create {
  .form-team__create {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 15px;
    border: var(--main-border-card);

    .fuck-off-btn {
      display: flex;
      justify-content: end;
    }

    .create-filds {
      display: block;
      padding: 2rem;
      width: 100%;

      .filds-area {
        display: flex;
        flex-direction: column;

        .v-select {
          padding-bottom: 1rem;
        }

        textarea {
          min-height: 20%;
          min-width: 100%;
          max-width: max-content;
          margin-bottom: 1rem;
        }

        input {
          margin-bottom: 1rem;
        }
      }
    }
  }
}
</style>
