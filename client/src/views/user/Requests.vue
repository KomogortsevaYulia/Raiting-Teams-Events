
<script setup lang="ts">

import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const idUser = Number(route.query.user_id);

const itemList = [
  { name: "Мероприятия (заявки)"},
  { name: "Коллективы (заявки)" },
]

const selectedItem = ref(0);


onBeforeMount(async () => {
  
})


const selectItem = (i: number) => {
  selectedItem.value = i
}
</script>

<template>
    <!-- Навигация -->
    <div class="navigation">

        <template v-for="(item, index) in itemList" :key="index">
            <a @click="selectItem(index)" :class="{ active: index == selectedItem }">{{ item.name
            }}</a>
        </template>

    </div>

    <!-- see events -->
    <div v-if="(selectedItem === 0)">
       
    </div>

    <!-- see request for creation event -->
    <div v-if="(selectedItem === 1)">

    </div>
</template>

<style lang="scss" scoped>

.navigation {
    padding-bottom: 2rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 5px;
    padding: 20px;
    background: white;

    a {
        cursor: pointer;
        font-size: 14px;
        transition: 0.3s;
        color: #348498;
        margin-inline: 1rem;
        padding-bottom: 0.75rem;

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
</style>
  