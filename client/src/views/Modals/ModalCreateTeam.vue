<script setup lang="ts">

import { onBeforeMount, ref } from 'vue';
import _ from 'lodash'
import { useTeamStore } from '@/store/team_store';
import { useUserStore } from '@/store/user_store';


// values from form
const title = ref();
const shortname = ref();
const userLeader = ref();
const description = ref();

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

onBeforeMount(async () => {
  await getUsers()
})

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
  responseMsg.value = await useTeamStore().createTeam(title.value, description.value,
    shortname.value, userId)

  // console.log(newTeam)
}
</script>

<template>
  <!-- Button trigger modal -->
  <button type="button" class="button-custom" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Создать коллектив
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content px-3 py-4">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Создать коллектив</h1>
          <button type="button" class=" button-custom btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- Это вся обертка -->
          <div class="wrapper-team">

            <div class="wrapper-team__create">
              <p>Прежде чем создать в системе новый коллектив, нужно
                утвердить его приказом!</p>

              {{ responseMsg }}
              <!-- Форма с полями для создания -->
              <form class="form-team__create" @submit.prevent="createTeam()">
                <div class="create-filds">

                  <div class="filds-area">
                    <input type="text" placeholder="Название коллектива" v-model="title" required>
                    <input type="text" placeholder="Краткое название" v-model="shortname" required>

                    <v-select placeholder="ФИО Руководителя или email" class="v-select" label="data" @input="onTextChange"
                      :options="foundUsers" v-model="optionSelect"></v-select>

                    <!-- <input type="text" placeholder="ФИО руководителя" v-model="userLeader" required> -->
                    <textarea placeholder="Опишите проект" v-model="description" required></textarea>
                  </div>

                  <div class="fuck-off-btn">
                    <!--  v-on:click="showCreate = false" -->
                    <button type="submit">Создать коллектив</button>
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
  </div>
</template>

<style lang="scss">
@import '@/assets/teams/teams.scss';
@import 'vue-select/dist/vue-select.css';
</style>