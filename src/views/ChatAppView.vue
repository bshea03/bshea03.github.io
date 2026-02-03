<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const handleClick = () => {
  console.log("Send button clicked");
};
</script>

<template>
  <div class="flex flex-col h-screen w-full">
    <div class="size-[95svh]"></div>
    <div class="w-full flex flex-row pb-4 items-center justify-center gap-4">
      <Input
        class="w-full ml-4 mr-2"
        type="text"
        placeholder="Type a message..."
      />
      <Button
        name="Send"
        type="Submit"
        variant="outline"
        class="w-32 ml-2 mr-4"
        @click="handleClick"
        >Send</Button
      >
    </div>
  </div>
</template>

<style scoped></style>
