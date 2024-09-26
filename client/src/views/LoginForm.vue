<template>
  <div class="form-login">
    <a>Система учета студенческих коллективов и мероприятий ИРНИТУ</a>
    <div class="form-login__choice">
      <a @click="show = true" :class="{ active: show }">Авторизация</a>
      <a @click="show = false" :class="{ active: !show }">Регистрация</a>
    </div>
    <!-- error msg -->
    <div v-if="error && error.message" class="alert alert-danger" role="alert">
      {{ error.message }}
    </div>

    <div v-if="show" class="form-login__submit-campus">
      <button @click="OnLoginCampusSubmit" class="btn-campus" type="submit">
        Авторизоваться через кампус
      </button>
    </div>

    <!-- Форма авторизации -->
    <form v-if="show" @submit.prevent="OnLoginSubmit">
      <div class="form-login__input">
        <input v-model="username" type="text" placeholder="Почта" required />
      </div>
      <div class="form-login__input">
        <input
          v-model="password"
          type="password"
          placeholder="Пароль"
          required
        />
      </div>
      <div class="form-login__submit">
        <p>Забыли пароль?</p>
        <button type="submit">Войти</button>
      </div>
    </form>

    <!-- Форма регистрации -->
    <form v-if="!show" @submit.prevent="OnRegistrationSubmit">
      <div class="form-login__input">
        <input type="text" placeholder="Логин" required />
      </div>
      <div class="form-login__input">
        <input type="password" placeholder="Пароль" required />
      </div>
      <div class="form-login__input">
        <input type="password" placeholder="Повторите пароль" required />
      </div>
      <div class="form-login__input">
        <input type="email" placeholder="Электронная почта" required />
      </div>
      <div class="form-login__submit">
        <button type="submit">Регистрация</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { usePermissionsStore } from "@/store/permissions_store";
import { useRouter } from "vue-router";

const permissionsStore = usePermissionsStore();
const router = useRouter();

const show = ref(true);
const username = ref("");
const password = ref("");
const error = ref();

function OnRegistrationSubmit() {
  console.log("Registration is clicked!");
}

function OnLoginCampusSubmit() {
  window.location.href =
    `${String(process.env.CAMPUS_LOGIN)}/?client_id=${String(process.env.BITRIX_CLIENT_ID)}`;
}

async function OnLoginSubmit() {
  error.value = null;

  let isLogged = await permissionsStore
    .login({
      username: username.value,
      password: password.value,
    })
    .catch((err) => {
      error.value = err.response.data;
    });

  if (isLogged) {
    await router.push("/news");
  }
}
</script>

<style lang="scss" scoped>
.form-login {
  display: flex;
  padding: 2rem 4rem 2rem 4rem;
  border-radius: 20px;
  max-width: 440px;
  min-width: 288px;
  flex-direction: column;
  margin: auto;
  background-color: #fff;
  border: var(--main-border-card);

  a {
    font-size: 25px;
    text-align: center;
    padding: 0 0 4rem 0;
  }

  &__choice {
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
    text-decoration: none;

    a {
      cursor: pointer;
      font-size: 14px;
      padding: 0 0.75rem 0.75rem 0.75rem;

      &:hover {
        color: var(--main-color);
      }

      &:active {
        transition: all 0.2s;
        color: var(--main-color-hover);
        border-bottom-color: var(--main-color-hover);
      }
    }

    .active {
      border-bottom: var(--main-border-bottom);
    }
  }

  &__input {
    display: flex;
    flex-direction: column;
    padding: 0.75rem 0 0.75rem 0;
  }

  &__submit-campus {
    display: flex;
    justify-content: center;
  }

  &__submit {
    display: flex;
    justify-content: end;
    align-items: center;

    p {
      cursor: pointer;
      margin: 0;
      padding-right: 1rem;
      font-size: 14px;

      &:hover {
        color: #4c70ff;
      }
    }
  }
}
</style>
