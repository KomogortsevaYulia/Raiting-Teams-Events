<template>
  <div class="d-grid gap-2 p-4 rounded shadow">
    <div class="row justify-content-between">
      <div class="col-auto">
        <b
          >Свободны
          <span class="badge rounded-pill bg-danger"
            >{{ date.toLocaleDateString() }} октября</span
          >
          в <span class="badge rounded-pill bg-danger">{{ time }}</span></b
        >
      </div>
      <!--  close btn-->
      <div class="col-auto">
        <div class="btn btn-close" @click="onCloseAuditories()"></div>
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
          v-for="cabinet in categoryList"
          @click="selectedCategory.category = cabinet"
          v-bind:key="cabinet.id"
        >
          <div class="dropdown-item">
            {{ cabinet.name }}
          </div>
        </li>
      </ul>
    </div>
    <div class="col-auto">
      <input class="col-auto me-2" type="checkbox" v-model="filterQuery" />
      На весь семестр
    </div>
    <SearchField :handle-timer-search="handleOnSearch" />
<!--  auditories -->
    <div class="overflow-scroll" style="max-height: 400px">
      <button
        type="button"
        class="btn btn-light m-1"
        v-for="auditorium in auditoriumList"
        :key="auditorium.id"
        @click="onAuditoryClick(auditorium)"
      >
        {{ auditorium.name }}
        <span class="badge bg-light text-dark"
          >{{ auditorium.people_count }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { onBeforeMount, ref, watch } from "vue";
import { useAuditoriesStore } from "@/store/schedule/cabinets_store";
import type { ICabinet } from "@/store/models/schedule/cabinet.model";
import type { ICabinetsSearch } from "@/store/models/schedule/schedule.model";
import SearchField from "@/components/SearchField.vue";

const auditsStore = useAuditoriesStore();

const isCategoryListExpanded = ref(false);
const filterQuery = ref("");

const props = defineProps<{
  onCloseAuditories: () => void;
  date: Date;
  time: string;
  handleOnAuditoryClick: (auditory: ICabinet) => void;
}>();

const cabinetsSearch = ref<ICabinetsSearch>({});

watch(
  () => props.time,
  async () => {
    cabinetsSearch.value.free_time = props.time;
  },
);

watch(
  () => cabinetsSearch.value,
  async () => {
    await getCabinets();
  },
);

onBeforeMount(() => {
  getCabinets();
});

const categoryList = [
  { id: 0, name: "Для занятия вокалом" },
  { id: 1, name: "Для занятия со сценой" },
  { id: 2, name: "Для занятия с музыкальными инструментами" },
];

const auditoriumList = ref<ICabinet[]>();

const selectedCategory = ref({
  category: categoryList[0],
});

async function handleOnSearch(searchTxt: string) {
  cabinetsSearch.value.search = searchTxt;
  await getCabinets();
}

function onAuditoryClick(auditory: ICabinet) {
  props.handleOnAuditoryClick(auditory);
}

async function getCabinets() {
  let data = await auditsStore.getCabinets(cabinetsSearch.value);
  auditoriumList.value = data.cabinets;
}
</script>

<style scoped lang="scss"></style>
