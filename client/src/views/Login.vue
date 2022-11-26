<template>
    <div class="form-login">
        <a>Система учета студенческих коллективов и мероприятий ИРНИТУ</a>
        <div class="form-login__choice">
            <a v-on:click="show = true" :class="[show ? 'active' : '']">Авторизация</a>
            <a v-on:click="show = false" :class="[show ? '' : 'active']">Регистрация</a>
        </div>
        <div v-if="show === true" class="form-login__submit-campus">
            <button @click="LoginCampusSubmit" class="btn-campus" type="submit">Авторизоваться через кампус</button>
        </div>
        <!-- Форма авторизации -->
        <form v-if="show === true" @submit.prevent="LoginSubmit">
            <div class="form-login__input">
                <input type="text" placeholder="Логин или почта" required>
            </div>
            <div class="form-login__input">
                <input type="password" placeholder="Пароль" required>
            </div>
            <div class="form-login__submit">
                <p>Забыли пароль?</p>
                <button type="submit">Войти</button>
            </div>
        </form>
        <!-- Форма регистрации -->
        <form v-if="show === false" @submit.prevent="RegistrationSubmit">
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
<script lang="ts">
import '../assets/login.scss'

export default {
    data() {
        return {
            show: true
        }
    },
    methods: {
        LoginSubmit() {
            console.log('Login is clicked!');
        },
        RegistrationSubmit() {
            console.log('Registration is clicked!');
        },
        LoginCampusSubmit() {
            console.log('Campus login is clicked!');
        }
    }
}

</script>