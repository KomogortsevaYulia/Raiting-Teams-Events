<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { usePermissionsStore } from '@/store/permissions_store';
import { useRoute, useRouter } from 'vue-router';

const permissionsStore = usePermissionsStore();
const router = useRouter();
const route = useRoute();

const show = ref(true);
const username = ref("");
const password = ref("");


function OnRegistrationSubmit() {
    console.log('Registration is clicked!');
}

function OnLoginCampusSubmit() {
    console.log('Campus login is clicked!');
}

// onMounted(() => {
//     store.checkLogin();
// })

async function OnLoginSubmit() {
    let isLogged = await permissionsStore.login({
        username: username.value,
        password: password.value,
    })

    if (isLogged) {
        // @ts-ignore
        router.push(route.query.next);
    }
}

</script>

<template>
    <div class="form-login">

        <a>Система учета студенческих коллективов и мероприятий ИРНИТУ</a>
        <div class="form-login__choice">
            <a @click="show = true" :class="{ active: show }">Авторизация</a>
            <a @click="show = false" :class="{ active: !show }">Регистрация</a>
        </div>
        <div v-if="show" class="form-login__submit-campus">
            <button @click="OnLoginCampusSubmit" class="btn-campus" type="submit">Авторизоваться через кампус</button>
        </div>

        <!-- Форма авторизации -->
        <form v-if="show" @submit.prevent="OnLoginSubmit">
            <div class="form-login__input">
                <input v-model="username" type="text" placeholder="Почта" required>
            </div>
            <div class="form-login__input">
                <input v-model="password" type="password" placeholder="Пароль" required>
            </div>
            <div class="form-login__submit">
                <p>Забыли пароль?</p>
                <button type="submit">Войти</button>
            </div>
        </form>

        <!-- Форма регистрации -->
        <form v-if="!show" @submit.prevent="OnRegistrationSubmit">
            <div class="form-login__input">
                <input type="text" placeholder="Логин" required>
            </div>
            <div class="form-login__input">
                <input type="password" placeholder="Пароль" required>
            </div>
            <div class="form-login__input">
                <input type="password" placeholder="Повторите пароль" required>
            </div>
            <div class="form-login__input">
                <input type="email" placeholder="Электронная почта" required>
            </div>
            <div class="form-login__submit">
                <button type="submit">Регистрация</button>
            </div>
        </form>
    </div>
</template>

<style lang="scss">
.form-login {
    display: flex;
    padding: 2rem 4rem 2rem 4rem;
    border-radius: 20px;
    height: 500px auto;
    width: 30%;
    flex-direction: column;
    // box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
    border: var(--main-border-card);

    a {
        font-size: 25px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        text-align: center;
        padding: 0 0 4rem 0;
    }

    .form-login__choice {
        display: flex;
        justify-content: center;
        padding-bottom: 1rem;

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

    .form-login__input {
        display: flex;
        flex-direction: column;
        padding: 0.75rem 0 0.75rem 0;
    }

    .form-login__submit-campus {
        display: flex;
        justify-content: center;
    }

    .form-login__submit {
        display: flex;
        justify-content: end;

        p {
            cursor: pointer;
            padding-right: 1rem;
            font-size: 14px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

            &:hover {
                color: #4c70ff;
            }
        }
    }
}
</style>