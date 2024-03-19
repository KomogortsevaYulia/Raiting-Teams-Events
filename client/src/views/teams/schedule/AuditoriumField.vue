<template>
  <div class="d-grid gap-2 p-4 rounded shadow">
    <div class="row justify-content-between">
      <div class="col-auto">
        <b
          >Свободны
          <span class="badge rounded-pill bg-danger">02 октября</span> в
          <span class="badge rounded-pill bg-danger">14:00</span></b
        >
      </div>
      <!--  close btn-->
      <div class="col-auto">
        <div class="btn btn-close" @click="onCloseAuditories()">

        </div>
      </div>
    </div>
    <div class="dropdown">
      <div
        class="border rounded px-3 py-2"
        @click="isCategoryListExpanded = !isCategoryListExpanded"
        type="button"
        id="dropdownOrder"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {{ selectedCategory.category.name }}
        <FontAwesomeIcon
          v-if="!isCategoryListExpanded"
          icon="angle-down"
          class="mx-2"
        />
        <FontAwesomeIcon
          v-if="isCategoryListExpanded"
          icon="angle-up"
          class="mx-2"
        />
      </div>
      <ul class="block dropdown-menu" aria-labelledby="dropdownOrder">
        <li
          v-for="value in categoryList"
          @click="selectedCategory.category = value"
          v-bind:key="value.id"
        >
          <div class="dropdown-item">
            {{ value.name }}
          </div>
        </li>
      </ul>
    </div>
    <div class="col-auto">
      <input class="col-auto me-2" type="checkbox" v-model="filterQuery" />
      На весь семестр
    </div>
    <input class="rounded" placeholder="Фильтр по названию аудитории" />
    <div>
      <button
        type="button"
        class="btn btn-light m-1"
        v-for="auditorium in auditoriumList"
        :key="auditorium.id"
      >
        {{ auditorium.name }}
        <span class="badge bg-light text-dark">{{ auditorium.capacity }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { ref } from "vue";

const isCategoryListExpanded = ref(false);
const filterQuery = ref("");

defineProps<{
  onCloseAuditories: () => void;
}>();

const categoryList = [
  { id: 0, name: "Для занятия вокалом" },
  { id: 1, name: "Для занятия со сценой" },
  { id: 2, name: "Для занятия с музыкальными инструментами" },
];

const auditoriumList = [
  { id: 0, name: "Актовый зал", capacity: 200 },
  { id: 1, name: "Спорт. зал", capacity: 550 },
  { id: 2, name: "Б-00", capacity: 30 },
  { id: 3, name: "В-010", capacity: 25 },
  { id: 4, name: "Г-014", capacity: 20 },
];

const selectedCategory = ref({
  category: categoryList[0],
});

</script>

<style scoped lang="scss"></style>
