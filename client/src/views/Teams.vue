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
            <img v-on:click="layout = true" :class="[layout === true ? 'active' : '']" src="../assets/icon/grid.png">
            <img v-on:click="layout = false" :class="[layout === false ? 'active' : '']" src="../assets/icon/list.png">
          </div>
        </div>

        <!-- Сами карточки -->
        <div :class="[layout === true ? 'wrapper-grid' : 'wrapper-list']">

          <div class="card">
            <img src="../assets/icon/stairway.jpg">
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

          <div class="card">
            <img src="../assets/icon/stairway.jpg">
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

          <div class="card">
            <img src="../assets/icon/stairway.jpg">
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

          <div class="card">
            <img src="../assets/icon/stairway.jpg">
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

          <div class="card">
            <img src="../assets/icon/stairway.jpg">
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
    </div>

    <div v-if="show === false" class="wrapper-team__create">
      <p>Прежде чем создать в системе новый коллектив, нужно
        утвердить его приказом!</p>

      <!-- Форма с полями для создания -->
      <form v-if="showCreate === true" class="form-team__create">
        <div class="create-filds">
          <div class="filds-area">
            <input type="text" placeholder="Название коллектива" required>
            <input type="text" placeholder="ФИО руководителя" required>
            <textarea placeholder="Опишите проект" required />
          </div>
          <div class="fuck-off-btn">
            <button v-on:click="showCreate = false">Создать коллектив</button>
          </div>
        </div>
        <div class="create-wrapper-img">

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
            showCreate: false,
            layout: true
        }
    },
    methods: {

    }
}

</script>
