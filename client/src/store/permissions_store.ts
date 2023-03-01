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
    // const permissions = ref("")
    const is_superuser = ref("")

    // Не знаю что это штука делает
    function can(permission: Permission) {
        console.log('now let see here');
        console.log(permissions.value.includes(permission));
        return permissions.value.includes(permission)
    }

    // Функция ...
    async function checkLogin() {
        // permissions.value = ['can create events']
        await axios.get("api/check-login").then(r => {
            axios.defaults.headers.common['X-CSRFToken'] = r.data.csrf;
            is_superuser.value = r.data.is_superuser
            // permissions.value = 'can create teams'
            if (r.data.authenticated) {
                // permissions.value = r.data.permissions
                // permissions.value = ['can create teams']
                username.value = r.data.username

                // Закоментировал пока чтобы, ну чтобы :)
                // if (can('can create teams')) {
                //     teamStore.CreateTeamsTest
                // }
            }
        })
    }

    async function login({ username, password }: { username: string, password: string }) {
        console.log('Login in permission');
        console.log(username);
        console.log(password);
        permissions.value = ['can create teams', 'can change directions']

        axios.post("/api/users/login", {
            "user": {
                email: username,
                password: password
            }
            // @ts-ignore
        }).finally(() => checkLogin(onAuthenticated))
    }

    async function logout() {
        // @ts-ignore
        axios.post("/accounts/logout/").finally(() => checkLogin(null))
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