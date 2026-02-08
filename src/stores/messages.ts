import { ref } from "vue";
import { defineStore } from "pinia";
import { useWebSocket } from "@vueuse/core";

export type Message = {
  message: string;
  author: string;
  timestamp: string | Date;
};

export const WEBSOCKET_URL = "ws://localhost:8080/ws";

export const useMessagesStore = defineStore("messages", () => {
  const { status, data, send, open, close } = useWebSocket(WEBSOCKET_URL, {
    autoReconnect: {
      retries: 3,
      onFailed() {
        console.log("Failed to reconnect Websocket after 3 retries.");
      },
    },
    onConnected(ws) {
      console.log("WebSocket connected.");
    },
    onDisconnected(ws, event) {
      console.log("WebSocket disconnected", event.code);
      console.log("Retrying");
    },
    onError(ws, event) {
      console.log("WebSocket error:", event);
    },
    onMessage(ws, event) {
      const newMsg = JSON.parse(event.data) as Message;
      console.log(newMsg);
      messages.value = [newMsg].concat(messages.value);
    },
  });

  const messages = ref<Array<Message>>([]);

  function sendMessage(message: string): void {
    send(message);
  }

  return { status, messages, sendMessage };
});
