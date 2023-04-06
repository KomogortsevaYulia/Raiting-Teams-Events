<script setup lang="ts">
import WIP from '@/components/WIP.vue';
import { onBeforeMount, ref } from 'vue';
import TeamsForm from './TeamsForm.vue'

import { useTeamStore } from "../store/team_store"
import axios from 'axios';
import { useRoute } from "vue-router";

const route = useRoute()

const TeamStore = useTeamStore();
const show = ref(true);
const currentPage = ref(1);

const data = ref()
const team = ref()

onBeforeMount(async () => {
  // fetchTeams()
  fetchCurrentTeams();
  fetchTeam()
})

// вытащить коллективы из бд 
// async function fetchTeams() {
//   data.value = await useTeamStore().fetchTeams()
// }
// вытащить коллективы из бд и отобразить их

async function fetchTeam() {
  team.value = await TeamStore.fetchTeam();
}

function setCurrentPage(page: number) {
  currentPage.value = page
}

function nextPage() {
  if (currentPage.value + 1 < 4) {
    currentPage.value++
  }
  else {
    currentPage.value = 1
  }
}

function previousPage() {
  if (currentPage.value - 1 > 0) {
    currentPage.value--
  }
  else {
    currentPage.value = 3
  }
}

async function fetchCurrentTeams() {
  // я эту хуйню позже перепишу
  await axios.get('/api/teams/' + route.params.id)
    .then((respose: any) => {
      data.value = respose.data
    })
}

////////////////////////////////////////////
const selectedItem = ref(0);
const showCreate = ref(false);

const itemList = [
  { name: "Главная" },
  { name: "Расписание занятий" },
  { name: "Участники" },
  { name: "Заявки" }
]

const selectItem = (i: number) => {
  selectedItem.value = i
}

itemList.forEach((item, index) => {
  return (item == itemList[index])
})
////////////////////////////////////////////

const itemLink = [{ name: "Тег", path: "/news" }, { name: "Тег 2", path: "/teams" },]

const newsList = [
  {
    id: 1,
    title: 'Выступление на встрече',
    description: '28 марта прошла встреча с Жугдэрдэмидийн Гуррагча, президентом Общества "Монголия - Россия", героем Советского Союза, первым космонавтом Монгольской Народной Республики (МНР).',
    imageUrl: 'https://sun9-80.userapi.com/impg/v16lLdu-5nAWk8CFWXfgBTKbry5ySAaxpg07pA/_VQyOnsIS2U.jpg?size=1600x1067&quality=95&sign=29b4aa0494f355212449ccb5b2d438d4&type=album'
  },
  {
    id: 2,
    title: 'Гала-концерт',
    description: '18 марта на сцене ИРНИТУ состоялся гала-концерт межрегионального многожанрового музыкального конкурса, посвящённого 75-летию со дня рождения поэта, композитора, телеведущего, Народного артиста России Геннадия Дмитриевича Заволокина.',
    imageUrl: 'https://sun9-72.userapi.com/impg/3fBWXOId3AxVXmsor6HR50f5IOf7A0K-sp-iPA/GMnrC6OqDew.jpg?size=2560x1707&quality=95&sign=6a57308ab9691669faf9452b1f3e1f85&type=album'
  },
  {
    id: 3,
    title: 'Выступление на ректорском приеме',
    description: 'Ректорский прием, посвященный международному женскому дню, состоялся 7 марта. Наш коллектив также принял участие в концертной программе и поздравил прекрасную половину нашего университета с праздником!',
    imageUrl: 'https://sun9-35.userapi.com/impg/qo49V2NSbiMOrTTqwmnJoffy7v7tzMv3pPs6Bg/44aBwrBj2Ak.jpg?size=1280x853&quality=95&sign=f8ced23a9edd565a4e14e94858a709c0&type=album'
  },
]

</script>

