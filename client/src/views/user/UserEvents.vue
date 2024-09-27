<template>
  <!-- dropdowns -->
  <div class="row my-3">
    <div class="col-auto">
      <label class="form-label fw-bold">Статус</label>
      <select
        class="form-select"
        aria-label="Status"
        v-model="selectedStatus"
        @change="fetchEvents()"
      >
        <option v-for="st in status" :value="st.id">{{ st.name }}</option>
      </select>
    </div>
  </div>

  <!-- cards of events -->
  <div class="row">
    <div class="events-requests__wrapper">
      <div
        v-if="events == null || events.length <= 0"
        class="alert alert-warning"
        role="alert"
      >
        Заявок нет
      </div>

      <div v-else v-for="event in events">
        <!-- карточка -->
        <CardApprove :positive-border-color="event.status">
          <template #title>
            ({{ event.direction ? event.direction.name : "-" }})
            {{ event.title }}
          </template>

          <template #time>
            {{ new Date(event.date_update).toLocaleDateString() }}
          </template>

          <template #body>
            <div class="row">
              <div class="col-auto">
                <div class="style-elem">Уровень:</div>
              </div>
              <div class="col-auto">
                {{ event.level ? event.level.name : "-" }}
              </div>
            </div>

            <div class="row">
              <div class="col-auto">
                <div class="style-elem">Формат проведения:</div>
              </div>
              <div class="col-auto">
                {{ event.format ? event.format.name : "-" }}
              </div>
            </div>
            <div class="row">
              <div class="col-auto">
                <div class="style-elem">Количество участников:</div>
              </div>
              <div class="col-auto">{{ event.count_people ?? "-" }}</div>
            </div>
            <div class="row">
              <div class="col-auto">
                <div class="style-elem">Даты начала/окончания:</div>
              </div>
              <div class="col-auto">
                {{ new Date(event.dateStart).toLocaleDateString() }} -
                {{ new Date(event.dateEnd).toLocaleDateString() }}
              </div>
            </div>
          </template>

          <template #footer>
            <div class="col-auto">
              <div class="fw-bold">Статус:</div>
            </div>
            <div class="col-auto">
              <div v-if="event.status">
                <font-awesome-icon icon="check-circle" class="text-success" />
                принято
              </div>
              <div v-else-if="event.status != null">
                <font-awesome-icon icon="circle-xmark" class="text-danger" />
                отклонено
              </div>
              <div v-else>
                <font-awesome-icon icon="clock" />
                в ожидании
              </div>
            </div>
          </template>

          <template #buttons>
            <div class="col d-flex justify-content-end">
              <button
                class="button btn-custom-accept"
                @click="updateEvent(event.id)"
              >
                Редактировать
              </button>
            </div>
            <div class="col-auto">
              <button class="button" @click="deleteEvent(event.id)">
                Удалить
              </button>
            </div>
          </template>
        </CardApprove>
      </div>
    </div>
  </div>

  <div class="row">
    <Pagination
      :max-page="maxPages"
      :visible-pages="visiblePages"
      :handleEventChangePage="handleEventChangePage"
    />
  </div>
</template>

<script setup lang="ts">
import Pagination from "@/components/Pagination.vue";
import { useEventStore } from "@/store/events_store";

import { onBeforeMount, ref } from "vue";
import { useDictionaryStore } from "@/store/dictionary_store";
import CardApprove from "@/components/CardApprove.vue";
import { Status, Type } from "@/store/enums/enum_event";
import { Event } from "@/store/models/events.model";

const eventsStore = useEventStore();
const dictionaryStore = useDictionaryStore();

const props = defineProps<{
  idUser: number;
}>();

const events = ref();
const status = [
  { id: 0, name: "Принятные", value: Status.ACCEPTED },
  { id: 1, name: "Отклоненные", value: Status.CANCELLED },
  { id: 2, name: "В рассмотрении", value: Status.CREATED },
  { id: 3, name: "Все", value: Status.ALL },
];

// загрузка
const loading = ref(false);

// dropdowns
const selectedStatus = ref(2);

//pagination ---------------------------------------------------------------------
const limit = 5; //сколько  отображается на странице

const maxPages = ref(1);
const visiblePages = 7;
//pagination ---------------------------------------------------------------------

const eventFilter = ref(new Event());

onBeforeMount(async () => {
  eventFilter.value.limit = limit;
  eventFilter.value.offset = 0;
  eventFilter.value.type = Type.OUTSIDE;
  eventFilter.value.direction = null;
  eventFilter.value.user_id = props.idUser;

  await fetchEvents();
});

async function fetchEvents() {
  loading.value = true;

  eventFilter.value.status = status[selectedStatus.value].value;

  let d = await eventsStore.fetchEvents(eventFilter.value);
  events.value = d[0];

  const eventsCount = d[1];
  maxPages.value = eventsCount >= limit ? Math.ceil(eventsCount / limit) : 1;
  loading.value = false;
}

async function handleEventChangePage(currentPage: number) {
  eventFilter.value.offset = (currentPage - 1) * limit;

  await fetchEvents();
}

async function updateEvent(id: number) {}

async function deleteEvent(id: number) {
  await eventsStore.deleteEvent(id);
}
</script>

<style lang="scss" scoped>
.events-requests__wrapper {
  .style-elem {
    color: var(--second-color);
  }
}
</style>
