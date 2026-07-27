import api from "../api/axios";

export async function getMyPostsAnalytics() {
  const response = await api.get("/analytics/my-posts");
  return response.data;
}

export async function getTopPosts() {
  const response = await api.get("/analytics/top-posts");
  return response.data;
}

export async function getPostAnalytics(postId) {
  const response = await api.get(`/analytics/posts/${postId}`);
  return response.data;
}