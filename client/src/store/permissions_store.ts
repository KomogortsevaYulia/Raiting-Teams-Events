import axios from "axios";
import { computed, ref } from "vue";
import type { Permission } from "@/types";
import { defineStore } from "pinia";

export const usePermissionsStore = defineStore("permissionsStore", () => {
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
            permissions.value = []
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
        await axios.post("/api/users/logout")
        permissions.value = []
        username.value = ''
        isLogged.value = false // ну так делать нельзя это дичь вроде бы
        await checkLogin()
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