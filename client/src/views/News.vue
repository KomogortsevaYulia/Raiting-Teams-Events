<template>
  <div>
      <div className = "mainBanner">
        <span className = "descr"> 
          Описание проекта
          <button className = "bannerBtn">Нажми меня</button>
        </span>
      </div>
      <div className = "container">
        <div class="cardEvent">
            <img src="../assets/icon/event1.png" className = "imgEvent">            
            <div class="wrapper-content">
              <div>
                <a>Клуб "Автостопом по галактике"</a>
                <p>Мы любители - звездочеты, ищем себе в клуб ребят, которые горят желанием изучать космос, серьезно
                  заниматься астрономией и просто любоваться на звездное небо!</p>
                <p>Руководитель: Иванов Иван Иванович</p>
              </div>
              <div class="btn">
                <RouterLink to="/team-1">
                  <button>Подробнее</button>
                </RouterLink>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
</script>

<style lang="scss">
  @import '@/assets/news.scss';
</style>