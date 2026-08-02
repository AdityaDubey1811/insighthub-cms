import api from "../api/axios";

export async function uploadImage(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data.imageUrl;
}