<template>
  <div class="switch border-block">
    <div @click="setState(true)" class="switch-item" :class="{ active: state }">
      <font-awesome-icon :icon="['fas', 'list']" class="fa-lg" />
    </div>
    <div
      @click="setState(false)"
      class="switch-item"
      :class="{ active: !state }"
    >
      <font-awesome-icon :icon="['fas', 'border-all']" class="fa-lg" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";

const state = ref(true); //состояние лэйаута (сетка, лист)

const props = defineProps<{
  onEventChangeState: (stateL: boolean)=>void; //обработка события при смене представления
}>();

onBeforeMount(() => {
  // set state of layout from storage
  const stateStorage = localStorage.getItem("switchToggleLayout");
  state.value = stateStorage ? parseInt(stateStorage) === 1 : true;
  props.onEventChangeState( state.value );

});

function setState(st: boolean) {
  state.value = st;
}

watch(state, (newValue: boolean) => {
  localStorage.setItem("switchToggleLayout", newValue ? "1" : "0");
  props.onEventChangeState(newValue);
});
</script>

<style lang="scss" scoped>
.switch {
  display: flex;
  align-items: center;
  width: fit-content;
  background-color: #fff;
  border-radius: 24px;
  padding: 0.15rem 0.6rem;

  .switch-item {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 35px;
    border-radius: 100%;
    transition: 0.4s;
  }

  .active {
    background-color: #fbcfc7;
  }
}
</style>
