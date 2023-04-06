<script setup lang="ts">
import axios from 'axios';
import { onBeforeMount, ref } from 'vue';

import { useRoute } from "vue-router";

const route = useRoute()
const data = ref()

onBeforeMount(async () => {
    fetchCurrentEvent();
})

async function fetchCurrentEvent() {
    // я эту хуйню позже перепишу
    await axios.get('/api/events/external/' + route.params.id)
        .then((respose: any) => {
            data.value = respose.data
        })
}
</script>



<template>
    <div class="col">
        <div class="imgEvent full-width  mb-5">
            <img src="../assets/icon/stairway.jpg" class="rounded w-100 d-block" style="object-fit: cover;">
        </div>
        <div class="eventInfo row">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />

            <h1 class="ps-0">{{ data.title }}</h1>

            <div class="teg__container ps-0">
                <div class="teg">
                    Offline
                </div>
                <div class="teg">
                    Межвузовский
                </div>
            </div>
            <div class="rating d-flex ms-5 ">
                <span class="star" data-value="1">&#9733;</span>
                <span class="star" data-value="2">&#9733;</span>
                <span class="star" data-value="3">&#9733;</span>
                <span class="star" data-value="4">&#9733;</span>
                <span class="star" data-value="5">&#9733;</span>
                <p class="ms-3">
                    Нет оценок
                </p>
            </div>
            <div class="line ">

            </div>
            <div class="row ">
                <div class="wrapperContent col align-items-center ps-0">
                    <div class="row mb-5">
                        <h2>О мероприятии</h2>
                        <p>
                            {{ data.description }}
                        </p>
                    </div>
                    <div class="row">
                        <div class="email d-flex align-items-center  mb-4">
                            <i class="fas fa-envelope fa-xl"></i>
                            <p class="mb-0 ms-3 fs-5 ">realmail@gmail.com</p>
                        </div>
                        <div class="number d-flex align-items-center mb-4">
                            <i class="fas fa-phone fa-xl"></i>
                            <p class="mb-0 ms-3 fs-5">+7 (999)-999-99-99</p>

                        </div>
                        <div class="user d-flex align-items-center ">
                            <i class="fas fa-paper-plane fa-xl"></i>
                            <p class="mb-0 ms-3 fs-5">@user</p>

                        </div>
                        <div class="address d-flex align-items-center">
                            <i class="fas fa-location-dot fa-xl ms-1"></i>
                            <p class="mb-0 ms-4 fs-5"> 2-я Красноказачья ул., 3-а, Иркутск, Иркутская обл., 664007</p>
                        </div>

                    </div>
                </div>

                <div class="map col">
                    <img src="../assets/icon/event3.png" class="rounded mx-auto d-block">
                </div>

                <div class="row ">
                    <div class="down d-flex align-items-center pb-5 pt-5 ">
                        <button type="button" class="button ">Подать заявку</button>
                        <p class="date">01.04.2021</p>
                    </div>
                </div>
            </div>



        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/globals.scss';

.full-width {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
}


.email {

    color: #004D61;
    margin-bottom: 1em;
}

.number {
    color: #004D61;
    margin-bottom: 1em;
}

.user {

    color: #004D61;
    margin-bottom: 1em;


}

.address {
    color: #004D61;
    margin-bottom: 1em;

    p {
        margin-right: 10em;
    }
}


.eventInfo {

    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
    width: 102%;
    height: auto;
    justify-content: center;
    border-radius: 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition: all .5s;

    h1 {

        font-size: 1.8em;
        margin-top: 1rem;
        padding-top: 1em;

        margin-bottom: 1rem;
        margin-inline-start: 3.8em;
        margin-inline-end: 1.71rem;

    }



}

.down {

    display: flex;
    justify-content: space-between;

    .date {
        text-align: end;
        font-size: 1.6rem;
        font-weight: 100;
        margin: 0;
    }

    .button {

        background-color: #FF502F;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        cursor: pointer;

        &:hover {
            background: var(--main-color-hover);
            transition: 0.3s;
        }
    }

}

.line {

    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1em;
    background-color: #D9D9D9;
    width: 93.5%;
    height: 1px;
}

.imgEvent {

    // margin-inline-start: -7.8em ;
    margin-inline-end: 0em;



    img {

        height: 20em;
    }
}

.map {


    img {
        width: 540px;
        height: 540px;

    }

}

.eventContainer {

    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;


}

.wrapperContent {

    font-size: 1.17rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-inline-start: 1.72rem;
    margin-inline-end: 1.71rem;

    h2 {
        font-size: 1.0em;


    }

}

.teg__container {

    padding-top: 1em;
    font-family: 'Montserrat';
    font-style: normal;
    color: #348498;
    font-size: 1rem;
    justify-content: space-between;
    margin-inline-start: 5rem;

    margin-bottom: 2em;

    .teg {

        display: inline-block;
        background-color: #9DD9D2;
        padding: 0.6rem;
        line-height: 20px;
        border-radius: 0.6rem;
        margin: 0 0.6rem 0 0;
    }
}
</style>