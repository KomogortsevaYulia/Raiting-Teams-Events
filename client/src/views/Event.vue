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
    <div class="wrapper-team">
        <!-- Обертка карточек коллективов -->
        <div class="full-width">
            <div class="wrapper-team__top-panel">
                <div class="text-area">
                    <div class="container">
                        <p>{{ data.title }}</p>
                        <button>Подать заявку</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="eventInfo row">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css" />

            <h1 class="">{{ data.title }}</h1>

            <div class="header__info">
                <div class="navigation-tags">
                    <div v-for="(item, index) in data.tags" :key="index" class="teg">
                        {{ item }}
                    </div>
                </div>
        
            </div>
            <div class="line ">

            </div>
            <div class="row ">
                <div class="wrapperContent col align-items-center ps-0">
                    <div class="row mb-5">
                        <h2>О мероприятии</h2>
                        <p class="event__description">
                            {{ data.description }}
                        </p>
                    </div>
                    <div class="row">
                        <div class="email d-flex align-items-center  mb-4">
                            <i class="fas fa-envelope fa-xl"></i>
                            <p class="mb-0 ms-3 fs-5 ">{{ data.email }}</p>
                        </div>
                        <div class="number d-flex align-items-center mb-4">
                            <i class="fas fa-phone fa-xl"></i>
                            <p  class="mb-0 ms-3 fs-5">{{ data.phone }}</p>

                        </div>
                        <div class="user d-flex align-items-center ">
                            <i class="fas fa-paper-plane fa-xl"></i>
                            <p v-for="(social_link, index) in data.social_links" :key="index" class="mb-0 ms-3 fs-5">{{social_link}}</p>

                        </div>
                        <div class="address d-flex align-items-center">
                            <i class="fas fa-location-dot fa-xl ms-1"></i>
                            <p class="mb-0 ms-4 fs-5">{{ data.location }}</p>
                        </div>

                    </div>
                </div>

                <div class="map col">
                    <img :src="data.images" class="rounded mx-auto d-block">
                </div>

                <div class="down">
                    <button type="button" class="button ">Подать заявку</button>
                    <p class="date">01.04.2021</p>
                </div>
            </div>



        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/globals.scss';

.header__info{
    margin-left: 4rem;
}

.rating{
    display: flex;
    flex-direction: row;
    
    p{
        margin-left: 1rem;
    }
}
.full-width {
    position: relative;
    margin-top: -1.5em;
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;

    .wrapper-team__top-panel {
        background-image: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.6) 10%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%), url('https://kartinkin.net/uploads/posts/2022-03/1646221438_8-kartinkin-net-p-pole-chudes-kartinki-8.jpg');
        background-size: 100% auto;
        background-color: rgba(0, 0, 0, 0.5);
        background-position: center;
        height: 350px;
        width: 100%;
        overflow: hidden;

        display: flex;
        justify-content: start;
        align-items: center;
        position: relative;

        .text-area {
            display: flex;
            align-items: center;
            background-size: 100% auto;
            height: 350px;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            color: white;
            opacity: 1;

            p {
                font-size: 36px;
                font-weight: 600;
                font-family: 'Montserrat', sans-serif;
                margin: 0;
                margin-bottom: 2rem;
            }
        }
    }
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

    box-shadow: 0 0 5px 2px rgb(221, 221, 221);
    width: 102%;
    height: auto;
    justify-content: center;
    border-radius: 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition: all .5s;
    margin-top: 2rem;
    margin-bottom: 5rem;

    h1 {

        font-size: 1.8em;
        margin-top: 1rem;
        padding-top: 1em;

        margin-bottom: 1rem;
        margin-left: 4rem;

    }
    .event__description{
        text-align: justify;
    }


}

.down {
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    margin-bottom: 2rem;

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
    margin-top: 1rem;

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

.navigation-tags {
    margin-bottom: 0.5rem;
    display: flex;

    .teg {
        margin-right: 1rem;
        background-color: #B7EAED;
        padding: 0.2rem 1rem;
        color: #348498;
        border-radius: 5px;
    }
}
</style>