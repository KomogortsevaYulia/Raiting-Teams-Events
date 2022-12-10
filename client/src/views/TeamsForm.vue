
<script setup lang="ts">import axios from 'axios';
import { onBeforeMount, ref } from 'vue';
import _ from 'lodash'
import 'vue-select/dist/vue-select.css';

// debounce отложеный запуск функции, задержа с какой частотой вызываться
// values from form
const title = ref();
const userLeader = ref();
const description = ref();

// непонятно за какое направление бует ответственый ответственен, как определяем?
const direction = "НИД";

const showCreate = ref(false);

// msgs about errors
const responseMsg = ref();


const foundUsers = ref();
const users = ref();

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

// watch(userLeader, () => {
//     func()
// })

onBeforeMount(async () => {
    await getUsers()
})

// получить всех пользователей и выбрать из них нудных
async function getUsers() {

    // console.log("userLeader " + userLeader.value)
    let limitVisibleUsers = 5
    let r = await axios.get("api/users", {
        params: {
            limit: limitVisibleUsers,
            fullname: userLeader.value,
        }
    });


    //получить всех юзеров
    // let r = await axios.get("api/users")
    users.value = r.data

    let arrayData = []
    // console.log("users " + users.value)

    for (let i = 0; i < (users.value).length; i++) {
        let user = (users.value)[i]

        // так как может быть десятки юзеров, у которых ФИО полностью совпадает нужен уникальный параметр поиска
        arrayData[i] = { name: user.fullname, email: user.email, id: user.id };
    }
    foundUsers.value = arrayData

}

//Создать ноыую функцию
async function createFunction(teamId: number) {

    let newFunction: any = await axios.post("api/users/functions", {
        title: 'руководитель',
        team: teamId
    })
        .catch((err) => {
            if (err.response) {
                responseMsg.value = err.response.data.message[0]
            }
        })

    return newFunction
}


//создать UserFunction
async function createUserFunction(functionId: number) {

    //post userFunctions
    let newUserFunction: any = await axios.post(`api/users/userFunctions`, {
        function: functionId,
        user: optionSelect.value.id
    })
        .catch((err) => {
            if (err.response) {
                responseMsg.value = err.response.data.message[0]
            }
        })


    return newUserFunction
}

async function getUserById(id: number) {

    // console.log("user")

    let user: any = await axios.get(`api/users/${id}`)
        .catch((err) => {
            if (err.response) {
                responseMsg.value = err.response.data.message[0]
            }
        })

    return user
}


//создать коллектив
async function createTeam() {

    responseMsg.value = "сохранено";

    // console.log("option " + optionSelect.value)

    let userId = 0
    if(!optionSelect.value || isNaN(optionSelect.value.id)) {
        responseMsg.value = "такого юзера нет " + userId
        return
    }else{userId = optionSelect.value.id}

    let userExist = getUserById(userId)

    // console.log("userExist " + userExist)
    if(userExist == null) return


    //create team
    let newTeam: any = await axios.post("api/teams", {
        title: title.value,
        description: description.value,
        direction: direction
    })
        .catch((err) => {
            if (err.response) {
                responseMsg.value = err.response.data.message[0]
            }
        })

    newTeam = newTeam.data
    // console.log("team " + newTeam.id)


    let newFunction: any = await createFunction(newTeam.id)

    newFunction = newFunction.data

    // console.log(newFunction)
    //post userFunctions

    let newUserFunction: any = await createUserFunction(newFunction.id)

    //console.log(newUserFunction.id)

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

                <!-- не могу без bootstrap, im so sorry -->
                <label for="">ФИО Руководителя</label>
                <v-select label="name" @input="onTextChange" :options="foundUsers" v-model="optionSelect"></v-select>

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
    <button v-if="!showCreate" v-on:click="showCreate = true">Создать коллектив</button>

</template>

<style>

</style>