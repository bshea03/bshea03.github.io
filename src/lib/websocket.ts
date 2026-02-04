export const WEBSOCKET_URL = "ws://localhost:8080/ws";

export class WebSocketConnection {
  private static instance: WebSocketConnection | null = null;
  private ws: WebSocket | null = null;

  private constructor() {}

  static getInstance(): WebSocketConnection {
    if (!WebSocketConnection.instance) {
      WebSocketConnection.instance = new WebSocketConnection();
    }
    return WebSocketConnection.instance;
  }

  connect(url: string = WEBSOCKET_URL): void {
    if (this.ws) {
      console.log("Already connected");
      return;
    }

    this.ws = new WebSocket(url);
    this.ws.onopen = () => console.log("Connected to WebSocket");
    this.ws.onmessage = () => console.log("Message Received");
    this.ws.onclose = () => console.log("WebSocket connection closed");
    this.ws.onerror = (e) => console.log("Websocket error:", e);
  }

  sendMessage(message: string): void {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      console.error("WebSocket not connected");
      return;
    }
    this.ws.send(message);
  }

  disconnect(): void {
    this.ws?.close();
    this.ws = null;
  }
}
