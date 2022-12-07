<script setup lang="ts">
    import Filter from '@/components/Filter.vue';
</script>

<template>
  <div>
      <div className = "mainBanner">
        <span className = "descr"> 
        Надо что-то написать 
        <button class = "bannerBtn">Нажми меня</button>
        </span>
      </div>
      <div class="cards__search">
            <input placeholder="Начните поиск..." />
      </div>
      <div class = "cardContainer">
        <div class="cardEvent">
            <div class = "imgEvent">
              <div></div>
              <p>Региональный чемпионат WorldSkills “Инженерный дизайн CAD”</p>  
              <img src="../assets/icon/event1.png">
            </div>
            <div class="wrapperContent">
              <div class = "teg__container">
                <div class = "teg">
                  Offline
                </div>
                <div class = "teg">
                  Межвузовский
                </div>
              </div>
              <div>
                <p >
                  Проводится с целью выработки у студентов навыков работы в области конструирования, для развития конструкторских навыков, творческого потенциала в решении сложных нестандартных задач за короткий промежуток времени
                </p>
                <p class = "date">01.04.2021</p>
              </div>
            </div>
          </div>
          <div class="cardEvent" onclick = "location.href='/event';">
            <div class = "imgEvent">
              <div></div>
              <p>Викторина “Роль и место прокуратуры России в Российской Федерации”</p>  
              <img src="../assets/icon/event3.png">
            </div>
            <div class="wrapperContent">
              <div>
                <p>
                  Викторина для школьников “Роль и место прокуратуры России в Российской Федерации”
                </p>
                <p class = "date">05.04.2021</p>
              </div>
            </div>
          </div>
          <div class = "cardEvent">
            <div class = "imgEvent">
              <div></div>
              <p>Конкурс “Защити свою профессию” по профилю “Электрические станции”</p>  
              <img src="../assets/icon/event2.png">
            </div>
            <div class="wrapperContent">
              <div>
                <p>
                  В конкурсе принимают участие студенты 4 курса профиля “Электрические станции”. Цель конкурса: выявить лучших студентов по уровню освоения профессиональных компетенций и способностей к творческому мышлению
                </p>
                <p class = "date">06.04.2021</p>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
</script>

<style lang="scss">
    .mainBanner{
      display: flex;
      width: 65rem;
      overflow: hidden;
      height: 15rem;
      border-radius: 2rem;
      background-image: url("../assets/icon/banner.png");
      position: relative;
  }

  .bannerBtn{
      background-color: #fff;
      width: 10rem;
      border-radius: 2rem;
      right:50px;
  }

  .descr{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      color: white;
      padding-top: 4rem;
      padding-left: 30rem;
      text-align: center;
      opacity: 0;
      transition: all .5s;
  }


  .mainBanner:hover .descr{
      cursor: pointer;
      opacity: 1;
  }

  .cardEvent{
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
      width: 20rem;
      height: 34rem;
      overflow: hidden;
      border-radius: 1rem;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      transition: all .5s;
  }

  .cardEvent:hover {
      cursor: pointer;
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
  }

  .imgEvent{
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

      div{
          width: 100%;
          height: 13rem;
          background-color: rgba(0,0,0,0.7);
          position: absolute;
      }

      img{
          width: 100%;
      }

  }

  .wrapperContent{
      padding: 1rem;

      .date{
          text-align: end;
          font-size: 1.6rem;
          font-weight: 100;
      }
  }

  .cardContainer{
      margin-top: 2rem;
      margin-bottom: 2rem;
      display: flex;
      justify-content: space-between;
  }

  .cards__search{
      input{
          margin-top: 2rem;
          width: 70%;
      }
  }

  .teg__container{
      justify-content: space-between;

      .teg{
          display: inline-block;
          background-color: #9DD9D2;
          padding: 0.6rem;
          border-radius: 1rem;
          margin: 0 0.6rem 0 0;
      }
  }
</style>