<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useTeamStore } from '@/store/team_store';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const selectedItem = ref(0);
const showCreate = ref(false);
const directions = ref()
// store--------------------------------------------------------------
const teamStore = useTeamStore();

// const itemList = [
//     { name: "Научная", direction:DirectionName.NID },
//     { name: "Учебная",  direction:DirectionName.UD },
//     { name: "Спортивная",  direction:DirectionName.SD },
//     { name: "Общественная",  direction:DirectionName.OD },
//     { name: "Культурно-творческая",  direction:DirectionName.KTD }
// ]

onBeforeMount(async () => {
    await getDirections()
})

const selectItem = (i: number) => {
    selectedItem.value = i
}

async function getDirections() {
    // directions.value =  await teamStore.fetchTeamsOfDirection()

    const data = await teamStore.fetchDirections()
    directions.value = data[0]

}

</script>

<template>
    <div class="wrapper-team wrapper-content">

        <!-- Навигация -->
        <div class="wrapper-team__navigation">
            <a @click="selectItem(index), showCreate = false" v-for="(direction, index) in directions" :key="index"
                :class="{ active: index == selectedItem }">{{ direction.title }}</a>
        </div>

        <div class="wrapper-team__create">
            <div v-for="(direction, index) in directions" :key="index">
                <div class="content" v-if="(index == selectedItem && !showCreate)">
                    <!--description  -->
                    <p>({{ direction.shortname }}) {{ direction.description }}</p>
                    <div class="alert alert-info">
                        <div v-if="direction.functions[0] &&
                            direction.functions[0].userFunctions[0]">
                            <p>
                                Руководитель: {{ direction?.functions[0]?.userFunctions[0]?.user?.fullname }}
                            </p>

                            <p>Почта: {{ direction?.functions[0]?.userFunctions[0]?.user?.email ?? "-" }}</p>
                            <p>Телефон: {{ direction?.functions[0]?.userFunctions[0]?.user?.phone ?? "-" }}</p>
                        </div>
                        <div v-else> Руководитель не назначен</div>
                        <p>Аудитория: {{ direction.cabinet ?? "-" }}</p>
                    </div>

                </div>
            </div>
            <div class="">
                <button>Рейтинговая стипендия <FontAwesomeIcon icon="arrow-right"/></button>
            </div>

            <!-- <div class="btn">
                <button v-on:click="(showCreate = true)">Изменить</button>
            </div> -->
        </div>

        <!-- Форма с полями для создания -->
        <!-- <div class="wrapper-team__create">
            <form v-if="showCreate" class="form-team__create">
                <div class="create-filds">
                    <div class="filds-area">
                        <input type="text" placeholder="ФИО руководителя" required>
                    </div>
                    <div class="btn">
                        <button @click="showCreate = false">Сохранить</button>
                    </div>
                </div>
            </form>
        </div> -->
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/globals.scss';

.btn {
    padding-top: 1rem;
}

.content {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
}

.wrapper-team {
    display: block;
    width: 100%;
    justify-content: center;

    .wrapper-team__navigation {
        padding-bottom: 2rem;
        width: 100%;

        a {
            cursor: pointer;
            font-size: 14px;
            transition: 0.3s;
            text-decoration: none;
            color: #348498;
            margin-inline: 1rem;
            padding-bottom: 5px;

            &:hover {
                color: var(--main-color);
            }
        }

        // Первому элементу ставим отступ = 0, чтобы не выпирал
        a:first-child {
            margin-left: 0;
        }

        .active {
            color: var(--main-color);
            border-bottom: var(--main-border-bottom);
        }
    }
}
</style>