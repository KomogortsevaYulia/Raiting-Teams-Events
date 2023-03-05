<script setup lang="ts">

import modal from '@/components/Modal.vue';
import { onBeforeMount, ref } from 'vue';
import _ from 'lodash'
import 'vue-select/dist/vue-select.css';
import { useTeamStore } from '@/store/team_store';
import { useUserStore } from '@/store/user_store';


const isModalVisible = ref(false)


function showModal() {
  isModalVisible.value = true;
}

function closeModal() {
  isModalVisible.value = false;
}


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
  <button class="btn button-custom" type="button" @click="showModal">
    Создать коллектив
  </button>

  <modal v-show="isModalVisible" @close="closeModal">
    <template v-slot:header>
      <h3>Создать коллектив</h3>
    </template>
    <template v-slot:body>

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

                <v-select placeholder="ФИО Руководителя или email" class="v-select" label="data" @input="onTextChange" :options="foundUsers"
                  v-model="optionSelect"></v-select>

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


    </template>
  </modal>
</template>

<style lang="scss">
@import '@/assets/teams/teams.scss';
</style>