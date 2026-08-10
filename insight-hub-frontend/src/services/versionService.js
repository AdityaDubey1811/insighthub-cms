import api from "../api/axios";

export async function getPostVersions(postId) {
  const response = await api.get(`/posts/${postId}/versions`);
  return response.data;
}

export async function restoreVersion(versionId) {
  await api.post(`/versions/${versionId}/restore`);
}