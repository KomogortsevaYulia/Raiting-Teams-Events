<template>
    <div v-if="team">
        <div class="navigation-tags row g-1">
            <Tag v-for="(item, index) in team.tags" class="col-auto me-2" :text="item" :key="index"/>
        </div>
        <hr/>
        <div class="middle-panel">
            <div class="column-left">
                <h2>О коллективе</h2>
                {{ team.description }}
            </div>
            <div class="column-right">
                <div class="image-container">
                    <div v-for="(item, index) in team.image" :key="index">
                        <img :src="item" v-if="currentPage === index" alt=""/>
                    </div>
                </div>
                <div class="page-arrows" v-if="team.image && team.image.length > 0">
                    <div class="arrow-left" @click="previousPage">
                        <FontAwesomeIcon icon="angle-left"/>
                    </div>
                    <div class="arrow-right" @click="nextPage">
                        <FontAwesomeIcon icon="angle-right"/>
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
    </div>
</template>

<script setup lang="ts">
import {useTeamStore} from "@/store/team_store";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {ref} from "vue";
import Tag from "@/components/TagElem.vue";
import type {ITeam} from "@/store/models/teams/team.model";

const props = defineProps<{
    team: ITeam; //коллектив
    onUpdateTeam: () => void;
}>();

const teamStore = useTeamStore();

const currentPage = ref(0);

const image = ref<File>();

function nextPage() {
    if (props.team.image && currentPage.value + 1 < props.team.image.length) {
        currentPage.value++;
    } else {
        currentPage.value = 0;
    }
}

function previousPage() {
    if (currentPage.value - 1 >= 0) {
        currentPage.value--;
    } else if (props.team.image) {
        currentPage.value = props.team.image.length - 1;
    }
}

function uploadImage(e: { target: { files: (File | undefined)[]; }; }) {
    image.value = e.target.files[0];
}

async function addImage() {
    let formteam = new FormData();
    formteam.append("file", image.value!);

    image.value = undefined;

    if (props.team.id) {
        await teamStore.addImage(props.team.id, formteam);
        props.onUpdateTeam();
    }

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
}

.middle-panel {
  display: flex;

  .title {
    color: rgb(8, 7, 7);
    border-radius: var(--border-radius);
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
    max-width: max-content;
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
