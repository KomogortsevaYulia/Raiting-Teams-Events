<script setup lang="ts">
import _ from 'lodash';
import { ref, watch } from 'vue';

const findTeamTxt = ref("")


const props = defineProps<{
    handleTimerSearch: Function,
}>()


const fetchTimer = _.debounce(() => {
    props.handleTimerSearch(findTeamTxt.value)
}, 300)


watch(findTeamTxt, () => {
    fetchTimer()
})


</script>

<template>
    <input class="search-inp" placeholder="Начните поиск..." v-model="findTeamTxt" />
</template>

<style scoped lang="scss">
.search-inp {
    width: 100%;
}
</style>