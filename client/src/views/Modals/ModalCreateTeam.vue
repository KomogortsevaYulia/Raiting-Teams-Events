<script setup lang="ts">

import { computed, onBeforeMount, ref, watch } from 'vue';
import _ from 'lodash'
import { useTeamStore } from '@/store/team_store';
import { useUserStore } from '@/store/user_store';
import { faDharmachakra } from '@fortawesome/free-solid-svg-icons';
import UpdateTeam from './UpdateTeam';

const teamStore = useTeamStore();

const props = defineProps<{
  isEditTeam: boolean, //если модальное окно вызвано для редактирования (не создание нового коллектива)
  team: any
}>()

// values from form
const title = ref("");
const shortname = ref("");
const userLeader = ref();
const cabinet = ref("");

const charterTeam = ref();
const document = ref();

const description = ref("");

// files
const charterTeamFile = ref();
const documentFile = ref();

const oldUserId = ref(-1)


// сообщение об ошибках
const responseMsg = ref();

// найденные юзеры
const foundUsers = ref();

//получить юзеров
const func = _.debounce(() => {
  getUsers()
}, 300)

const optionSelect = ref()

//отслеживать изменение текста для v-select 
async function onTextChange(e: any) {
  userLeader.value = e.target.value
  optionSelect.value = null
  func()
}

watch(
  () => props.team, (value, previousValue) => {
    fillForm()

    if (props.team != null) {

    }

  })

onBeforeMount(async () => {
  await getUsers()

})

async function fillForm() {

  responseMsg.value = ""

  if (props.team != null) {
    let t = props.team

    title.value = t.title
    shortname.value = t.shortname
    description.value = t.description
    cabinet.value = t.cabinet

    // alert(t.functions [0].userFunctions[0].id)
    //если есть руководитель коллектива
    if (t.functions != null && t.functions[0].userFunctions != null) {
      let uF = t.functions[0].userFunctions[0].user
      optionSelect.value = { name: uF.username, email: uF.email, id: uF.id, data: uF.username + " " + uF.email }
      oldUserId.value = uF.id
    }

  } else { //если коллектив не задан , то очистить все поля
    title.value = shortname.value = description.value
      = cabinet.value = ""
    optionSelect.value = null
  }

}

// получить всех пользователей и выбрать из них нужных
async function getUsers() {

  let limit = 5
  let r = await useUserStore().getUsersByNameEmail(limit,
    userLeader.value, userLeader.value)

  //получить всех найденных юзеров
  let users = r.data

  let arrayData = []
  for (let i = 0; i < (users).length; i++) {
    let user = (users)[i]

    arrayData[i] = { name: user.fullname, email: user.email, id: user.id, data: `${user.fullname} ${user.email}` };
  }
  foundUsers.value = arrayData

}

//создать коллектив
async function createTeam() {

  let userId = -1
  //проверить является id числом или нет и выбрана ли опция
  if (!optionSelect.value || isNaN(optionSelect.value.id)) {
    responseMsg.value = "такого пользователя нет " + userId
    return
  } else { userId = optionSelect.value.id }

  //create team
  responseMsg.value = await teamStore.createTeam(title.value, description.value,
    shortname.value, userId)

  // console.log(newTeam)
}

// обночить коллектив
async function updateTeam() {

  let newUserId = -1
  //проверить является id числом или нет и выбрана ли опция
  if (!optionSelect.value || isNaN(optionSelect.value.id)) {
    responseMsg.value = "такого пользователя нет " + newUserId
    return
  } else { newUserId = optionSelect.value.id }

  //create team
  const uT = new UpdateTeam()
  uT.cabinet = cabinet.value
  uT.description = description.value
  uT.id = props.team.id
  uT.oldUserId = oldUserId.value
  uT.newUserId = newUserId
  uT.shortname = shortname.value
  uT.title = title.value

  responseMsg.value = await teamStore.updateTeam(uT)

  // console.log(newTeam)
}


