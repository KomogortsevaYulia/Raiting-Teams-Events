<script setup lang="ts">
    import { ref } from 'vue';
    const show = ref(true);

    function OnLoginSubmit() {
        console.log('Login is clicked!');
    }
    
    function OnRegistrationSubmit() {
        console.log('Registration is clicked!');
    }

    function OnLoginCampusSubmit() {
        console.log('Campus login is clicked!');
    }
</script>

<template>
    <div class="form-login">
        
        <a>Система учета студенческих коллективов и мероприятий ИРНИТУ</a>
        <div class="form-login__choice">
            <a @click="show = true" :class="{active: show}">Авторизация</a>
            <a @click="show = false" :class="{active: !show}">Регистрация</a>
        </div>
        <div v-if="show" class="form-login__submit-campus">
            <button @click="OnLoginCampusSubmit" class="btn-campus" type="submit">Авторизоваться через кампус</button>
        </div>

        <!-- Форма авторизации -->
        <form v-if="show" @submit.prevent="OnLoginSubmit">
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
    @import '@/assets/login.scss';
</style>