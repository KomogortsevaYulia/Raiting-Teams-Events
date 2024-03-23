<template>
  <div class="search-elem">
    <div class="row align-items-center">
      <div class="col-auto">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </div>
      <div class="col">
        <input
          class="search-inp"
          placeholder="Начните поиск..."
          v-model="findTeamTxt"
        />
      </div>
    </div>
  </div>
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
  border: none;

  &:hover, &:active, &:focus-visible, &:focus{
    box-shadow: none !important;
    border: none;
  }

}

.search-elem{
  background: white;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  overflow: hidden;
  padding: 0px 15px;
}
</style>