<template>
  <!-- Это вся обертка -->
  <div class="wrapper-team">

    <!-- Обертка карточек коллективов -->
    <div class="full-width">
      <div class="wrapper-team__top-panel">
        <div class="text-area container">
          <p>{{ data.title }}</p>
          <button>Подать заявку</button>
        </div>
      </div>
    </div>

    <div v-if="show" class="wrapper-team__content wrapper-content">

      <!-- Навигация -->
      <div class="wrapper-team__navigation">
        <a @click="selectItem(index), showCreate = false" v-for="(item, index) in itemList" :key="index"
          :class="{ active: index == selectedItem }">{{ item.name }}</a>
      </div>

      <div v-if="(selectedItem === 0)">
        <div>
          <div class="navigation-tags">
            <div v-for="(item, index) in data.tags" :key="index" class="teg">
              {{ item }}
            </div>
          </div>
          <hr>
          <div class="middle-panel">
            <div class="column-left">
              <h2>О коллективе</h2>
              {{ data.description }}
            </div>
            <div class="column-right">
              <div class="image-container">
                <img v-if="currentPage === 1" src="https://sun4-12.userapi.com/impg/7cihnmozwdZo5B63fTDkT2T3A7wDFjvi1BSlzQ/n_74trN1o-Y.jpg?size=2560x1707&quality=95&sign=1aa84293a83c6337204aa80f02b53440&type=album">
                <img v-if="currentPage === 2" src="https://sun9-58.userapi.com/impg/VXN1cqTuomn5r9s09OBiIJvGlBH-5r3wPDXkHA/Jpe2z5gYSw4.jpg?size=2560x1707&quality=95&sign=3e817f4cc607e03118139bf5b88a4319&type=album">
                <img v-if="currentPage === 3" src="https://sun9-54.userapi.com/impg/uU55dZtENJqdqiiJw4aCdVFwmqjhnaXTkDoAwg/-nAHiUtXYOY.jpg?size=2560x1707&quality=95&sign=2b5ab35fb1a53a17615833188fc8d519&type=album">
                <div class="page-arrows">
                  <div class="arrow-left" @click="previousPage">
                    <i class="fa fa-angle-left"></i>
                  </div>
                  <div class="page-buttons">
                    <button @click="setCurrentPage(1)" :class="{ active: currentPage === 1 }"></button>
                    <button @click="setCurrentPage(2)" :class="{ active: currentPage === 2 }"></button>
                    <button @click="setCurrentPage(3)" :class="{ active: currentPage === 3 }"></button>
                  </div>
                  <div class="arrow-right" @click="nextPage">
                    <i class="fa fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Блок с НОВОСТЯМИ -->
        <div>
          <div class="wrapper-team__section-name">
            <label class="active">Новости</label>
          </div>
          <div class="news-panel">
            <div class="news-card" v-for="news in newsList" :key="news.id">
              <div class="image-container">
                <img :src="news.imageUrl">
              </div>
              <div class="text-container">
                <h2 class="title">{{ news.title }}</h2>
                <label class="description">{{ news.description }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="(selectedItem === 1)">
        <WIP />
      </div>
      <div v-if="selectedItem === 2">
        <div v-for="item in team">
          <div class="wrapper">
            <div class="one">
              <img src='../assets/events/icon/banner.png'
                style=" width: 89px;height: 89px;background: #D9D9D9;border-radius: 25px;">
            </div>
            <div class="container" style="margin-left: 10px;">
              <a>{{ item.user.fullname }}</a>
              Группа обучения: <a>{{ item.user.education_group }}</a>
              Должность: <a>{{ item.function.title }}</a>
              <div class="con-1" style="margin-left: 1200px;">
                <button class="btn btn-primary" style="height: 30px; width: 30px;">Статус</button>
              </div>
              <div class="con-3" style="margin-left: 1200px;">
                <button class="btn btn-primary" style="height: 30px; width: 30px;">Редактировать</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/globals.scss';

.wrapper {
  display: flex;
  height: 89px;
  margin: 1rem;
  background: #d1cdcd;
  border-radius: 10px;
}

.wrapper-team {
  display: block;
  width: 100%;
  justify-content: center;

  // Это для баннера, что бы он был на фулл экран
  .full-width {
    position: relative;
    margin-top: -1.5em;
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  }

  .wrapper-team__top-panel {
    background-image: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.6) 10%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%), url('https://sun9-70.userapi.com/impg/hoGoGUgoywvDUTx8l17HB-5Rnpn3xKM7M1IP0Q/aRoqzu5at1s.jpg?size=2560x1707&quality=95&sign=f10e37ffd001af7dbd3cd5ab53041dee&type=album');
    background-size: 100% auto;
    background-position: center;
    height: 350px;
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;

    .text-area {
      // color: #FFF;
      // text-align: center;
      // color: rgb(8, 7, 7);
      // padding: 20px;
      // width: 40%;
      // border: 2px solid red;

      // border-radius: 10px;
      // display: flex;
      // flex-direction: column;
      // align-items: center;

      p {
        font-size: 36px;
        font-weight: 600;
        font-family: 'Montserrat', sans-serif;
        margin: 0;
        margin-bottom: 2rem;
      }
    }
  }

  .wrapper-team__navigation {
    padding-bottom: 2rem;

    a {
      cursor: pointer;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 14px;
      transition: 0.3s;
      color: #348498;
      margin-inline: 1rem;
      padding-bottom: 0.75rem;

      &:hover {
        color: var(--main-color);
      }
    }

    // Первому элементу ставим отступ = 0, чтобы не выпирал
    a:first-child {
      margin-left: 0;
    }

    .active {
      color: var(--main-color);
      border-bottom: var(--main-border-bottom);
    }
  }

  .navigation-tags {
    display: flex;

    .teg {
      margin-right: 1rem;
      background-color: #B7EAED;
      padding: 0.2rem 1rem;
      color: #348498;
      border-radius: 5px;
    }
  }

  .wrapper-team__section-name {
    padding-bottom: 3rem;
    padding-top: 2rem;
    width: 100%;
    transition: 0.3s;
    text-align: center;

    label {
      cursor: pointer;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 32px;
      padding: 0 0.75rem 0.75rem 0.75rem;
      border-bottom-color: var(--main-color-hover);
    }

    .active {
      border-bottom: var(--main-border-bottom);
    }
  }

  .wrapper-team__content {
    // border: 2px solid red;
    display: flex;
    flex-direction: column;
    padding: 1.5rem 2.5rem 1.5rem 2.5rem;
    width: 100%;

    .content-filter {
      border-radius: 15px;
      border: var(--main-border-card);
      height: 300px;
      width: 15rem;
    }

    .content-cards {
      padding-left: 2rem;
      width: 80%;

      .cards__search {
        display: flex;
        padding-bottom: 1rem;

        input {
          width: 80%;
        }

        .search-toggle {
          display: flex;
          padding-left: 1rem;
          align-items: center;
          justify-content: center;

          img {
            cursor: pointer;
            padding-right: 1rem;
            transition: 0.3s;
            height: 28px;
            width: 28px;
            opacity: 0.5;

            &:hover {
              opacity: 1;
            }

            &:active {
              opacity: 0.5;
            }
          }

          .active {
            opacity: 1;
          }
        }
      }

      .card {
        display: flex;
        align-items: center;
        justify-content: center;
        border: var(--main-border-card);
        margin: 0 1rem 1rem 0;
        padding: 1rem;
        border-radius: 15px;

        a {
          cursor: pointer;
          text-align: center;
          font-size: 25px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        img {
          height: 150px;
          width: 150px;
          padding: 1rem;
          border-radius: 10rem;
        }
      }

      .wrapper-grid {
        display: flex;
        flex-wrap: wrap;

        .card {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 35%;
        }
      }

      .wrapper-list {
        padding-bottom: 1rem;

        .card {
          width: 80%;
        }
      }
    }

    .middle-panel {
      display: flex;

      .title {
        color: rgb(8, 7, 7);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .column-left {
        h2 {
          color: #000;
          font-size: 20px;
          font-weight: 600;
          height: 2rem;
          font-family: 'Montserrat', sans-serif;
        }
      }

      .column-right {
        flex-basis: 40%;
        padding: 0 10px;

        .image-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        img {
          border-radius: 25px;
          margin-bottom: 30px;
          width: 70%;
        }

        .page-arrows {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .arrow-left,
        .arrow-right {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          margin: 0 10px;
          border-radius: 50%;
          background-color: #ccc;
          cursor: pointer;
        }

        .arrow-left i,
        .arrow-right i {
          color: #fff;
          font-size: 14px;
        }

        .page-buttons {
          display: flex;
          justify-content: center;
        }

        .page-buttons button {
          border: none;
          border-radius: 10px;
          margin: 0 5px;
          width: 10px;
          height: 10px;
          background-color: #ccc;
        }

        .page-buttons button.active {
          background-color: var(--main-color);
        }
      }
    }

    .news-panel {
      display: flex;
      flex-direction: column;
      align-items: center;

      .news-card {
        display: flex;
        align-items: center;
        height: 230px;
        width: 80%;
        // background-color: #B7EAED;
        // border-style: #000000,10px;
        border: 2px solid #B7EAED;
        
        margin-bottom: 20px;
        border-radius: 25px;

        h2 {
          padding: 0;
          margin: 0;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          font-weight: inherit;
          font-size: 32px;
        }

        img {
          height: 225px;
          width: 225px;
          border-radius: 25px;
          object-fit: cover;
          overflow: hidden;
        }

        .title {
          margin-top: 0;
        }

        .description {
          margin-bottom: 0;
        }

        .text-container {
          flex: 1;
          padding: 25px;
        }
      }
    }
  }
}
</style>