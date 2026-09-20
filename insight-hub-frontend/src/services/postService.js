import api from "../api/axios";

export async function getAllPosts() {
  const response = await api.get("/posts");
  return response.data;
}

export async function getPostBySlug(slug) {
  const response = await api.get(`/posts/${slug}`);
  return response.data;
}

export async function createPost(postData) {
  const response = await api.post("/posts", postData);
  return response.data;
}

export async function updatePost(postId, postData) {
  const response = await api.put(`/posts/${postId}`, postData);
  return response.data;
}

export async function deletePost(postId) {
  await api.delete(`/posts/${postId}`);
}
export async function submitForModeration(postId) {
  const response = await api.post(`/posts/${postId}/submit`);
  return response.data;
}