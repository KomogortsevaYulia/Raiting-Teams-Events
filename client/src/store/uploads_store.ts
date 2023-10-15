import { defineStore } from "pinia";
import axios from "axios";

export const useUploadsStore = defineStore("uploads", () => {
  // uploadFile in server
  async function uploadFile(file: File) {
    let responseMsg = "";

    const formData = new FormData();

    if (file) {
      formData.append("file", file, `${file.name}`);
    } else {
      responseMsg = `вы забыли добавить файлы`;
      return responseMsg;
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    //create team
    await axios.post("/api/uploads", formData, config).catch((err) => {
      if (err.response) {
        responseMsg = err.response.data.message;
      }
    });

    return responseMsg;
  }

  // upload image on server
  async function uploadImage(formData: FormData) {
    let responseMsg = "сохранено";
    await axios
      .post(`/api/uploads/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((err) => {
        if (err.response) {
          responseMsg = err.response.data.message[0];
        }
      });
    return responseMsg;
  }

  return {
    uploadFile,
    uploadImage,
  };
});
