<script setup lang="ts">
    import { ref } from 'vue';

    const selectedItem = ref(0);
    const showCreate = ref(false);

    const itemList = [
        { name: "Научная"}, 
        { name: "Учебная"}, 
        { name: "Спортивная"},
        { name: "Общественная"}, 
        { name: "Культурно-творческая"} 
    ]

    const selectItem = (i: number) => {
        selectedItem.value = i
    }

    itemList.forEach((item, index) => {
        return (item == itemList[index])
    })
</script>

<template>
    <div class="wrapper-team">
        <!-- Навигация -->
        <div class="wrapper-team__navigation">
            <a @click="selectItem(index), showCreate = false" v-for="(item, index) in itemList" :key="index"
                :class="{active: index == selectedItem}">{{item.name}}</a>
        </div>

        <div class="wrapper-team__create">
            <div v-for="(item, index) in itemList" :key="index">
                <div class="content" v-if="(index == selectedItem && !showCreate)">
                    <label>Руководитель направления</label>
                    <a>Иванов Иван Иванович {{ item.name }}</a>
                    <div class="btn">
                        <button v-on:click="(showCreate = true)">Изменить</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Форма с полями для создания -->
        <div class="wrapper-team__create">
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
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/globals.scss';

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
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 14px;
            transition: 0.3s;
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