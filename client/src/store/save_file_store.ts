import axios from "axios";
import { defineStore } from "pinia";

export const useFileStore = defineStore("file", () => {

    async function loadFile(formData: FormData) {

        const res = await axios.post('api/uploads', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // console.log(res.data.path); // This will log the path to the uploaded file on the server
        return res.data
    }


    return {
        loadFile,
    }
});