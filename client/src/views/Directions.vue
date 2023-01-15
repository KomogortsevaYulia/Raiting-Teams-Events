<script setup lang="ts">

import { onBeforeMount, ref } from 'vue';
import _ from 'lodash'
import { useUsersStore } from '@/store/users_store';
import { useTeamStore } from '@/store/team_store';
import 'vue-select/dist/vue-select.css';
import axios from 'axios';

const selectedItem = ref(0);
const showCreate = ref(false);


// сообщение об ошибках
const responseMsg = ref();

//хардкод для таблицы teams->shortname  
const itemList = [
    { name: "Научная", direction: "Наука" },
    { name: "Учебная", direction: "Учеба" },
    { name: "Спортивная", direction: "Спорт" },
    { name: "Общественная", direction: "Общество" },
    { name: "Культурно-творческая", direction: "Культура" }
]

const selectItem = (i: number) => {
    selectedItem.value = i
    responseMsg.value = ""
}

itemList.forEach((item, index) => {
    return (item == itemList[index])
})


const userLeader = ref();
// найденные юзеры
const foundUsers = ref();
//найти все направления с руководителями
const directions = ref()

//получить юзеров
const getUsersTimer = _.debounce(() => {
    getUsers()
}, 300)

const optionSelect = ref()

//отслеживать изменение текста для v-select 
async function onTextChange(e: any) {
    userLeader.value = e.target.value
    optionSelect.value = null
    getUsersTimer()
}

onBeforeMount(async () => {
    await getUsers()
    await getDirections()
})

//получить команды-направления
async function getDirections() {
    directions.value = await useTeamStore().fetchDirections()

}

// получить всех пользователей и выбрать из них нужных
async function getUsers() {

    let limitVisibleUsers = 5

    let r = await useUsersStore().fetchUsersLimited(limitVisibleUsers,
        userLeader.value, userLeader.value)

    //получить всех найденных юзеров
    let usersOptions = await useUsersStore().getUsersForOptions(r.data)

    foundUsers.value = usersOptions
}

//обновить лидера по направлению
async function updateLeaderDirection() {

    responseMsg.value = "сохранено";

    let userId = -1
    //проверить является id числом или нет и выбрана ли опция
    if (!optionSelect.value || isNaN(optionSelect.value.id)) {
        responseMsg.value = "такого пользователя нет " + userId
        return
    } else { userId = optionSelect.value.id }


    let teamId = -1

    //get team id for selected direction
    for (let index in (directions.value)) {
        let direction = directions.value[index]
        let selectedDirection = itemList[selectedItem.value].direction

        //есди найшли напрваления с которым работаем из данных в БД
        if (direction.teams_shortname.toLowerCase() === selectedDirection.toLowerCase()) {
            //сохраняем ид комманды
            teamId = direction.teams_id
        }
    }


    //переназначить лидера
    await axios.post("api/teams/reassignLeader", {
        team: teamId,
        userId: userId
    })
        .catch((err) => {
            if (err.response) {
                responseMsg.value = "что то пошло не так, когда переназначали лидера"
            }
        })

    //обновить список направлений
    await getDirections()
}


</script>

<template>
    <div class="wrapper-team">
        <!-- Навигация -->
        <div class="wrapper-team__navigation">
            <a @click="selectItem(index), showCreate = false" v-for="(item, index) in itemList" :key="index"
                :class="{active: index == selectedItem}">{{ item.name }}</a>
        </div>

        <div class="wrapper-team__create">

            <div class="content" v-if="(!showCreate)">
                <label>Руководитель направления</label>
                <!-- get leader of direction -->
                <div v-for="direction in directions">
                    <a v-if="(direction.teams_shortname).toString().toLowerCase()
                    === itemList[selectedItem].direction.toLowerCase()">{{ direction.user_fullname }}</a>
                </div>
                <div class="btn">
                    <button v-on:click="(showCreate = true)">Изменить</button>
                </div>
            </div>



        </div>


        <!-- Форма с полями для создания -->
        <div class="wrapper-team__create" v-if="showCreate">
            {{ responseMsg }}
            <form class="form-team__create" @submit.prevent="updateLeaderDirection()">

                <div class="create-filds">
                    <label for="">ФИО Руководителя или email</label>
                    <v-select class="v-select" label="data" @input="onTextChange" :options="foundUsers"
                        v-model="optionSelect"></v-select>

                    <div class="btn">
                        <button type="submit">Сохранить</button>
                    </div>
                </div>
            </form>
        </div>


    </div>
</template>

<style lang="scss">
@import '@/assets/teams/teams.scss';

.btn {
    padding-top: 1rem;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
}

a {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-align: center;
    padding-top: 1rem;
}
</style>