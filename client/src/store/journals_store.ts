import { defineStore } from 'pinia';
import axios from "axios";

export const useJournalStore = defineStore("journals", () => {
    
      // data will be returned as index 0 - is data, index 1 is count
    async function fetchJournals(teamId:number = -1):Promise<any> {
        const res = await axios.get('/api/events/journal',
        {params:{team_id:teamId}})
        const data = res.data
    
        return data
      }
    async function fetchJournalsByUserId(id:number){
        const res = await axios.get('/api/events/journal/user/'+ id )
        const data = res.data
        return data
    }

        return{
            fetchJournals,
            fetchJournalsByUserId
        }

    })