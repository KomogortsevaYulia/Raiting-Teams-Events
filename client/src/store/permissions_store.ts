import axios from "axios";
import {computed, ref} from "vue";
import type { Permission } from "@/types";
import {defineStore} from "pinia";
import router from "@/router";
import { useTeamStore } from '@/store/team_store';

export const useUserPermissionsStore = defineStore("userPermissionsStore", () => {
    const teamStore = useTeamStore();

    const username = ref("")
    const permissions = ref<Array<Permission>>([])
    const is_superuser = ref("")

    function can(permission: Permission){
        return permissions.value.includes(permission)
    }

    async function checkLogin(onAuthenticated: Function) {
        
        await axios.get("http://localhost:3000/accounts/check-login/").then(r => {
            axios.defaults.headers.common['X-CSRFToken'] = r.data.csrf;
            is_superuser.value = r.data.is_superuser
            if (r.data.authenticated) {
                let nextUrl = "dashboard";
                if (typeof router.options.history.state.current == 'string' && router.options.history.state.current != '/' && router.options.history.state.current != '/#/') {
                    nextUrl = router.options.history.state.current
                }
                router.push(nextUrl).catch(ex => {
                    if (ex.name !== "NavigationDuplicated")
                        throw ex
                })
                permissions.value = r.data.permissions
                username.value = r.data.username

                if (can('can create teams'))
                teamStore.CreateTeamsTest

                if (onAuthenticated) {
                    onAuthenticated()
                    console.log('sadasd');
                    
                }
            } else {
                router.push("/opa").catch(ex => {
                    if (ex.name !== "NavigationDuplicated")
                        throw ex
                })
            }
        })
    }

    async function login({username, password}: { username: string, password: string }) {
        console.log('Login in permission');
        console.log(username);
        console.log(password);
        
        // axios.post("/accounts/login/", {
        //     username: username,
        //     password: password,
        // // @ts-ignore
        // }).finally(() => checkLogin(onAuthenticated))
    }

    async function logout() {
        // @ts-ignore
        axios.post("/accounts/logout/").finally(() => checkLogin(null))
    }

    return {
        // permissions,
        // username,
        // is_superuser,

        checkLogin, 
        login,
        logout,
        can
    }
})