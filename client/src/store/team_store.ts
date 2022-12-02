import {defineStore} from "pinia";
import {computed, ref} from "vue";
// import type { Permission } from "@/types";
import axios from "axios";

export const useTeamStore = defineStore("teams", () => {

    function CreateTeamsTest() {
        console.log('Это сработало!');
        
    }

    async function fetchCreateTeams() {
        await axios.get('/api')
        .then((respose: any) => {
            // Умные действия
        })
    }

    return {
        CreateTeamsTest,
        fetchCreateTeams
    }
});
