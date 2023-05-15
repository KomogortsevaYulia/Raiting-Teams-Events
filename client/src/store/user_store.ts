import {defineStore} from "pinia";
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

    async function Update(fullname: string, education_group: string, title_role: string, id: number) {
        await axios.patch("api/users/" + id, {
            params: {
                username: fullname,
                title_role: title_role,
                education_group: education_group,
            }
        })
    }

    async function getUsersFunction(id: number) {
        return await axios.get("api/users/" + id)
    }

    return {
        getUsersByNameEmail,
        Update,
        getUsersFunction,
    }

});


