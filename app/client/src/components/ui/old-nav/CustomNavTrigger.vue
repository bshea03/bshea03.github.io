<script setup lang="ts">
import { cn } from "@/lib/utils";
import type { Component } from "vue";
import { ChevronDown } from "lucide-vue-next";

type Props = {
  label: string;
  icon?: Component;
  open: boolean;
  disabled?: boolean;
};
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "toggle"): void;
  (e: "click", event: MouseEvent): void;
  (e: "open"): void;
  (e: "close"): void;
  (e: "hover-enter"): void;
  (e: "hover-leave"): void;
}>();

function handleClick(e: MouseEvent) {
  if (props.disabled) return;
  emit("toggle");
  emit("click", e);
}

function handleMouseEnter() {
  if (props.disabled) return;
  emit("hover-enter");
  emit("open");
}

function handleMouseLeave() {
  if (props.disabled) return;
  emit("hover-leave");
}
</script>

<template>
  <button
    type="button"
    :name="props.label"
    :disabled="props.disabled"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    :class="
      cn(
        'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150',
        props.open && !props.disabled ? 'trigger-active' : 'nav-trigger',
        props.disabled
          ? 'pointer-events-none cursor-not-allowed opacity-50'
          : 'cursor-pointer'
      )
    "
  >
    <component v-if="icon" :is="icon" class="lucide" />
    <span>{{ label }}</span>
    <ChevronDown
      v-if="!props.disabled"
      class="ml-1 size-4 transition-transform duration-200"
      :class="{ 'rotate-180': props.open }"
    />
  </button>
</template>
