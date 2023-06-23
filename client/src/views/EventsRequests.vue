<template>
    <div class="events-requests__wrapper">
        <div v-for="event in events">
            <div :class="[`${event.satus ? 'border-left__success' : (event.satus != null ? 'border-left__danger' : '')}`
                , 'block-content card-event border-left']">
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
                        <font-awesome-icon v-if="event.status" icon="check-circle" class="text-success" />
                        <font-awesome-icon v-else-if="event.status != null" icon="circle-xmark" class="text-danger" />
                        <font-awesome-icon v-else icon="clock" />
                        {{ event.status ?? "в ожидании" }}
                    </div>
                </div>

                <div class="row">
                    <div class="col d-flex justify-content-end">
                        <button class="button btn-custom-accept" @click="changeStatus(true)">
                            принять
                       </button>
                    </div>
                    <div class="col-auto">
                        <button class="button" @click="changeStatus(false)">
                            отклонить
                        </button>
                    </div>
                </div>

            </div>
            <!-- {{ event }} -->
        </div>
    </div>
</template>
  
<script setup lang="ts">
import { useEventStore } from '@/store/events_store';
import { onBeforeMount, ref } from 'vue';
const eventStore = useEventStore();

const events = ref()

onBeforeMount(async () => {
    let startDate = new Date()
    startDate.setFullYear(1970)

    await eventStore.getEventsByDirection(8, startDate, new Date())
        .then((respose: any) => {
            events.value = respose[0]
        }).catch(() => {

        })
})

function changeStatus(status:boolean){

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