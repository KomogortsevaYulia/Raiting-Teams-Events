import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", () => {

  async function getUsersByNameEmail(limit: Number, fullname: String, email: String) {
    return await axios.get("/api/users", {
      params: {
        limit: limit,
        fullname: fullname,
        email: email
      }
    });
  }
  
  async function update(education_group:string,title_role:string,id:number) {
    await axios.patch("/api/users/"+id, {
      education_group,
      title_role,
    })
  }

  async function getUsersFunction(id: number) {
    return await axios.get("/api/users/functions/" + id)
}

   return {
    getUsersByNameEmail,
    update,
    getUsersFunction
  }
});


