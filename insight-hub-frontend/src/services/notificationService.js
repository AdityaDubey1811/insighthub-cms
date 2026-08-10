import api from "../api/axios";

export async function getMyNotifications() {
  const response = await api.get("/notifications");
  return response.data;
}

export async function markNotificationAsRead(notificationId) {
  await api.put(`/notifications/${notificationId}/read`);
}