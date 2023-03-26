<script setup lang="ts">
import Filter from '@/components/Filter.vue';
import { onBeforeMount, ref } from 'vue';
import TeamsForm from './TeamsForm.vue'

import { useTeamStore } from "../store/team_store"

const showAboutTeam = ref(true);
const showNews = ref(false);
const showSchedule = ref(false);

const layout = ref(true);

const currentPage = ref(1);

const data = ref()

onBeforeMount(async () => {
  // вытащить коллективы из бд и отобразить их
  fetchTeams()
})

// вытащить коллективы из бд 
async function fetchTeams() {
  data.value = await useTeamStore().fetchTeams()
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
    <div>
      <div class="wrapper-team__top-panel">
        <div class="text-area">
          <H2>Студенческое научное общество «Квантум»  </H2>
          <button>Подать заявку</button>
        </div>
      </div>
    </div>

    <!-- Навигация -->
    <div class="wrapper-team__navigation">
      <a @click="showAboutTeam = true; showNews = false; showSchedule = false" :class="{ active: showAboutTeam }">О коллективе</a>
      <a @click="showNews = true; showAboutTeam = false; showSchedule = false" :class="{ active: showNews }">Новости</a>
      <a @click="showSchedule = true; showAboutTeam = false; showNews = false" :class="{ active: showSchedule }">Расписание</a>
    </div>

    <div v-if="showAboutTeam" class="wrapper-team__content">
      <div class="middle-panel">
        <div class="column-left">
          <div class="main-text">  
            <div class="wrapper-team__section-name">
              <label class="active">О нас</label>
            </div> 
            <label>Студенческое научное общество «Квантум» состоит из энтузиастов-изобретателей, будущих ученых, кандидатов и докторов наук. Специалисты и бакалавры, 
              инженеры и техники реализуют свой потенциал и обмениваются накопленным опытом в различных сферах профессиональной деятельности.
            </label>
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
          <label class="active">Контактные данные</label>
        </div> 
      </div>
    </div>

    <div v-if="showNews" class="wrapper-team__content">
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

    <div v-if="showSchedule" class="wrapper-team__content">
      <div class="wrapper-team__section-name">
        <label class="active">Расписание</label>
        <div class="middle-panel">
        <div class="column-left">
          <div class="main-text">  
              <label class="active">Я пока не знаю, как сделать календарь</label>
          </div>
        </div>
        <div class="column-right">
          <label class="active">Актуальное расписание</label>
          <label>Тут вы всегда можете узнать о наших тренировка и будущих мероприятиях.
            </label>
        </div>
      </div>
      </div>
    </div>
   
  </div>
</template>

<style lang="scss">
@import '@/assets/teams/team.scss';
</style>