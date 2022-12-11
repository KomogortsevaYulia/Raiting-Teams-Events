<script setup lang="ts">
import { ref } from "vue";

const sets = ref(['Набор октрыт', 'Закртый коллектив'])
const showSetBlock = ref(false)
function onClickSet() {
    showSetBlock.value = !showSetBlock.value;
}

const activities = ref(['Спортивная', 'Учебная', 'Научная'])
const showActivityBlock = ref(false)
function onClickActivity() {
    showActivityBlock.value = !showActivityBlock.value;
}

const collectives = ref(['Автостопом по галактике', 'Еще какой-нибудь'])
const showCollectiveBlock = ref(false)
function onClickСollective() {
    showCollectiveBlock.value = !showCollectiveBlock.value;
}

</script>

<template>
    <div>
        <button @click="onClickSet" class="btn brn-primary d-flex  " type="button">
            ↑Набор
        </button>
        <div v-for="set in sets">
            <div class="card card-body" v-show="showSetBlock">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        {{ set }}
                    </label>
                </div>
            </div>
        </div>
    </div>
    <div>

        <button @click="onClickСollective" class="btn brn-primary" type="button">
            Тип коллектива
        </button>
        <div v-for="сollective in collectives">
            <div class="card card-body" v-show="showCollectiveBlock">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        {{ сollective }}
                    </label>
                </div>
            </div>
        </div>
    </div>

    <div>
        <button @click="onClickActivity" class="btn brn-primary" type="button">
            Вид деятельности
        </button>
        <div v-for="activity in activities">
            <div class="card card-body" v-show="showActivityBlock">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        {{ activity }}
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/teams/filter.scss';
</style>