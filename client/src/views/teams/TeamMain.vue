<template>
  <div class="navigation-tags">
    <div v-for="(item, index) in team.tags" :key="index" class="teg">
      {{ item }}
    </div>
  </div>
  <hr />
  <div class="middle-panel">
    <div class="column-left">
      <h2>О коллективе</h2>
      {{ team.description }}
    </div>
    <div class="column-right">
      <div class="image-container">
        <div v-for="(item, index) in team.image" :key="index">
          <img :src="item" v-if="currentPage === index" />
        </div>
      </div>
      <div class="page-arrows" v-iv="team.image.length > 0">
        <div class="arrow-left" @click="previousPage">
          <FontAwesomeIcon icon="angle-left" />
        </div>
        <div class="arrow-right" @click="nextPage">
          <FontAwesomeIcon icon="angle-right" />
        </div>
      </div>
      <div class="add-container">
        <input
          ref="image"
          class="form-control"
          type="file"
          @change="uploadImage"
        />
        <button @click="addImage()">Добавить изображение</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTeamStore } from "@/store/team_store";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";

const props = defineProps<{
  team: any; //коллектив
  onUpdateTeam: Function;
}>();

const teamStore = useTeamStore();

const currentPage = ref(0);

const image = ref<File>();

function setCurrentPage(page: number) {
  currentPage.value = page;
}

function nextPage() {
  if (currentPage.value + 1 < props.team.image.length) {
    currentPage.value++;
  } else {
    currentPage.value = 0;
  }
}

function previousPage() {
  if (currentPage.value - 1 >= 0) {
    currentPage.value--;
  } else {
    currentPage.value = props.team.image.length - 1;
  }
}

function uploadImage(e: any) {
  image.value = e.target.files[0];
}

async function addImage() {
  let formteam = new FormData();
  formteam.append("file", image.value!);

  image.value = undefined;

  await teamStore.addImage(props.team.id, formteam);
  props.onUpdateTeam();
}
</script>

<style lang="scss" scoped>
.wrapper-team__navigation {
  padding-bottom: 2rem;

  .active {
    color: var(--main-color);
    border-bottom: var(--main-border-bottom);
  }
}

.navigation-tags {
  display: flex;

  .teg {
    margin-right: 1rem;
    background-color: #b7eaed;
    padding: 0.2rem 1rem;
    color: #348498;
    border-radius: 5px;
  }
}

.middle-panel {
  display: flex;

  .title {
    color: rgb(8, 7, 7);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .column-left {
    h2 {
      color: #000;
      font-size: 20px;
      height: 2rem;
      font-family: var(--font-family-title);
    }
  }

  .column-right {
    max-width: fill-available;
    padding: 0 10px;

    .add-container {
      margin-top: 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      button {
        margin-top: 10px;
      }
    }

    .image-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 300px;
      height: 200px;
      background-size: cover;
      overflow: hidden;
      border-radius: 25px;

      img {
        max-width: 100%;
        height: auto;
      }
    }

    .page-arrows {
      padding-top: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .arrow-left,
    .arrow-right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      margin: 0 10px;
      border-radius: 50%;
      background-color: #ccc;
      cursor: pointer;
    }

    .arrow-left i,
    .arrow-right i {
      color: #fff;
      font-size: 14px;
    }

    // .page-buttons {
    //   display: flex;
    //   justify-content: center;
    // }

    // .page-buttons button {
    //   border: none;
    //   border-radius: 10px;
    //   margin: 0 5px;
    //   width: 1px;
    //   height: 1px;
    //   background-color: #ccc;
    // }

    // .page-buttons button.active {
    //   background-color: var(--main-color);
    // }
  }
}
</style>
