import api from "../api/axios";

export async function toggleLike(postId) {
  await api.post(`/posts/${postId}/likes`);
}

export async function getLikeCount(postId) {
  const response = await api.get(`/posts/${postId}/likes`);
  return response.data;
}