<script setup lang="ts">
import { usePermissionsStore } from '@/store/permissions_store';
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

const selectedColor = ref('blue');
const attrs = ref([
  {
    key: 'test',
    highlight: true,
    dates: { start: new Date(2019, 3, 15), end: new Date(2019, 3, 19) },
  }
]);

const route = useRoute();
const username = route.params.username;

const user = ref()
onBeforeMount(async () => {
  getInfoUser()
})

async function getInfoUser() {
  user.value = await usePermissionsStore().fetchUser()
}


</script>
<template>
  <div class="avatar rounded">
    <font-awesome-icon icon="fa-solid fa-pen-to-square" size="2x" pull="right" class="me-2 mt-2 " />
    <img class="icon" width="150" height="150" :src="user.image" alt="icon" style="object-fit: cover;" />
    <p class="FIO">{{ user.fullname }}</p>
    <p class="text"> {{ user.institute }}</p>
    <p>{{ user.course }} курс</p>
    <p>{{ user.education_group }}</p>
    <div class="tags">
      <div class="tag">
        Волейбол
      </div>
      <div class="tag">
        Спортивные танцы
      </div>
      <div class="tag">
        Спорт
      </div>
    </div>
    <div class="row">
      <div class="col ps-5 pe-5">
        <h3 class="active">Коллективы</h3>
        <p>Народный театр «Предместье»</p>
        <p>Волейбол юноши</p>
        <p>Студенческие отряды</p>
      </div>
    </div>
  </div>

  <div class="col">
    <div class="row">
      <div class="information rounded pb-2 p-3">
        <h2 class="ps-3">Расписание</h2>
        <VCalendar expanded />
      </div>
    </div>
    <div class="row mt-3">
      <div class="information rounded">
        <h2 class="p-3">Достижения</h2>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">№</th>
              <th scope="col">Название</th>
              <th scope="col">Дата</th>
            <th scope="col">Мероприятие</th>
            <th scope="col">Направление</th>
            <th scope="col">Учитывается в рейтинге</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Диплом за 1 место в Аниме-квизе</td>
              <td>23.02.2023</td>
              <td>Аниме квиз</td>
              <td>КТД</td>
              <td>Нет</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Грамота за 2 место в соревнованиях по волейьолу среди команд ИРНИТУ</td>
              <td>20.08.2022</td>
              <td>Соревнование по волейболу</td>
              <td>СД</td>
              <td>Да</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Грамота за участие в Субботнике</td>
              <td>02.10.2022</td>
              <td>Субботник</td>
              <td>ОД</td>
              <td>Нет</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- <div class="information rounded">
                <h1 class="ps-3">Достижения</h1>
              </div> -->
</template>

<style lang="scss">
.container {
  display: flex;
}

.vc-day-content {
  position: absolute;
  top: 0;
  right: 0;

}

.vc-day {
  height: 70px;
}

.vc-weekday {
  background-color: #cbecee;
}

.information {
  width: 800px;

  background-color: rgb(255, 255, 255);
}

.vc-day-box-center-center {
  border: 1px groove;
}

.vc-arrow {
  width: 35px;
  height: 30px;
  color: #fd524c;
}

.vc-header .vc-title {
  color: #fd524c;
}

button {
  background: none;
  padding: 0em;
}

.avatar {
  margin-right: 2em;
  width: 30%;
  height: max-content;
  text-align: center;
  background-color: rgb(255, 255, 255);

}

.tag {
  background-color: #5BD1D7;
  border-radius: 15px;
}

.tags {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 1em;
  margin-left: 2em;
  margin-right: 2em;
  margin-bottom: 2em;
}

.FIO {
  font-size: 1.4rem;
}

.text {
  margin-right: 5em;
  margin-left: 5em;
  text-align: center;
}

.icon {
  margin: 2em 1em 2em 5em;
  border-radius: 1000px;
  /* Радиус скругления */
}

.active {

  border-bottom: var(--main-border-bottom);
}

//
</style>
