<template>
  <div>
    <div class="mainBanner">
      <span class="descr">
        Надо что-то написать
        <button class="bannerBtn">Нажми меня</button>
      </span>
    </div>
    <div class="events__container">
      <!-- Боковое меню начало -->
      <div class="checkbox__nav">
        <div class="checkbox__block" v-for="menu_item in menu_items" :key="menu_item.id">
          <div class="checkbox__title">{{ menu_item.title }}</div>
          <label class="checkbox__container" v-for="menu_type in menu_item.menu_types" :key="menu_type.id" :class="{ 'hidden': menu_item.hidden && menu_type.id > 4}">
            <input type="checkbox" class="checkbox">
            <span class="fake"></span>
            <span class="span__title">{{ menu_type.title }}</span>
          </label>    
          <div class="btn__open" v-if="menu_item.menu_types.length > 4" @click="menu_item.hidden = !menu_item.hidden">
            <div class="btn__text" v-if="menu_item.hidden">Развернуть</div>
            <div v-else class="btn__text">Свернуть</div>
            <div class="btn__img" :class="{'closed': menu_item.hidden}"></div>
          </div>
        </div>
      </div>
      <!-- Правая часть контейнера -->
      <div class="cards__container">
        <!-- Поисковые строки -->
        <div class="cards__search">
          <input class="title__search" placeholder="Начните поиск..." />
          <input class="date__search" placeholder="Выберите дату" type="date"/>
          <Switch_toggle />
        </div>
        <div class="cards">
          <div class="card">
            <div class="card__banner"></div>
            <div class="card__content">
              <div class="card__event-name">Название мероприятия</div>
              <div class="teg__container">
                <div class="teg">Тег 1</div>
                <div class="teg">Тег 2</div>
              </div>
              <div class="card__text">
                Описание мероприятия
              </div>
              <div class="btn__container">
                <button class="card__btn">Подать заявку</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Switch_toggle from '@/components/Switch_toggle.vue';
import { useEventStore } from "@/store/events_store";

const eventStore = useEventStore();
const menu_items = eventStore.menu_items;
</script>

<style lang="scss" scoped>
.events__container{
  display: flex;
  padding-top: 1rem;
  .checkbox__block{
    margin-bottom: 1rem;
  }
  .checkbox__nav{
    background-color: #fff;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
    width: 20rem;
    padding: 2rem;
    max-height: 100rem;
    border-radius: 5px;
    margin-bottom: 4rem;
    .btn__open{
      display: flex;
      color: #348498;
      padding-left: 0.5rem;
      &:hover{
        cursor: pointer;
      }
      .btn__img{
        background-image: url(@/assets/icon/closed.svg);
        margin-top: 0.1rem;
        height: 1rem;
        width: 2rem;
        &.closed{
          background-image: url(@/assets/icon/open.svg);
        }
      }
    }
    .checkbox__title{
      color: #373737;
      margin-bottom: 0.5rem;
    }
    .checkbox__container{
      padding: 0.2rem 0.5rem;
      display: flex;
      &.hidden{
        display: none;
      }
      &:hover{
        cursor: pointer;
      }
      .checkbox{
        display: none;
        &:checked + .fake::before{
          opacity: 1;
        }
      }
      .span__title{
        color: #A1A1A1;
        font-size: 1rem;
        margin-left: 1rem;
        hyphens: manual;
        width: 50%;
      }
      .span__title-dark{
        color: #373737;
      }
      .fake{
        display: inline-block;
        position: relative;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 0.3rem;
        background-color: #CDEEF0;
        &:hover{
          cursor: pointer;
          background-color: #b9e6e9;
        }

      }
      .fake::before{
        content: "";
        position: absolute; 
        display: block;
        width: 1.5rem;
        height: 1.5rem;
        background-color: #5BD1D7;
        background-image: url(@/assets/icon/checked.svg);
        border-radius: 0.3rem;
        transform: (-50%, -50%);
        opacity: 0;
        transition: .2s;
      }
      
    }
  }
  .cards__container{
    margin-left: 2rem;
    width: 100%;
    .cards__search {
      display: flex;
      justify-content: space-between;
    .title__search{
      width: 70%;
    }
    }
    .cards__wrap{
      background-color: #fff;
      width: 10%;
    }
    .cards{
      padding-top: 2rem;
      .card{
        width: 100%;
        background-color: #fff;
        height: 15rem;
        margin-bottom: 1rem;
        border: none;
        box-shadow: 0px 5px 10px 0px rgba(114, 114, 114, 0.1);
        display: flex;
        flex-direction: row;

        .card__banner{
          height: 100%;
          width: 12rem;
          border-radius: 5px 0 0 5px;
          background-color: #a3a3a3;
        }
        .card__content{
          padding: 1rem 2rem;
          width: 100%;
          .card__event-name{
            color: #373737;
            font-size: 1.2rem;
          }
          .teg__container{
            display: flex;
            margin-top: 0.5rem;
            .teg{
              margin-right: 1rem;
              background-color: #B7EAED;
              padding: 0.2rem 1rem;
              color: #348498;
              border-radius: 5px;
            }
          }
          .card__text{
            color: #373737;
          }
          .btn__container{
            display: flex;
            justify-content: right;
            margin-top: 3rem;
            .card__btn{
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