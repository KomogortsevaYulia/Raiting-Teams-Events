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

    <div class="eventInfo row border-block">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css"
      />

      <h1 class="">{{ data.title }}</h1>

      <div class="header__info">
        <div class="row g-1 my-2">
          <Tag
            v-for="(item, index) in data.tags"
            class="col-auto me-2"
            :text="item"
            :key="index"
          />
        </div>
      </div>
      <div class="line"></div>
      <div class="row">
        <div class="wrapperContent col align-items-center ps-0">
          <div class="row mb-2">
            <h2>О мероприятии</h2>
            <p class="event__description">
              {{ data.description }}
            </p>
          </div>
          <div class="row">
            <h2>Дата начала/окончания мероприятия</h2>
            <p class="event__description">{{ dateStart }} — {{ dateEnd }}</p>
          </div>

          <div class="row">
            <h2>Дата начала/окончания регистрации</h2>
            <p class="event__description">
              {{ dateStartRegistration }} — {{ dateEndRegistration }}
            </p>
          </div>

          <div class="row">
            <div class="email d-flex align-items-center mb-4">
              <i class="fas fa-envelope fa-xl"></i>
              <p class="mb-0 ms-3 fs-5">{{ data.email }}</p>
            </div>
            <div class="number d-flex align-items-center mb-4">
              <i class="fas fa-phone fa-xl"></i>
              <p class="mb-0 ms-3 fs-5">{{ data.phone }}</p>
            </div>
            <div class="user d-flex align-items-center">
              <i class="fa-brands fa-vk fa-xl me-2"></i>
              <p
                v-for="(social_link, index) in data.social_links"
                :key="index"
                class="mb-0 ms-3 fs-5"
              >
                {{ social_link }}
              </p>
            </div>
            <div class="address d-flex align-items-center">
              <i class="fas fa-location-dot fa-xl ms-1"></i>
              <p class="mb-0 ms-4 fs-5">{{ data.event_place }}</p>
            </div>
          </div>
        </div>

        <div class="map col">
          <img :src="data.images" class="rounded mx-auto d-block" />
        </div>

        <div class="down">
          <button type="button" class="button">Подать заявку</button>
          <p class="date">14.03.2023</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { onBeforeMount, ref } from "vue";

import { useRoute } from "vue-router";
import moment from "moment";
import Tag from "@/components/TagElem.vue";

const route = useRoute();
const data = ref();
const dateStart = ref();
const dateEnd = ref();
const dateStartRegistration = ref();
const dateEndRegistration = ref();

onBeforeMount(async () => {
  await fetchCurrentEvent();
});

async function fetchCurrentEvent() {

  await axios
    .get("/api/events/external/" + route.params.id)
    .then((respose) => {
      data.value = respose.data;
      dateStart.value = moment(data.value.dateStart).format(
        "DD-MM-YYYY, HH:mm",
      );
      dateEnd.value = moment(data.value.dateEnd).format("DD-MM-YYYY, HH:mm");
      dateStartRegistration.value = moment(
        data.value.dateStartRegistration,
      ).format("DD-MM-YYYY, HH:mm");
      dateEndRegistration.value = moment(data.value.dateEndRegistration).format(
        "DD-MM-YYYY, HH:mm",
      );
    });
}
</script>

<style lang="scss" scoped>
.header__info {
  margin-left: 4rem;
}

.rating {
  display: flex;
  flex-direction: row;

  p {
    margin-left: 1rem;
  }
}

.full-width {
  position: relative;
  margin-top: -1.5em;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;

  .wrapper-team__top-panel {
    background-image: linear-gradient(
        to right,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.6) 10%,
        rgba(255, 255, 255, 0.5) 50%,
        rgba(255, 255, 255, 0) 100%
      ),
      url("https://kartinkin.net/uploads/posts/2022-03/1646938402_7-kartinkin-net-p-armrestling-kartinki-7.jpg");
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
        font-family: var(--font-family-title);
        margin-bottom: 2rem;
      }
    }
  }
}

.email {
  color: #004d61;
  margin-bottom: 1em;
}

.number {
  color: #004d61;
  margin-bottom: 1em;
}

.user {
  color: #004d61;
  margin-bottom: 1em;
}

.address {
  color: #004d61;
  margin-bottom: 1em;

  p {
    margin-right: 10em;
  }
}

.eventInfo {
  background: white;
  justify-content: center;
  border-radius: 1rem;
  transition: all 0.5s;
  margin-top: 2rem;
  margin-bottom: 5rem;

  h1 {
    font-size: 1.8em;
    margin-top: 1rem;
    padding-top: 1em;

    margin-bottom: 1rem;
    margin-left: 4rem;
  }

  .event__description {
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
}

.line {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1em;
  background-color: #d9d9d9;
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
    font-size: 1em;
  }
}
</style>
