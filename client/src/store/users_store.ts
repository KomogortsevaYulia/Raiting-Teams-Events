import { defineStore } from "pinia";

import axios from "axios";

export const useUsersStore = defineStore("users", () => {

    async function fetchUsersLimited(
        limitVisibleUsers?: number,
        fullname?: string,
        email?: string
    ): Promise<any> {

        let data = await axios.get("api/users", {
            params: {
                limit: limitVisibleUsers,
                fullname: fullname,
                email: email
            }
        });
        
        return data
    }


    //как отображаются пользователи для выпадающих списков
    async function getUsersForOptions(data:any) {

        //получить всех найденных юзеров
        let users = data
    
        let arrayData = []
        for (let i = 0; i < (users).length; i++) {
            let user = (users)[i]
    
            arrayData[i] = { name: user.fullname, email: user.email, id: user.id, data: `${user.fullname} ${user.email}` };
        }

       return arrayData
    
    }

    // async function fetchUsers(): Promise<any> {
    //     let data = await axios.get("api/users");
    //     return data
    // }


    return {
        fetchUsersLimited,
        getUsersForOptions
    }
});
