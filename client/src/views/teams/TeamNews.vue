<template>
  <!-- Блок с НОВОСТЯМИ -->
  <div class="news-panel">
    <div class="filters">
      <div class="block search">
        <div class="icon">
          <FontAwesomeIcon icon="search" />
        </div>
        Поиск по новостям
      </div>
      <div class="dropdown">
        <div
          class="block date"
          @click="isCalendarExpanded = !isCalendarExpanded"
          type="button"
        >
          <FontAwesomeIcon icon="calendar" />
            {{ calendarPicked.toISOString() }}
            <FontAwesomeIcon v-if="!isCalendarExpanded" icon="angle-down" />
          <FontAwesomeIcon v-if="isCalendarExpanded" icon="angle-up" />
        </div>
        <div :class="['calendar', { 'calendar-visible': isCalendarExpanded }]">
          <DatePicker
            v-model="calendarPicked"
            @click="isCalendarExpanded = !isCalendarExpanded"
          />
        </div>
      </div>
      <div class="dropdown">
        <div
          class="block order"
          @click="isOrderExpanded = !isOrderExpanded"
          type="button"
          id="dropdownOrder"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon="sort" />
          Сначала новые
          <FontAwesomeIcon v-if="!isOrderExpanded" icon="angle-down" />
          <FontAwesomeIcon v-if="isOrderExpanded" icon="angle-up" />
        </div>
        <ul class="block dropdown-menu" aria-labelledby="dropdownOrder">
          <li>
            <a class="dropdown-item" href="#">
              <FontAwesomeIcon icon="sort" />
              Сначала новые
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              <FontAwesomeIcon icon="sort" />
              Сначала старые
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <div class="card mb-3 rounded-3" v-for="news in newsList" :key="news.id">
        <div class="row g-0">
          <div class="col-lg-4">
            <img :src="news.imageUrl" class="img-fluid rounded-3" alt="" />
          </div>
          <div class="col-lg-8">
            <div class="card-body">
              <h5 class="card-title">{{ news.title }}</h5>
              <p class="card-text">{{ news.description }}</p>
              <p class="card-text">
                <small class="text-muted">07.03.2022</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { DatePicker } from "v-calendar";

const props = defineProps<{ team: any }>();

const isCalendarExpanded = ref(false);
const calendarPicked = ref(new Date());

const isOrderExpanded = ref(false);

const newsList = [
  {
    id: 1,
    title: "Выступление на встрече",
    description:
      '28 марта прошла встреча с Жугдэрдэмидийн Гуррагча, президентом Общества "Монголия - Россия", героем Советского Союза, первым космонавтом Монгольской Народной Республики (МНР).',
    imageUrl:
      "https://sun9-80.userapi.com/impg/v16lLdu-5nAWk8CFWXfgBTKbry5ySAaxpg07pA/_VQyOnsIS2U.jpg?size=1600x1067&quality=95&sign=29b4aa0494f355212449ccb5b2d438d4&type=album",
  },
  {
    id: 2,
    title: "Гала-концерт",
    description:
      "18 марта на сцене ИРНИТУ состоялся гала-концерт межрегионального многожанрового музыкального конкурса, посвящённого 75-летию со дня рождения поэта, композитора, телеведущего, Народного артиста России Геннадия Дмитриевича Заволокина.",
    imageUrl:
      "https://sun9-72.userapi.com/impg/3fBWXOId3AxVXmsor6HR50f5IOf7A0K-sp-iPA/GMnrC6OqDew.jpg?size=2560x1707&quality=95&sign=6a57308ab9691669faf9452b1f3e1f85&type=album",
  },
  {
    id: 3,
    title: "Выступление на ректорском приеме",
    description:
      "Ректорский прием, посвященный международному женскому дню, состоялся 7 марта. Наш коллектив также принял участие в концертной программе и поздравил прекрасную половину нашего университета с праздником!",
    imageUrl:
      "https://sun9-35.userapi.com/impg/qo49V2NSbiMOrTTqwmnJoffy7v7tzMv3pPs6Bg/44aBwrBj2Ak.jpg?size=1280x853&quality=95&sign=f8ced23a9edd565a4e14e94858a709c0&type=album",
  },
];
</script>

<style lang="scss" scoped>
.news-panel {
  .filters {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 11px;
    margin-bottom: 30px;

    .block {
      padding: 7px 15px;
      border: 1.5px solid rgba(61, 61, 61, 0.1);
      border-radius: 15px;
    }

    .search {
      .icon {
        margin-right: 10px;
      }

      display: flex;
      align-items: center;
    }

    .date {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    .order {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  @media screen and (min-width: 768px) {
    .news-card {
      display: flex;
      align-items: center;
    }
  }

  .news-card {
    .date {
      text-align: right;
      font-weight: bold;
      font-size: 10px;
      color: #7d7d7d;
    }

    .title {
      font-weight: bold;
    }

    .description {
      text-align: justify;
      font-size: 12px;
    }
  }
}

//for calendar
.calendar {
  display: none;
  position: absolute;
  right: 0px;
  background-color: #f9f9f9;
  min-width: 160px;
  z-index: 1;
  border-radius: 20px;

  &-visible {
    display: block;
  }
}
</style>
