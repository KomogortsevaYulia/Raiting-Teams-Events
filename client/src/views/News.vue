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
            <div class="btn__text" v-if="hiddenCheckboxStatus">Развернуть</div>
            <div v-else class="btn__text">Свернуть</div>
            <div class="btn__img" :class="{'closed': hiddenCheckboxStatus}"></div>
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
          <div class="card"></div>
          <div class="card"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Switch_toggle from '@/components/Switch_toggle.vue';

export default{
  components:{
    Switch_toggle
  },
  data(){
    return{
      menu_items: [
        {id: 1, title: 'Формат проведения', menu_types:[
          {id: 1, title:'Online'},
          {id: 2, title:'Offline'},
        ]},
        {id: 2, title: 'Уровень', menu_types:[
          {id: 1, title:'Внутривузовский'},
          {id: 2, title:'Межвузовский'},
          {id: 3, title:'Региональный'},
          {id: 4, title:'Всероссийский'},
        ]},
        {id: 3, title: 'Институт', hidden: true, menu_types:[
          {id: 1, title:'Авиамашиностроения и транспорта'},
          {id: 2, title:'Архитектуры, строительства и дизайна'},
          {id: 3, title:'Высоких технологий'},
          {id: 4, title:'Информационных технологий и анализа даных'},
          {id: 5, title:'Квантовой физики'},
          {id: 6, title:'Лингвистики и межкультурной коммуникации'},
          {id: 7, title:'Недропользования'},
          {id: 8, title:'Экономики, управления и права'},
          {id: 9, title:'Энергетики'},
          {id: 10, title:'БРИКС'},
        ]},
        {id: 4, title: 'Курс', hidden: true, menu_types:[
          {id: 1, title:'1 курс'},
          {id: 2, title:'2 курс'},
          {id: 3, title:'3 курс'},
          {id: 4, title:'4 курс'},
          {id: 5, title:'5 курс'},
          {id: 6, title:'Магистратура'},
        ]}
      ],
      hiddenCheckboxStatus: true
    }
  },
  methods:{
  
  }
}
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
        height: 12rem;
        margin-bottom: 1rem;
        border: none;
        box-shadow: 0px 5px 10px 0px rgba(114, 114, 114, 0.1);

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

.cardEvent {
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  width: 250px;
  height: auto 350px;
  margin: 0 1rem 1rem 0;
  flex-wrap: wrap;
  overflow: hidden;
  border-radius: 5px;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  transition: all .5s;
}

.cardEvent:hover {
  cursor: pointer;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
}

.imgEvent {
  position: relative;
  height: 13rem;
  overflow: hidden;

  p {
    font-weight: 100;
    font-size: 1.4rem;
    margin: 4rem 0 0 1rem;
    color: #fff;
    position: absolute;
  }

  div {
    width: 100%;
    height: 13rem;
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
  }

  img {
    width: 100%;
  }

}

.wrapperContent {
  padding: 1rem;

  .date {
    text-align: end;
    font-size: 1.6rem;
    font-weight: 100;
  }
}

.cardContainer {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  // justify-content: space-between;
}

.teg__container {
  justify-content: space-between;

  .teg {
    display: inline-block;
    background-color: #9DD9D2;
    padding: 0.6rem;
    border-radius: 1rem;
    margin: 0 0.6rem 0 0;
  }
}

.container {
  padding-top: 2rem;
  margin-inline: 10%;
  display: flex;
  justify-content: center;
}
</style>