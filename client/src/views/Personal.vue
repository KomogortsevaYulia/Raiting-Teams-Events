<script setup lang="ts">
import { usePermissionsStore } from '@/store/permissions_store';
import { ref, onBeforeMount } from 'vue';
// import { useRoute } from 'vue-router';
import { useUserStore } from "@/store/user_store";
import { useJournalStore } from "@/store/journals_store"
import { forEach } from "lodash";


const selectedColor = ref('blue');


// const route = useRoute();
// const username = route.params.username;


const user = ref()
const functions = ref()
const dateEvent = ref()
// let dates

const isEditing = ref(false)

onBeforeMount(async () => {
  user.value = await usePermissionsStore().fetchUser()
  functions.value = await useUserStore().getUsersFunction(3)
  dateEvent.value = await useJournalStore().fetchJournalsByUserId(3)
  attrs.value[0].dates = dateEvent.value[0].map((x: any) => x.dateParticipation)
})

const attrs = ref([
  {
    highlight: {
      color: 'purple',
      fillMode: 'solid',
      contentClass: 'italic',
    },
    dates: null,
  }
]);


function editProfile() {
  isEditing.value = !isEditing.value
}

</script>

<template >
  <div class="personal">

    <div class="row">

      <div class="avatar col-lg-4 px-lg-4 px-0">
        <div class="block-content">
          <div class="row position-relative">
            <div class="edit">
              <button class=" " @click="editProfile()">
                <font-awesome-icon icon="fa-solid fa-pen-to-square" size="2x" pull="right"
                  :class="[{ 'fa-beat': isEditing }]" />
              </button>

            </div>
            <div class="col mt-3">
              <div class=" avatar__scale">
                <img class="icon" width="150" height="150" :src="user.image" alt="icon" />
                <div v-if="isEditing" class="middle">
                  <font-awesome-icon icon="plus" class="fa-2x text-white" />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <p class="FIO row-auto">{{ user.fullname }}</p>
            <p class="row-auto"> {{ user.institute }}</p>
            <p class="row-auto">{{ user.course }} курс</p>
            <p class="row-auto">{{ user.education_group }}</p>
          </div>
          <div class="row">
            <h3 class="active">Коллективы</h3>
            <div class="row d-flex" v-if="functions" v-for="(item, index) in functions.data" :key="index">
              <p class="col d-flex justify-content-center align-items-center">{{ item.function.team.title }}</p>
              <p class="col d-flex justify-content-center align-items-center">{{ item.function.title }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-8">
        <div class="row">
          <div class="block-content pb-2 p-3">

            <h2 class="ps-3">Расписание</h2>
            <VCalendar :attributes='attrs' expanded />
          </div>

        </div>
        <div class="row mb-3">
          <div class="block-content">

            <h2 class="p-3">Достижения</h2>
            <div class="overflow-auto">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">№</th>
                    <th scope="col">Название</th>
                    <th scope="col">Дата</th>
                    <th scope="col">Мерорпиятие</th>
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
      </div>
    </div>
  </div>
</template>

<style lang="scss" >
.personal {

  .edit {
    position: absolute;
    z-index: 10;
    top: 120px;
    left: 70px;
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

  // .information {
  //   width: 800px;
  //   background-color: rgb(255, 255, 255);
  // }

  .vc-day-box-center-center {
    border: 1px groove;
  }

  .vc-arrow {
    width: 35px;
    height: 30px;
    color: var(--main-color);
  }

  .vc-header .vc-title {
    color: var(--main-color);
  }

  .vc-highlight-content-solid {
    color: black;
  }

  button {
    background: none;
    padding: 0em;
    color: var(--main-color);
  }

  .block-content {
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 5px;
    padding: 40px;
    margin: 10px auto 20px auto;
    background: white;
  }

  .avatar {
    // margin-right: 2em;
    // width: 30%;
    // height: max-content;
    text-align: center;
    // background-color: rgb(255, 255, 255);



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

    &__scale {
      display: inline-block;
      overflow: hidden;
      border-radius: 100px;
      position: relative;
      cursor: pointer;


      &:hover .middle {
        opacity: 1;
      }

      &:hover .icon {
        transform: scale(1.2);
        opacity: 0.5;
        /* Увеличиваем масштаб */
      }

      /* Скрываем всё за контуром */
      .icon {
        transition: 1s;
        /* Время эффекта */
        display: block;
      }

      .middle {
        transition: .5s ease;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        text-align: center;

      }
    }
  }


  .active {

    border-bottom: var(--main-border-bottom);
  }

}


//
</style>