import api from "../api/axios";

export async function getUserProfile(userId) {
  const response = await api.get(`/users/${userId}`);
  return response.data;
}

export async function toggleFollow(userId) {
  await api.post(`/users/${userId}/follow`);
}
export async function getMyProfile() {
  const response = await api.get("/users/me");
  return response.data;
}