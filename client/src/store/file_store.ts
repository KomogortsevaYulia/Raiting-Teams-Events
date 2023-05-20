import axios from "axios";
import { defineStore } from "pinia";

export const useFileStore = defineStore("file", () => {

    // загрузить файл на сервер
    async function loadFile(formData: FormData) {

        const res = await axios.post('api/uploads', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        // console.log(res.data.path); // This will log the path to the uploaded file on the server
        return res.data
    }

    // получить изображения с сервера для отображения в имадже элементе
    async function getImageBase64(path: string) {

        let imageData = null

        const res = await axios.get('api/uploads/image_base64', { params: { path: path } })
            .then(response => {
                imageData = response.data
            })
            .catch(error => {
                console.error(error);
            });

        return imageData
    }


    return {
        loadFile,
        getImageBase64
    }
});