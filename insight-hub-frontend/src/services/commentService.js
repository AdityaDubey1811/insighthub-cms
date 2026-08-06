import api from "../api/axios";

export async function getComments(postId) {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
}

export async function addComment(postId, commentData) {
  const response = await api.post(
    `/posts/${postId}/comments`,
    commentData
  );

  return response.data;
}