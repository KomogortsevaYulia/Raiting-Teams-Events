<script setup lang="ts">
import Filter from '@/components/Filter.vue';
import { onBeforeMount, ref } from 'vue';
import TeamsForm from './TeamsForm.vue'

import { useTeamStore } from "../store/team_store"

const show = ref(true);
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
          <label>Студенческое научное общество «Квантум» состоит из энтузиастов-изобретателей, будущих ученых, кандидатов и докторов наук. Специалисты и бакалавры, инженеры и техники реализуют свой потенциал и обмениваются накопленным опытом в различных сферах профессиональной деятельности. </label>
          <button>Подать заявку</button>
        </div>
      </div>
    </div>

    <!-- Навигация -->
    <div class="wrapper-team__navigation">
      <a @click="show = true" :class="{ active: show }">О коллективе</a>
      <a @click="show = false" :class="{ active: !show }">Расписание занятий</a>
    </div>

    <div v-if="show" class="wrapper-team__content">
      <div class="middle-panel">
        <div class="column-left">
          <div class="main-text">  
            <h2 class="title">О НАС</h2>    
            <label>Задачи и цели:
              поиск и развитие перспективных студентов, желающих реализовать свой потенциал в научной и профессиональной деятельности.
              развитие междисциплинарных проектов и освоение участниками новых профессиональных компетенций.
              создание и развитие условий, которые обеспечат возможность для каждого студента реализовать свое право на развитие личности, на участие в научных исследованиях и научно-техническом творчестве;
              обеспечение единства образовательного, научного и инновационного процессов с формированием и развитием способностей, улучшением профессиональной подготовки студентов, совершенствованием форм привлечения молодежи к научным исследованиям, научно-технической, изобретательской и рационализаторской деятельности.
              создание благоприятных условий для развития и функционирования различных форм научного творчества молодежи, базирующихся на отечественном и зарубежном опыте, результатах научных и научно-технических разработок;
              содействие всестороннему развитию личности студента, формированию его объективной самооценки, приобретению навыков работы в коллективах, приобщению к организаторской и инновационной деятельности;
              развитие способности использовать научные знания и быстро адаптировать при изменении ситуации, готовности к повышению квалификации и переподготовке;
              предоставление студентам возможности испробовать свои силы в решении актуальных задач по различным направлениям науки и техники, опубликовать значимые результаты исследований. </label>
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

<style lang="scss">
@import '@/assets/teams/team.scss';
</style>