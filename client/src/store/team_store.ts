import { defineStore } from "pinia";
import { computed, ref } from "vue";
// import type { Permission } from "@/types";
import axios from "axios";

export const useTeamStore = defineStore("teams", () => {

    function CreateTeamsTest() {
        console.log('Это сработало!');

    }

    //вывести все коллективвы с руководителями
    async function fetchTeams(): Promise<any> {

        const res = await axios.get('/api/teams')
        const data = res.data

        return data
    }

    //вывести все направления с руководителями
    async function fetchDirections(): Promise<any> {

        const res = await axios.get('/api/teams/directions')
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
        fetchTeams,
        fetchDirections
    }
});
