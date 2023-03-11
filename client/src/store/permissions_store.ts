import axios from "axios";
import { computed, ref } from "vue";
import type { Permission } from "@/types";
import { defineStore } from "pinia";

export const usePermissionsStore = defineStore("permissionsStore", () => {
    const username = ref("")
    const fullname = ref("")
    const permissions = ref<Array<Permission>>([])
    const isLogged = ref(false)

    function can(permission: Permission) {
        return permissions.value.includes(permission)
    }

    async function checkLogin() {
        let response = await axios.get("api/users/check-login")
        if (isLogged) {
            isLogged.value = true;
            console.log('opapappa');
            permissions.value = response.data.permissions
            username.value = response.data.username
            fullname.value = response.data.fullname

        } else {
            console.log('zadwzad');
            // isLogged = false;
            permissions.value = []
            username.value = ''
            fullname.value = ''
        }
    }

    async function login({ username, password }: { username: string, password: string }) {
        let response = await axios.post("/api/users/login", {
            "user": {
                username: username,
                password: password
            }
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
        fullname.value = ''
        isLogged.value = false
        await checkLogin()
    }

    return {
        permissions,
        username,
        fullname,
        isLogged,

        checkLogin,
        login,
        logout,
        can
    }
})