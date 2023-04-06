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

    return {
        CreateTeamsTest,
        fetchEvents,
    

        layout,
    }

});