<script setup lang="ts">
  import { ref } from 'vue';
  const selectedItem = ref(0);
  let isActive = false;


    const itemList = [
        { name: "Научная деятельность"}, 
        { name: "Учебная деятельность"}, 
        { name: "Спортивная деятельность"},
        { name: "Общественная деятельность"}, 
        { name: "Культурно-творческая деятельность"} 
    ]

    const selectItem = (i: number) => {
        selectedItem.value = i
    }

    itemList.forEach((item, index) => {
        return (isActive = item == itemList[index])
    })
</script>

<template>
    <div class="wrapper-team">
        <!-- Навигация -->
        <div class="wrapper-team__navigation">
            <a @click="selectItem(index)" v-for="(item, index) in itemList" :key="index"
                :class="{active: index == selectedItem}">{{item.name}}</a>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/teams/teams.scss';
</style>