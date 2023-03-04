import {defineStore} from "pinia";
import {computed, ref} from "vue";
// import type { Permission } from "@/types";
import axios from "axios";

export const useTeamStore = defineStore("teams", () => {

    function CreateTeamsTest() {
        console.log('Это сработало!');
        
    }

    // Вывести все коллективвы с руководителсями
   async function fetchTeams():Promise<any> {
        const res = await axios.get('/api/teams')
        const data = res.data

        return data
    }

    async function fetchCreateTeams() {
        await axios.get('/api')
        .then((respose: any) => {
            // Умные действия
        })
    }

    return {
        CreateTeamsTest,
        fetchCreateTeams,
        fetchTeams
    }
});
