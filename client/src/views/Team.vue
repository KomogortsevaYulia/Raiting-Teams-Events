<script setup lang="ts">
import Filter from '@/components/Filter.vue';
import { onBeforeMount, ref } from 'vue';
import TeamsForm from './TeamsForm.vue'

import { useTeamStore } from "../store/team_store"
import axios from 'axios';
import { useRoute } from "vue-router";

const route = useRoute()

const show = ref(true);
const layout = ref(true);

const currentPage = ref(1);

const data = ref()

onBeforeMount(async () => {
  // вытащить коллективы из бд и отобразить их
  // fetchTeams()
  fetchCurrentTeams();
})

// вытащить коллективы из бд 
// async function fetchTeams() {
//   data.value = await useTeamStore().fetchTeams()
// }

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

const itemLink = [{ name: "Новости", path: "/news" }, { name: "Коллективы", path: "/teams" },]

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
      <div class="full-width wrapper-team__top-panel">
        <div class="text-area">
          <label>{{data.title}}</label>
        </div>
      </div>
    </div>

    <!-- Навигация -->
    <div class="wrapper-team__navigation">
      <a @click="show = true" :class="{ active: show }">О коллективе</a>
      <a @click="show = false" :class="{ active: !show }">Расписание занятий</a>
    </div>

    <div v-if="show" class="wrapper-team__content wrapper-content">
      <div class="middle-panel">
        <div class="column-left">
          <div class="main-text">
            <h2 class="title">О НАС</h2>
            <label>Задачи и цели:
              поиск и развитие перспективных студентов, желающих реализовать свой потенциал в научной и профессиональной
              деятельности.
              развитие междисциплинарных проектов и освоение участниками новых профессиональных компетенций.
              создание и развитие условий, которые обеспечат возможность для каждого студента реализовать свое право на
              развитие личности, на участие в научных исследованиях и научно-техническом творчестве;
              обеспечение единства образовательного, научного и инновационного процессов с формированием и развитием
              способностей, улучшением профессиональной подготовки студентов, совершенствованием форм привлечения молодежи
              к научным исследованиям, научно-технической, изобретательской и рационализаторской деятельности.
              создание благоприятных условий для развития и функционирования различных форм научного творчества молодежи,
              базирующихся на отечественном и зарубежном опыте, результатах научных и научно-технических разработок;
              содействие всестороннему развитию личности студента, формированию его объективной самооценки, приобретению
              навыков работы в коллективах, приобщению к организаторской и инновационной деятельности;
              развитие способности использовать научные знания и быстро адаптировать при изменении ситуации, готовности к
              повышению квалификации и переподготовке;
              предоставление студентам возможности испробовать свои силы в решении актуальных задач по различным
              направлениям науки и техники, опубликовать значимые результаты исследований. </label>
          </div>
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

    <div v-if="!show" class="wrapper-team__create">
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import '@/assets/globals.scss';

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
      text-align: center;
      color: rgb(8, 7, 7);
      padding: 20px;
      width: 40%;

      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .text-area>* {
      margin: 7px;
    }

    button {
      width: fit-content;
      background-color: #ff502f;
      color: #FFFFFF;
    }
  }

  .wrapper-team__navigation {
    padding-bottom: 4rem;
    padding-top: 2rem;
    width: 100%;
    transition: 0.3s;

    a {
      cursor: pointer;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 14px;
      padding: 0 0.75rem 0.75rem 0.75rem;

      &:hover {
        color: var(--main-color);
      }

      &:active {
        transition: all 0.4s;
        color: var(--main-color-hover);
        border-bottom-color: var(--main-color-hover);
      }
    }

    .active {
      border-bottom: var(--main-border-bottom);
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
    display: flex;
    flex-direction: column;
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

          .wrapper-content {
            display: flex;
            flex-direction: column;
            justify-content: center;

            .btn {
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
          }
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
      flex-direction: row;

      .title {
        color: rgb(8, 7, 7);
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .main-text {

        padding: 20px;

        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .column-left {
        flex-basis: 60%;
        padding: 0 10px;
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