import { defineStore } from "pinia";
import axios from "axios";

export const useUserFunctionsStore = defineStore("user_function", () => {


    async function removeUserFunction(id: number) {

       let res =  await axios.delete("/api/users/user-functions/" + id)

       return res.data
    }

    async function findUserFunctions(team_id:number, user_id: number) {

        let res =  await axios.get("/api/users/user-functions/",{params:{
            user:user_id,
            team:team_id
        }})
 
        return res.data
     }

    
     async function assignNewParticipant(team_id:number, user_id: number) {

        let res =  await axios.post("/api/users/user-functions/new-participant",{
            user:user_id,
            team:team_id
        })
 
        return res.data
     }
    return {
        removeUserFunction,
        findUserFunctions,
        assignNewParticipant
    }
});


