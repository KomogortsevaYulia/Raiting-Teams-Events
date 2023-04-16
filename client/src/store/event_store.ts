import { defineStore } from "pinia";
import { computed, ref } from "vue";
// import type { Permission } from "@/types";
import axios from "axios";

export const useEventStore = defineStore("events", () => {
    const layout = ref(true)

    function CreateTeamsTest() {
        console.log('Это сработало!');
    }

    // Вывести все коллективвы с руководителсями
   async function fetchEvents():Promise<any> {
        const res = await axios.get('/api/events')
        const data = res.data

        return data
    }

    async function createEvent(title: String, description: String,
        dateStart: Date, dateEnd: Date) {

        let responseMsg = "сохранено"

        //create team
        await axios.post("api/events", {
            title: title,
            description: description,
            dateStart: dateStart,
            dateEnd: dateEnd
        })
            .catch((err) => {
                if (err.response) {
                    responseMsg = err.response.data.message[0]
                }
            })

        return responseMsg
    }



    return {
        CreateTeamsTest,
        fetchEvents,
        createEvent,

        layout,
    }

});