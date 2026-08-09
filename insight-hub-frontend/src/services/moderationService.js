import api from "../api/axios";

export async function getPendingPosts() {
  const response = await api.get("/admin/moderation/pending");
  return response.data;
}

export async function moderatePost(postId, status) {
  const response = await api.put(`/admin/moderation/${postId}`, {
    status,
  });

  return response.data;
}