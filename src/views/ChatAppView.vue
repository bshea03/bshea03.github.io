<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WebSocketConnection } from "@/lib/websocket";

const ws = WebSocketConnection.getInstance();
ws.connect();

const message = ref("");

const submit = () => {
  ws.sendMessage(message.value);
  console.log(message.value);
  message.value = "";
};
</script>

<template>
  <div class="flex flex-col items-center px-4 h-screen w-full bg-slate-950">
    <div
      class="h-[95svh] rounded-lg w-full mx-4 mb-4 mt-20 bg-slate-900 isolate overflow-y-auto"
    ></div>
    <div class="w-full flex flex-row pb-4 items-center justify-center gap-4">
      <Input
        @keyup.enter="submit"
        class="w-full ml-4 mr-2"
        type="text"
        placeholder="Type a message..."
        v-model="message"
      />
      <Button
        name="Send"
        type="Submit"
        variant="outline"
        class="w-32 ml-2 mr-4"
        @click="submit"
        >Send</Button
      >
    </div>
  </div>
</template>

<style scoped></style>
