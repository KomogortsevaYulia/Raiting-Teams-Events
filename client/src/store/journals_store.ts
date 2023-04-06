import { defineStore } from 'pinia';
import axios from "axios";

export const useJournalStore = defineStore("journals", () => {
    
    async function fetchJournals(teamId:number = -1):Promise<any> {
        const res = await axios.get('api/events/journal', 
        {params:{team_id:teamId}})
        const data = res.data
    
        return data
      }
    
        return{
            fetchJournals
        }

    })