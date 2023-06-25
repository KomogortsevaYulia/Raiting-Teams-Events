<template>
    <!-- dropdowns -->
    <div class="row my-3">
        <div class="col-auto">
            <label class="form-label fw-bold">Направление</label>
            <select class="form-select" aria-label="Direction" v-model="selectedDirection" @change="fetchEvents()">
                <option v-for="direction in directions" :value="direction.id">{{ direction.name }}</option>
            </select>
        </div>

        <div class="col-auto">
            <label class="form-label fw-bold">Статус</label>
            <select class="form-select" aria-label="Status" v-model="selectedStatus" @change="fetchEvents()">
                <option v-for="st in status" :value="st.id">{{ st.name }}</option>
            </select>
        </div>
    </div>

    <!-- cards of events -->
    <div class="row">
        <div class="events-requests__wrapper">
            <div v-for="event in events">
                <div
                    :class="['block-content card-event border-left', `${event.status ? 'border-left__success' : (event.status != null ? 'border-left__danger' : '')}`]">

                    <div class="row mb-4">
                        <div class="col card-event__name">
                            {{ event.title }}
                        </div>
                        <div class="col-auto">
                            <font-awesome-icon icon="clock" /> {{ (new Date(event.date_update)).toLocaleDateString() }}
                        </div>

                    </div>

                    <div class="row">
                        <div class="col-auto">
                            <div class="style-elem">Уровень:</div>
                        </div>
                        <div class="col-auto">{{ event.Level ? event.level.name : "-" }}</div>
                    </div>
                    <div class="row">
                        <div class="col-auto">
                            <div class="style-elem">Формат проведения:</div>
                        </div>
                        <div class="col-auto">{{ event.format ? event.format.name : "-" }}</div>
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
                        <div class="col-auto"> {{ (new Date(event.dateStart)).toLocaleDateString() }} -
                            {{ (new Date(event.dateEnd)).toLocaleDateString() }} </div>
                    </div>


                    <div class="row mt-4">
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
                    </div>

                    <div class="row">
                        <div class="col d-flex justify-content-end">
                            <button class="button btn-custom-accept" @click="changeStatus(event.id, true)">
                                принять
                            </button>
                        </div>
                        <div class="col-auto">
                            <button class="button" @click="changeStatus(event.id, false)">
                                отклонить
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <Pagination :max-page="maxPages" :visible-pages="visiblePages" :handleEventChangePage="handleEventChangePage" />
    </div>
</template>
  


<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import { useEventStore } from '@/store/events_store';
import { useEventStore as useSingleEvent } from '@/store/event_store';
import { DIRECTION } from '@/store/constants/constants_class_names';

import { onBeforeMount, ref } from 'vue';
import { useDictionaryStore } from '@/store/dictionary_store';


const eventsStore = useEventStore();
const singleEvent = useSingleEvent();
const dictionaryStore = useDictionaryStore();

const events = ref()
const directions = ref([{ id: 0, name: "Все" }])
const status = [
    { id: 0, name: "Принятные", value: 1 },
    { id: 1, name: "Отклоненные", value: 0 },
    { id: 2, name: "В рассмотрении", value: null }]

// загрузка
const loading = ref(false)

// dropdowns
const selectedDirection = ref(0)
const selectedStatus = ref(2)

//pagination ---------------------------------------------------------------------
const limit = 5 //сколько  отображается на странице
const offset = ref(0) //сколько  пропустить прежде чем отобразить

const maxPages = ref(1)
const visiblePages = 7
//pagination ---------------------------------------------------------------------

onBeforeMount(async () => {
    let direct = await dictionaryStore.getFromDictionaryByClassID(DIRECTION)
    directions.value = direct
    directions.value.unshift({ id: 0, name: "Все" })

    await fetchEvents()
})

async function fetchEvents() {

    loading.value = true

    const sDirection = selectedDirection.value > 0 ? selectedDirection.value : null
    let d = await eventsStore.fetchEvents(limit, offset.value, 4, status[selectedStatus.value].value, sDirection)
    events.value = d[0]

    const eventsCount = d[1]
    maxPages.value = eventsCount >= limit ? Math.ceil(eventsCount / limit) : 1
    loading.value = false

}

async function handleEventChangePage(currentPage: number) {
    offset.value = (currentPage - 1) * limit

    await fetchEvents()
}

async function changeStatus(id: number, status: boolean) {
    await singleEvent.updateEvent(id, status)
    await fetchEvents()
}

</script>
  



<style lang="scss" scoped>
.events-requests__wrapper {
    .block-content {
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        border-radius: 5px;
        padding: 1.5rem 2rem;
        margin: 10px auto 20px auto;
        background: white;


    }

    .border-left {
        border-left: 0.7rem solid gray;

        &__success {
            border-left-color: #95E09C;
        }

        &__danger {
            border-left-color: #FF8383;
        }
    }

    .card-event {
        &__name {
            color: #373737;
            font-size: 1.2rem;
        }

        .style-elem {
            color: var(--second-color);
        }

    }

}
</style>