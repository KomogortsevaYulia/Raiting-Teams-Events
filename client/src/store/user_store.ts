
import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", () => {

    async function getUsersByNameEmail(limit:Number, fullname:String, email:String) {

        return await axios.get("api/users", {
          params: {
            limit: limit,
            fullname: fullname,
            email: email
          }
        });
    }

    return {
        getUsersByNameEmail
    }
});


  