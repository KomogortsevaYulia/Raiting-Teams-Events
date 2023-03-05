import axios from "axios";
import { computed, ref } from "vue";
import type { Permission } from "@/types";
import { defineStore } from "pinia";
import { useTeamStore } from '@/store/team_store';

export const usePermissionsStore = defineStore("permissionsStore", () => {
    const teamStore = useTeamStore();

    const username = ref("")
    const permissions = ref<Array<Permission>>([])
    const isLogged = ref(false);

    function can(permission: Permission) {
        return permissions.value.includes(permission)
    }

    async function checkLogin() {
        let response = await axios.get("api/users/check-login")

        if (isLogged) {
            permissions.value = response.data.permissions
            username.value = response.data.username
            isLogged.value = true;

        } else {
            permissions.value = [response.data.permissions]
            username.value = ''
        }
    }

    async function login({ username, password }: { username: string, password: string }) {
        let response = await axios.post("/api/users/login", {
            "user": {
                username: username,
                password: password
            }
            // @ts-ignore
        })

        if (response) {
            isLogged.value = true;
        } else isLogged.value = false;

        await checkLogin();

        return isLogged;
    }

    async function logout() {
        // @ts-ignore
        axios.post("/api/logout") //finally(() => checkLogin())
        // isLogged.value = false ну так делать нельзя это дичь вроде бы
    }

    return {
        permissions,
        username,
        isLogged,

        checkLogin,
        login,
        logout,
        can
    }
})