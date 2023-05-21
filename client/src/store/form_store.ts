import { defineStore } from "pinia";
import axios from "axios";

export const useFormStore = defineStore("form", ()=>{
    async function fetchFormFields(team_id: number): Promise<any> {
        const res = await axios.get('/api/forms/' + team_id )
        const data = res.data
        console.log(data)
        return data
    }
    return {
        fetchFormFields
      }
})