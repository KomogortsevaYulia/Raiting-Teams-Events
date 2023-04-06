
<script setup lang="ts">import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import _ from 'lodash'
import 'vue-select/dist/vue-select.css';

// values from form
const title = ref();
const shortname = ref();
const userLeader = ref();
const description = ref();

const showCreate = ref(false);

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

    let limitVisibleUsers = 5
    let r = await axios.get("api/users", {
        params: {
            limit: limitVisibleUsers,
            fullname: userLeader.value,
            email: userLeader.value
        }
    });


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

    responseMsg.value = "сохранено";

    let userId = -1
    //проверить является id числом или нет и выбрана ли опция
    if (!optionSelect.value || isNaN(optionSelect.value.id)) {
        responseMsg.value = "такого пользователя нет " + userId
        return
    } else { userId = optionSelect.value.id }

    //create team
    await axios.post("api/teams", {
        title: title.value,
        description: description.value,
        shortname: shortname.value,
        userID: userId
    })
        .catch((err) => {
            if (err.response) {
                responseMsg.value = err.response.data.message[0]
            }
        })

    // console.log(newTeam)
}

</script>

<template>

    <p>Прежде чем создать в системе новый коллектив, нужно
        утвердить его приказом!</p>

    {{ responseMsg }}
    <!-- Форма с полями для создания -->
    <form v-if="showCreate" class="form-team__create" @submit.prevent="createTeam()">
        <div class="create-filds">

            <div class="filds-area">
                <input type="text" placeholder="Название коллектива" v-model="title" required>
                <input type="text" placeholder="Краткое название" v-model="shortname" required>

                <!-- не могу без bootstrap, im so sorry -->
                <label for="">ФИО Руководителя или email</label>
                <v-select class="v-select" label="data" @input="onTextChange" :options="foundUsers"
                    v-model="optionSelect"></v-select>

                <!-- <input type="text" placeholder="ФИО руководителя" v-model="userLeader" required> -->
                <textarea placeholder="Опишите коллектив" v-model="description" required></textarea>
            </div>

            <div class="fuck-off-btn">
                <!--  v-on:click="showCreate = false" -->
                <button type="submit">Создать коллектив</button>
            </div>

        </div>
        <div class="create-wrapper-img">

        </div>


    </form>
    <button v-if="!showCreate" v-on:click="showCreate = true">Создать коллектив</button>

</template>

<style>
.v-select {
    margin: 15px 0px;
}
</style>