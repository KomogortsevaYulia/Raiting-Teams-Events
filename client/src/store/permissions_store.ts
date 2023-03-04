import axios from "axios";
import { computed, ref } from "vue";
import type { Permission } from "@/types";
import { defineStore } from "pinia";
import router from "@/router";
import { useTeamStore } from '@/store/team_store';

export const usePermissionsStore = defineStore("permissionsStore", () => {
    const teamStore = useTeamStore();

    const username = ref("")
    const permissions = ref<Array<Permission>>([])
    const is_superuser = ref("")

    // Возвращает те пермишены которые есть в types?
    function can(permission: Permission) {
        console.log('now let see here');
        console.log(permissions.value.includes(permission));
        return permissions.value.includes(permission)
    }

    // 
    async function checkLogin() {
                            //рук. направления    рук. ИРНИТУ           тут три вида отчетов надо
        permissions.value = ['can create teams', 'can view directions', 'can view reports']

        let response = await axios.get("api/users/check-login").then(r => {
            // is_superuser.value = r.data.is_superuser
            if (r.data) {
                permissions.value = r.data.permissions
                username.value = r.data.username

                // Как это работает?
                // if (can('can create teams')) {
                //     teamStore.CreateTeamsTest
                // }
            } else {
                permissions.value = []
                username.value = ''
            }
        })
    }

    async function login({ username, password }: { username: string, password: string }) {
        permissions.value = ['can create teams', 'can view directions', 'can view reports']

        let response = await axios.post("/api/users/login", {
            "user": {
                username: username,
                password: password
            }
            // @ts-ignore
        }) .finally(() => checkLogin())
        
        // return response.data.succes; // Типа статус авторизован/нет?
        return true;
    }

    async function logout() {
        // @ts-ignore
        axios.post("/accounts/logout/").finally(() => checkLogin())
    }

    return {
        permissions,
        username,
        is_superuser,

        checkLogin,
        login,
        logout,
        can
    }
})