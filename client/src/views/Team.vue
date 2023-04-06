<script setup lang="ts">
import Filter from '@/components/Filter.vue';
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
  team.value = await TeamStore.fetchTeam()
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
    title: 'Хакатон Умник-ON',
    description: 'В Иркутском политехе 9 октября стартовал хакатон инженерных решений УМНИК-ON. Студентам предстоит разработать проекты, посвященные модернизации инфраструктуры университета. Мероприятие проводит отдел организации научной деятельности молодых ученых и студентов.',
    imageUrl: 'https://www.istu.edu/upload/iblock/044/IMG_5137.JPG'
  },
  {
    id: 2,
    title: 'Конкурс лучшее СНО 2022',
    description: 'В Иркутском политехе определили лидеров конкурса «Лучшее студенческое научное общество» (СНО). Гранты в размере 75 тыс. рублей, переходящие кубки получили НИСКО «Транспортный менеджмент» и СКБ «Промышленная электроника и робототехника». Награждение состоялось на итоговом мероприятии Всероссийского фестиваля NAUKA 0+в Точке кипения университета',
    imageUrl: 'https://www.istu.edu/upload/iblock/137/20201109_IMG_7941.JPG'
  },
  {
    id: 3,
    title: 'Научно-дискуссионный клуб ИРНИТУ',
    description: ' В Точке кипения ИРНИТУ 17 февраля состоялось первое собрание Научно-дискуссионного клуба. Политеховцы обсудили проекты в сфере модернизации пропускных систем, цифровизации авиастроения и сварочных технологий.',
    imageUrl: 'https://www.istu.edu/upload/iblock/e10/IMG_1367.jpg'
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
            <div v-for="(item, index) in itemLink" :key="index" class="teg">
              {{ item.name }}
            </div>
          </div>
          <hr>
          <div class="middle-panel">
            <div class="column-left">
              <h2>О коллективе</h2>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam vitae laboriosam voluptates
              soluta
              in similique magni maiores veritatis debitis quis, doloremque odio. Suscipit incidunt reprehenderit,
              voluptatibus exercitationem est similique?
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam vitae laboriosam voluptates
              soluta
              in similique magni maiores veritatis debitis quis, doloremque odio. Suscipit incidunt reprehenderit,
              voluptatibus exercitationem est similique?
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam vitae laboriosam voluptates
              soluta
              in similique magni maiores veritatis debitis quis, doloremque odio. Suscipit incidunt reprehenderit,
              voluptatibus exercitationem est similique?
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium aliquam vitae laboriosam voluptates
              soluta
              in similique magni maiores veritatis debitis quis, doloremque odio. Suscipit incidunt reprehenderit,
              voluptatibus exercitationem est similique?
            </div>
            <div class="column-right">
              <div class="image-container">
                <img v-if="currentPage === 1" src="@/assets/icon/event1.png">
                <img v-if="currentPage === 2" src="@/assets/icon/event2.png">
                <img v-if="currentPage === 3" src="@/assets/icon/event3.png">
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
        <a>Компонент Занятий</a>
      </div>
      <div v-if="selectedItem === 2">

        <div v-for="item in team">

          <div v-if="item.function.title === 'Руководитель'" class="mt-5">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin>
            <link href="https://fonts.googleapis.com/css2?family=Inter&family=Raleway&display=swap" rel="stylesheet">
            <div class="about" style="margin-top: 20px;">
              <div class="member-card">
                <!-- <img class="member-image" src="../assets/icon/event1.png" alt="" /> -->
                <div class="member-info">
                  <div>
                    <h1>{{ item.user.fullname }}</h1>

                    <h2>Роль: {{ item.function.title }}</h2>
                  </div>
                  <div class="member-buttons">
                    <button class="btn">Редактировать</button>
                  </div>

                </div>

              </div>
            </div>
          </div>


          <div v-else>
            <!-- <link rel="preconnect" href="https://fonts.googleapis.com">
                        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin>
                        <link href="https://fonts.googleapis.com/css2?family=Inter&family=Raleway&display=swap" rel="stylesheet"> -->
            <div class="about">
              <div class="member-card py-4">
                <div class="row">

                  <!-- image member -->
                  <div class="col-lg-2 d-flex col-md-12 justify-content-center">
                    <img class="member-image" src="../assets/icon/user.png" alt="" />
                  </div>

                  <div class="col-lg-10 col-md-12">
                    <div class="member-info">

                      <div class="col">
                        <div class="row ">
                          <h1>{{ item.user.fullname }}</h1>
                        </div>
                        <div class="row">
                          <h2>Группа: {{ item.user.education_group }}</h2>
                        </div>
                        <div class="row">
                          <h2>Роль: {{ item.function.title }}</h2>
                        </div>

                        <div class="row d-flex justify-content-end">
                          <div class="member-buttons">
                            <button class="btn button px-3">Редактировать</button>
                            <button class="btn button  px-3">Удалить</button>
                          </div>
                        </div>
                      </div>



                    </div>
                  </div>
                </div>


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


.member-card {
  width: 100%;
  margin-bottom: 12px;
  background: rgb(243, 243, 243);
  border-radius: 25px 20px 20px 25px;

}

.member-info {
  width: 100%;
  padding: 19px 50px 19px 36px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.member-image {
  object-fit: cover;
  height: 89px;
  width: 89px;
  border-radius: 20px 0 0 20px;
}

.member-info h1 {
  color: black;
  font-family: 'Raleway', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;
  padding-bottom: 10px;
}

.member-info h2 {
  color: rgba(90, 90, 90, 1);
  font-family: 'Inter', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
}

.member-buttons {
  display: flex;
  justify-content: end;
}

.member-buttons .button {
  background-color: rgba(217, 217, 217, 1);
  color: rgba(102, 102, 102, 1);
  
  width: 270px;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family: 'Inter', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  margin-left: 15px;
}

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
    background-image: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.6) 10%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 100%), url('@/assets/icon/event1.png');
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
    padding-top: 2rem;
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
        background-color: #B7EAED;
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