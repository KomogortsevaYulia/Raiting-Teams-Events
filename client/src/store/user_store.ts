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

  async function getInfoUser() {
    let response = await axios.get("api/users/check-login")
    if (response){return response}
    // return await axios.get('api/users/'+username, {
    // });
  }

  return {
    getUsersByNameEmail,
    getInfoUser
  }
});


