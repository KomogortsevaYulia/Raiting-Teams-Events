import { defineStore } from "pinia";
import axios from "axios";

export const useFormStore = defineStore("form", ()=>{
    async function fetchFormFields(team_id: number): Promise<any> {
        const res = await axios.get('/api/forms/' + team_id )
        const data = res.data
        console.log(data)
        return data
    }

    async function fetchFormId(team_id: number): Promise<any> {
        const res: number = (await axios.get('/api/forms/id/' + team_id )).data
        
        return res

        console.log(res)
    }

    // async function createForm(field_id: string, team_id: number) {
        
    //     const formData = new FormData();
    //     formData.append('field_id', field_id);
    //     formData.append('team_id', team_id.toString());

    //     let responseMsg = "сохранено"

    //     const config = {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         }
    //     }

    //     //create team
    //     await axios.post("api/form", formData, config)
    //         .catch((err) => {
    //             if (err.response) {
    //                 responseMsg =err.response.data.message

    //             }
    //         })

    //     return responseMsg
    // }
    return {
        fetchFormFields,
        fetchFormId
      }
})