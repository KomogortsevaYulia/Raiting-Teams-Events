<template>
  <input
    class="search-inp"
    placeholder="Начните поиск..."
    v-model="findTeamTxt"
  />
</template>

<script setup lang="ts">
import _ from "lodash";
import { ref, watch } from "vue";

const findTeamTxt = ref("");

const props = defineProps<{
  handleTimerSearch: (eventTxt: string) => void;
}>();

const fetchTimer = _.debounce(() => {
  props.handleTimerSearch(findTeamTxt.value);
}, 300);

watch(findTeamTxt, () => {
  fetchTimer();
});
</script>

<style scoped lang="scss">
.search-inp {
  width: 100%;
}
</style>
