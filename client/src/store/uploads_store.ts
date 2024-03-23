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

  // TODO not checked
  // upload image on server
  async function uploadImage(file: File){
    let responseMsg = "сохранено";

    // Read the image file as a buffer
    // const compressedImageData = await compressImage(file, 700, 300);

    // const formData = new FormData();
    // formData.append(
    //   "file",
    //   new Blob([compressedImageData], { type: "image/webp" }),
    //   "image.webp",
    // );

    const formData = new FormData();
    formData.append(
        "file",file);

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

  // TODO: maybe img compression is needed only on backend?
  // async function compressImage(file: File, width: number, height: number) {
  //   const buff = await file.arrayBuffer();
  //   return await sharp(buff)
  //     .resize({ width: width, height: height }) // Set the maximum width of the compressed image
  //     .webp({ quality: 80 }) // Set the webp quality to 80%
  //     .toBuffer();
  // }

  return {
    uploadFile,
    uploadImage,
  };
});
