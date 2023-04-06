<script setup lang="ts">
import { useUserStore } from '@/store/user_store';
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
  user.value = await useUserStore().getInfoUser()
}


</script>
<template>
  <div class="avatar">
    <font-awesome-icon icon="fa-solid fa-pen-to-square" size="2x" pull="right" class="me-2 mt-2 " />
    <img class="icon" width="150" height="150" src="@/assets/icon/avatar.png" alt="icon" />
    <p class="FIO">Олег Олегов Олегович</p>
    <p class="text"> Институт информационных технологий и анализа данных</p>
    <p>2 курс</p>
    <p>ИСТБ-20-1</p>
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
  </div>
  <div class="information">
    <VCalendar expanded />
  </div>
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
  height: 700px;
  background-color: rgb(236, 228, 228);
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
  background-color: rgb(236, 228, 228);

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

//</style>
