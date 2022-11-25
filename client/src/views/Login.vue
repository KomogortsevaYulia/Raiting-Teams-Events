<template>
    <div class="form-login">
        <h2>Система учета студенческих коллективов и мероприятий</h2>
        <div class="form-login__submit-campus">
            <button class="btn-campus" type="submit">Авторизоваться через кампус</button>
        </div>
        <form @submit.prevent="onSubmit">
            <div class="form-login__input">
                <input type="text" placeholder="логин" required>
            </div>
            <div class="form-login__input">
                <input type="text" placeholder="пароль" required>
            </div>
            <div class="form-login__submit">
                <button type="submit">Войти</button>
            </div>
        </form>
    </div>
</template>
<script lang="ts" setup>
import '../assets/login.scss';

function onSubmit() {
    console.log('Button is worked!');
}

</script>