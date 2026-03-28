<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMessagesStore } from "@/stores/messages";

const store = useMessagesStore();

const { messages } = storeToRefs(store);
const { sendMessage } = store;

const message = ref<string>("");
const isError = ref<boolean>(false);

const validate = (newValue: string | number) => {
  if (isError.value && newValue) {
    isError.value = false;
  }
};

const submit = () => {
  if (!message.value) {
    isError.value = true;
    return;
  }
  sendMessage(message.value);
  message.value = "";
};
</script>

<template>
  <div class="flex flex-col items-center px-4 h-screen w-full bg-slate-950">
    <div
      class="flex flex-col-reverse h-[95svh] rounded-lg w-full mx-4 mb-4 mt-20 px-3 pt-2 pb-1 bg-slate-900 isolate overflow-y-auto"
    >
      <div
        class="flex flex-row items-center mb-2 bg-slate-800 rounded-md p-2"
        v-for="msg in messages"
        :key="String(msg.timestamp)"
      >
        <div class="flex flex-col pr-4 w-40 items-end">
          <span class="font-bold"> {{ msg.author }} </span>
          <span class="text-xs opacity-50">{{ msg.timestamp }}</span>
        </div>
        <div class="w-full">{{ msg.message }}</div>
      </div>
    </div>
    <div class="w-full flex flex-row pb-4 items-center justify-center gap-4">
      <Input
        @keyup.enter="submit"
        @update:model-value="validate"
        class="w-full"
        type="text"
        placeholder="Type a message..."
        v-model="message"
        :aria-invalid="isError"
      />
      <Button
        name="Send"
        type="Submit"
        variant="outline"
        class="w-32"
        @click="submit"
        >Send</Button
      >
    </div>
  </div>
</template>

<style scoped></style>