async function handleFileUstavUpload(event: any) {
  console.log("filefffffff ")
  const file = event.target.files[0];

  // Get file size
  const fileSize = Math.round((file.size / 1024 / 1024) * 100) / 100
  // Get file extension
  const fileExtention = file.name.split(".").pop()
  // Get file name
  const fileName = file.name.split(".").shift()
  // Check if file is an image
  const isImage = ["jpg", "jpeg", "png", "gif"].includes(fileExtention);
  // Print to console
  console.log(fileSize, fileExtention, fileName, isImage);
}


// архивировать коллектив
async function archiveTeam(id: number, isArchive: boolean) {


  let res = await teamStore.archiveTeam(id, isArchive)
  responseMsg.value = res.responseMsg

  if (res.isOK) props.team.is_archive = isArchive
}

</script>

<template>
  <!-- Modal -->
  <div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content px-3 py-4">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">

            <!-- редактирование или создание нвого колелктива -->
            <b v-if="isEditTeam"> Редактировать коллектив </b>
            <b v-else>Создать коллектив </b>
            
            <!-- если коллектив в архиве -->
            <sup v-if="team!=null && team.is_archive!=null && team.is_archive" class="text-bg-danger"> (В архиве)</sup>
            <!-- если он действующий -->
            <sup v-else-if="team!=null" class="text-bg-success"> (действующий)</sup>

          </h1>
          <button type="button" class=" btn-custom-secondary btn-close" data-bs-dismiss="modal"
            aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Это вся обертка -->

          <div class="wrapper-team__create">
            <p v-if="isEditTeam">
              Прежде чем создать в системе новый коллектив, нужно
              утвердить его приказом!</p>

            <div v-if="responseMsg" class="alert alert-primary" role="alert">
              {{ responseMsg }}
            </div>

            <!-- Форма с полями для создания -->
            <form class="form-team__create" @submit.prevent="isEditTeam ? updateTeam() : createTeam()">
              <div class="create-filds">

                <div class="filds-area">
                  <input type="text" placeholder="Название коллектива" v-model="title" required>
                  <input type="text" placeholder="Краткое название" v-model="shortname" required>

                  <v-select placeholder="ФИО Руководителя или email" class="v-select" label="data" @input="onTextChange"
                    :options="foundUsers" v-model="optionSelect"></v-select>

                  <input type="text" placeholder="Аудитория(кабинет)" v-model="cabinet" required>

                  <div class="mb-2">
                    <label for="formFile" class="form-label">загрузить устав</label>
                    <input class="form-control" type="file" id="formFile" @change="handleFileUstavUpload">
                  </div>

                  <div class="mb-2">
                    <label for="formFile1" class="form-label">загрузить документ(ы)</label>
                    <input class="form-control" type="file" id="formFile1">
                  </div>

                  <!-- <input type="text" placeholder="ФИО руководителя" v-model="userLeader" required> -->
                  <textarea placeholder="Опишите проект" v-model="description" required></textarea>



                </div>

                <div class="fuck-off-btn">
                  <!--  v-on:click="showCreate = false" -->
                  <div class="row">
                    <div class="col"> <button type="submit">Сохранить коллектив</button>
                    </div>
                    <div class="col-auto" v-if="isEditTeam">
                      <button type="button" class="btn btn-secondary" @click="archiveTeam(team.id, !team.is_archive)"
                        data-bs-toggle="tooltip" data-bs-placement="top" title="Архивировать коллектив">
                        <font-awesome-icon icon="archive" />
                      </button>

                    </div>
                  </div>

                </div>

              </div>
              <div class="create-wrapper-img">

              </div>


            </form>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" >
@import 'vue-select/dist/vue-select.css';


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
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        input {
          margin-bottom: 1rem;
        }
      }
    }

    .create-wrapper-img {
      width: 30%;
      border-radius: 0 1rem 1rem 0;
      background-color: #D9D9D9;
      background-image: url("https://i.playground.ru/p/9z2ux3Z5fFnMpL4gqI1gHw.jpeg");
      background-size: cover;
    }
  }
}
</style>