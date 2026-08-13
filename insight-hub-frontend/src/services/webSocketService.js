import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { getAccessToken } from "../utils/tokenStorage";

let stompClient = null;

export function connectNotifications(onNotification) {
  const token = getAccessToken();

  stompClient = new Client({
    webSocketFactory: () =>
      new SockJS("http://localhost:8080/ws"),

    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },

    reconnectDelay: 5000,

    onConnect: () => {
      stompClient.subscribe(
        "/user/queue/notifications",
        (message) => {
          const notification = JSON.parse(message.body);
          onNotification(notification);
        }
      );
    },

    onStompError: (frame) => {
      console.error("WebSocket error:", frame);
    },
  });

  stompClient.activate();
}

export function disconnectNotifications() {
  if (stompClient) {
    stompClient.deactivate();
    stompClient = null;
  }
}