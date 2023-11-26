<template>
  <nav class="navbar navbar-wrapper navbar-expand-xl fixed-top p-2">
    <div class="container-fluid mx-lg-6 mx-md-5">
      <!-- Иконка политеха -->
      <div class="navbar__item-logo">
        <RouterLink to="/news">
          <img src="@/assets/icon/logo.svg" alt="logo" class="logo" />
        </RouterLink>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Переключатель навигации"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <!-- Здесь перебираем элементы из массива менюшек -->
        <div class="navbar__item-link row w-100 justify-content-center">
          <div
            v-for="item in itemLink"
            class="link-item col-auto"
            v-bind:key="item.name"
          >
            <RouterLink class="link" active-class="active" :to="item.path">
              <p class="align-items-center d-flex">{{ item.name }}</p>
            </RouterLink>
          </div>

          <div v-if="can('can view directions')" class="link-item col-auto">
            <RouterLink class="link" active-class="active" :to="'/statistic'">
              <p class="align-items-center d-flex">Статистика</p>
            </RouterLink>
          </div>

          <div v-if="can('can view directions')" class="link-item col-auto">
            <RouterLink class="link" active-class="active" :to="'/directions'">
              <p class="align-items-center d-flex">Направления</p>
            </RouterLink>
          </div>

            <div v-if="can('can all')" class="link-item col-auto">
                <RouterLink class="link" active-class="active" :to="'/admin-panel'">
                    <p class="align-items-center admin-btn d-flex"> <span>Админ панель </span> <font-awesome-icon :icon="['fas', 'gear']" class="fa-xl mx-2" /></p>
                </RouterLink>
            </div>
        </div>
        <!-- Кнопка вход + Личный кабинет-->
        <div class="navbar__item-login justify-content-center d-flex">
          <User_Profile v-if="permissions_store.isLogged" />
          <RouterLink v-if="!permissions_store.isLogged" to="/login">
            <button class="login-button">Войти</button>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ref } from "vue";
import User_Profile from "@/components/UserProfile.vue";
import { usePermissionsStore } from "@/store/permissions_store";

const permissions_store = usePermissionsStore();
const can = permissions_store.can;
ref(permissions_store.isLogged);

const itemLink = [
  // { name: "Анкета(Создание)", path: "/questionnaire" },
  { name: "Мероприятия", path: "/news" },
  { name: "Коллективы", path: "/teams" },
  // { name: "Статистика", path: "/statistic" },
];
</script>

<style lang="scss" scoped>
@import "@/assets/globals.scss";

.navbar-toggler {
  background: none;

  &:hover {
    background: none;
  }
}

// Блок
.navbar-wrapper {
  background-color: white;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  align-items: center;

  // Элемент иконки
  .navbar__item-logo {
    img {
      height: 40px;
      width: 40px;
    }
  }

  // Элементы навигации
  .navbar__item-link {
    margin: 0 auto 0 auto;
    display: flex;

    .link-item {
      padding: 1rem;

      .admin-btn{
        padding: 0 10px;
        border-radius: 50px;
        border: 2px solid var(--main-navigation-color);

        &:hover{
          border: 2px solid var(--main-color);
        }
      }


      p {
        cursor: pointer;
        height: 2rem;
        color: var(--main-navigation-color);
        transition: 0.2s ease;
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        margin: 0;
        font-family: var(--font-family-title);

        &:hover {
          color: var(--main-color);
        }
      }
    }

    .active {
      p {
        color: var(--main-color);
        border-bottom: var(--main-border-bottom);
      }
    }
  }

  // Элемент кнопки "Вход"
  .navbar__item-login {
    .login-button {
      padding: 0.5rem 2rem 0.5rem 2rem;
      border-radius: 10px;
      background-color: var(--main-color);
      color: #fff;

      &:hover {
        background: var(--main-color-hover);
        transition: 0.3s;
      }
    }
  }
}
</style>
