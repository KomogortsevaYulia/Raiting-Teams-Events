<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';


const date1 = ref()
const date2 = ref()
const date3 = ref()
const date4 = ref()

const hoursArray = computed(() => {
    const arr = [];
    for (let i = 0; i < 24; i++) {
        arr.push({ text: i < 10 ? `0${i}` : i, value: i });
    }
    return arr;
});

const minutesArray = computed(() => {
    const arr = [];
    for (let i = 0; i < 60; i++) {
        arr.push({ text: i < 10 ? `0${i}` : i, value: i });
    }
    return arr;
});

</script>

<template>
    <div class="eventInfo row">
        <div class="margins-edit row">
            <p class="text-edit">Название мероприятия</p>
            <input placeholder="edit me" />
        </div>
        <div class="margins-edit row">
            <p class="text-edit">Описание</p>
            <input placeholder="edit me" />
        </div>

        <div class=" margins-edit datePickers row ">
            <div class="col ps-0">
                <div class="row">
                    <p class="text-edit" style="text-align: center;">Дата начала мероприятия</p>
                </div>
                <div class="row">
                    <VueDatePicker locale="ru" v-model="date1" placeholder="Start Typing ..." text-input
                        :enable-time-picker="false"></VueDatePicker>
                </div>


            </div>
            <div class="col">
                <div class="row">
                    <p class="text-edit" style="text-align: center;">Дата окончания мероприятия</p>
                </div>
                <div class="row">
                    <VueDatePicker locale="ru" v-model="date2" placeholder="Start Typing ..." text-input
                        :enable-time-picker="false"></VueDatePicker>
                </div>


            </div>
            <div class="col">
                <div class="row">
                    <p class="text-edit" style="text-align: center;">Дата начала регистрации</p>
                </div>
                <div class="row">
                    <VueDatePicker locale="ru" v-model="date3" placeholder="Start Typing ..." text-input> </VueDatePicker>
                </div>
            </div>
            <div class="col pe-0">
                <div class="row">
                    <p class="text-edit" style="text-align: center;">Дата окончания регистрации</p>
                </div>
                <div class="row">
                    <VueDatePicker locale="ru" v-model="date4" placeholder="Start Typing ..." text-input></VueDatePicker>
                </div>
            </div>
        </div>
        <div class="margins-edit row">
            <p class="text-edit">Цель проведения</p>
            <input placeholder="edit me" />
        </div>
        <div class="margins-edit row">
            <p class="text-edit">Место проведения</p>
            <input placeholder="edit me" />
        </div>
        <div class="margins-edit row d-flex align-items-end">
            <div class="col ps-0 col">
                <p class="text-edit">Уровень</p>
                <select class="col form-select">
                    <option disabled value="">Please select one</option>
                    <option>A</option>
                </select>
            </div>
            <div class="col ps-md-0">
                <p class="text-edit">Формат проведения</p>
                <select class="col form-select">
                    <option disabled value="">Please select one</option>
                    <option>A</option>
                </select>
            </div>
            <div class="col ">
                <p class="text-edit">Уточняющее направление</p>
                <select class="col pe-0 form-select">
                    <option disabled value="">Please select one</option>
                    <option>A</option>
                </select>
            </div>
        </div>
        <div class="margins-edit row d-flex align-items-end">
            <div class="col ps-0">
                <select class="col form-select">
                    <option disabled value="">Please select one</option>
                    <option>A</option>
                </select>
            </div>
            <div class="col">
                <div class="row">
                    <p class="text-edit">Размер команды</p>
                </div>
                <div class="row"> <input placeholder="edit me" /></div>


            </div>
            <div class="col ">
                <p class="text-edit">Характер мероприятия</p>
                <select class="col pe-0 form-select">
                    <option disabled value="">Please select one</option>
                    <option>A</option>
                </select>
            </div>
        </div>
        <div class="margins-edit row d-flex align-items-end">
            <div class="col ps-0">
                <p class="text-edit">Контроль</p>
                <select class="form-select">
                    <option disabled value="">Please select one</option>
                    <option>A</option>
                </select>
            </div>
            <div class="col">
                <div class="row">
                    <p class="text-edit">Плановое количество участников</p>
                </div>
                <div class="row"> <input placeholder="edit me" />
                </div>
            </div>
            <div class="col">
                <p class="text-edit">Вид участия</p>
                <select class="col pe-0 form-select">
                    <option disabled value="">Please select one</option>
                    <option>A</option>
                </select>
            </div>
        </div>
        <div class="margins-edit row pb-3">
            <p class="text-edit">Теги</p>
            <input placeholder="edit me" />
        </div>
        <div class="d-flex justify-content-end pb-3">
            <button type="button" class="button ">Создать</button>
        </div>
    </div>
</template>

<style lang="scss">
@import '@vuepic/vue-datepicker/src/VueDatePicker/style/main.scss';

.eventInfo {


    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);

    width: 100%;
    height: auto;

    padding: 20px;
    justify-content: center;
    border-radius: 1rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition: all .5s;

    h1 {

        font-size: 1.8em;
        margin-top: 1rem;
        padding-top: 1em;

        margin-bottom: 1rem;
        margin-inline-start: 3.8em;
        margin-inline-end: 1.71rem;

    }

}



.button {

    background-color: #FF502F;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;

    &:hover {
        background: var(--main-color-hover);
        transition: 0.3s;
    }
}

.text-edit {
    padding: 0em;
    margin: 0em;
    margin-bottom: 0.3em;

}

.margins-edit {
    padding-top: 1em;
    margin-inline-start: 1em;
    margin-inline-end: 1em;


}
</style>