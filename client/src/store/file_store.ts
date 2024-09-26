import axios from "axios";
import { defineStore } from "pinia";

export const useFileStore = defineStore("file", () => {
  async function loadFile(formData: FormData) {
    const res = await axios.post("api/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // console.log(res.data.path); // This will log the path to the uploaded file on the server
    return res.data;
  }

  async function getImageBase64(path: string) {
    let imageData = null;

    await axios
      .get("api/uploads/image_base64", { params: { path: path } })
      .then((response) => {
        imageData = response.data;
        // const imageUrl = URL.createObjectURL(response.data);
        // imageData = imageUrl
        // console.log(imageUrl)
      })
      .catch((error) => {
        console.error(error);
      });

    // console.log(res.data.path); // This will log the path to the uploaded file on the server
    return imageData;
  }

  return {
    loadFile,
    getImageBase64,
  };
});
