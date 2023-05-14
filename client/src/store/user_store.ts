import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", () => {

  async function getUsersByNameEmail(limit: Number, fullname: String, email: String) {
    return await axios.get("api/users", {
      params: {
        limit: limit,
        fullname: fullname,
        email: email
      }
    });
  }
  async function reduction(fullname:string,education_group:string,title_role:string,id:number) {
    await axios.patch("api/users/"+id)
  }
  async function Update(fullname:string,education_group:string,title_role:string,id:number) {
    await axios.patch("api/users/"+id)
  }
   return {
    getUsersByNameEmail,
    Update,
    reduction,
  }
});


