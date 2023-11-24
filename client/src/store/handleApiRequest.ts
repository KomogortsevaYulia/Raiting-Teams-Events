import type { AxiosError, AxiosResponse } from "axios";
import {ref} from "vue";

export class ApiRequest{
     loading = ref(false);
     error = ref("");

    async handleApiRequest(apiCall: ()=>Promise<AxiosResponse>) {
        this.loading.value = true;
        this.error.value= ""
        try {
            const response = await apiCall();
            return response.data;
        } catch (err) {
            const axiosError = err as AxiosError;
            this.error.value = axiosError.message || "An error occurred";
        } finally {
            this.loading.value = false;
        }
    }
}
