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
      <div class="block date">
        <FontAwesomeIcon icon="calendar" />
        25 сен - 1 окт 2023
        <FontAwesomeIcon icon="angle-down" />
      </div>
      <div class="block order">
        <FontAwesomeIcon icon="sort" />
        Сначала новые
        <FontAwesomeIcon icon="angle-down" />
      </div>
    </div>
    <div class="news-card" v-for="news in newsList" :key="news.id">
      <div class="image-container">
        <img :src="news.imageUrl" alt="" />
      </div>
      <div class="text-container">
        <div class="title">{{ news.title }}</div>
        <div class="description">{{ news.description }}</div>
        <div class="date">07.03.2022</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const props = defineProps<{ team: any; }>();

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
  display: flex;
  flex-direction: column;
  align-items: center;

  .filters {
    width: 100%;
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
      width: 40%;
    }

    .date {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 25%;
    }

    .order {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 25%;
    }
  }

  .news-card {
    display: flex;
    align-items: center;
    height: 200px;
    border: 1px solid #d8d8d8;

    margin-bottom: 20px;
    border-radius: 15px;

    img {
      height: 200px;
      width: 300px;
      border-radius: 15px;
      object-fit: cover;
      overflow: hidden;
    }

    .date {
      text-align: right;
      font-weight: bold;
      font-size: 10px;
      color: #7d7d7d;
    }

    .title {
      font-weight: bold;
      margin-bottom: 10px;
    }

    .description {
      text-align: justify;
      font-size: 12px;
    }

    .text-container {
      flex: 1;
      padding: 25px;
    }
  }
}
</style>