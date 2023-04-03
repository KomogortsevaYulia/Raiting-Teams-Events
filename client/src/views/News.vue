<template>
  <div>
    <div class="full-width">
      <div class="mainBanner">
        <span class="descr">
          Надо что-то написать
          <button class="bannerBtn">Нажми меня</button>
        </span>
      </div>
    </div>
    <div class="events__container">
      <!-- Боковое меню -->
      <CheckBox_Menu :menu_items="menu_items" />
      <!-- Правая часть контейнера -->
      <div class="cards__container">
        <!-- Поисковые строки -->
        <div class="cards__search">
          <input class="title__search" placeholder="Начните поиск..." />
          <input class="date__search" placeholder="Выберите дату" type="date" />
          <Switch_toggle />
        </div>
        <div class="cards">
          <div class="card" v-for="event in data" :key="event.id">
            <div class="card__banner"></div>
            <router-link :to="'/event/' + event.id">
              <div class="card__content">
                <div class="card__event-name">{{ event.title }}</div>
                <div class="teg__container">
                  <div class="teg">Тег 1</div>
                  <div class="teg">Тег 2</div>
                </div>
                <div class="card__text">{{ event.description.slice(0, 150) }}</div>
                <div class="btn__container">
                  <button class="card__btn">Подать заявку</button>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Switch_toggle from '@/components/Switch_toggle.vue';
import CheckBox_Menu from '@/components/CheckBox_Menu.vue';
import { useEventStore } from "@/store/events_store";
import { onBeforeMount, ref } from 'vue';

const eventStore = useEventStore();
const menu_items = eventStore.menu_items;
const data = ref()


onBeforeMount(async () => {
  fetchEvents()
})
async function fetchEvents() {
  data.value = await eventStore.fetchEvents()
}

</script>

<style lang="scss" scoped>
.events__container {
  display: flex;
  padding-top: 1rem;

  .cards__container {
    margin-left: 2rem;
    width: 100%;

    .cards__search {
      display: flex;
      justify-content: space-between;

      .title__search {
        width: 70%;
      }
    }

    .cards__wrap {
      background-color: #fff;
      width: 10%;
    }

    .cards {
      padding-top: 2rem;

      .card {
        width: 100%;
        background-color: #fff;
        height: 15rem;
        margin-bottom: 1rem;
        border: none;
        box-shadow: 0px 5px 10px 0px rgba(114, 114, 114, 0.1);
        display: flex;
        flex-direction: row;

        .card__banner {
          height: 100%;
          width: 12rem;
          border-radius: 5px 0 0 5px;
          background-color: #a3a3a3;
        }

        .card__content {
          padding: 2rem;
          width: 100%;

          .card__event-name {
            color: #373737;
            font-size: 1.2rem;
          }

          .teg__container {
            display: flex;
            margin-top: 0.5rem;

            .teg {
              margin-right: 1rem;
              background-color: #B7EAED;
              padding: 0.2rem 1rem;
              color: #348498;
              border-radius: 5px;
            }
          }

          .card__text {
            color: #373737;
          }

          .btn__container {
            display: flex;
            justify-content: right;
            margin-top: 1rem;

            .card__btn {
              background-color: #FF502F;
              color: #fff;
              padding: 0.8rem 2rem;
            }
          }
        }
      }
    }
  }

}

.full-width {
  position: relative;
  margin-top: -1.5em;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.mainBanner {
  display: flex;
  width: 100%;
  overflow: hidden;
  height: 15rem;
  background-image: url("../assets/icon/banner.png");
  position: relative;
}

.bannerBtn {
  background-color: #fff;
  width: 10rem;
  border-radius: 2rem;
  right: 50px;
}

.descr {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding-top: 4rem;
  padding-left: 30rem;
  text-align: center;
  opacity: 0;
  transition: all .5s;
}


.mainBanner:hover .descr {
  cursor: pointer;
  opacity: 1;
}
</style>