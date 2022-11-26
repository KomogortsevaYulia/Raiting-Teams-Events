<template>
  <!-- Это вся обертка -->
  <div class="wrapper-team">

    <!-- Навигация -->
    <div class="wrapper-team__navigation">
      <a v-on:click="show = true" :class="[show ? 'active' : '']">Общий список</a>
      <a v-on:click="show = false" :class="[show ? '' : 'active']">Создать коллектив</a>
    </div>

    <!-- Обертка карточек коллективов -->
    <div v-if="show === true" class="wrapper-team__content">
      <!-- Фильтр -->
      <div class="content-filter">
      </div>

      <!-- Обертка контента с карточками -->
      <div class="content-cards">
        <!-- Инпут с поиском -->
        <div class="cards__search">
          <input placeholder="Начните поиск..." />
          <div class="search-toggle">
            <img class="active" src="../assets/icon/grid.png">
            <img src="../assets/icon/list.png">
          </div>
        </div>

        <!-- Сами карточки -->
        <div class="cards__wrapper">

          <div class="card">
            <!-- <img src="../assets/icon/user.png"> -->
            <a>Клуб "Автостопом по галактике"</a>
            <p>Мы любители - звездочеты, ищем себе в клуб ребят, которые горят желанием изучать космос, серьезно
              заниматься астрономией и просто любоваться на звездное небо!</p>
            <p>Руководитель: Иванов Иван Иванович</p>

            <RouterLink to="/team-1">
              <button>Подробнее</button>
            </RouterLink>
          </div>

          <div class="card">
            <!-- <img src="../assets/icon/user.png"> -->
            <a>Клуб "Автостопом по галактике"</a>
            <p>Мы любители - звездочеты, ищем себе в клуб ребят, которые горят желанием изучать космос, серьезно
              заниматься астрономией и просто любоваться на звездное небо!</p>
            <p>Руководитель: Иванов Иван Иванович</p>

            <RouterLink to="/team-1">
              <button>Подробнее</button>
            </RouterLink>
          </div>

          <div class="card">
            <!-- <img src="../assets/icon/user.png"> -->
            <a>Клуб "Автостопом по галактике"</a>
            <p>Мы любители - звездочеты, ищем себе в клуб ребят, которые горят желанием изучать космос, серьезно
              заниматься астрономией и просто любоваться на звездное небо!</p>
            <p>Руководитель: Иванов Иван Иванович</p>

            <RouterLink to="/team-1">
              <button>Подробнее</button>
            </RouterLink>
          </div>

        </div>
      </div>
    </div>

    <div v-if="show === false" class="wrapper-team__create">
      <p>Прежде чем создать в системе новый коллектив, нужно
        утвердить его приказом</p>

      <!-- Форма с полями для создания -->
      <form v-if="showCreate === true">
        <div class="form-team__create">
          <div class="create-filds">
            <input type="text">
            <input type="text">
            <input type="text">

            <button v-on:click="showCreate = false">Создать коллектив</button>
          </div>
          <div class="create-wrapper-img">

          </div>
        </div>
      </form>
      <button v-if="showCreate === false" v-on:click="showCreate = true">Создать коллектив</button>

    </div>
  </div>
</template>

<script lang="ts">
import '../assets/teams.scss'

export default {
    data() {
        return {
            show: true,
            showCreate: false
        }
    },
    methods: {

    }
}

</script>
