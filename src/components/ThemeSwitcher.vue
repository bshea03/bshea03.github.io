<script setup lang="ts">
import { Sun, Moon } from "lucide-vue-next";
import { useColorMode } from "@vueuse/core";
import { Button } from "@/components/ui/button";
import { computed } from "vue";

const mode = useColorMode();

const toggleTheme = () =>
  mode.value === "light" ? (mode.value = "dark") : (mode.value = "light");

const isDark = computed(() => mode.value === "dark");
</script>

<template>
  <div class="flex items-center gap-2">
    <Button
      name="Swap themes"
      variant="outline"
      class="h-full items-center"
      @click="toggleTheme"
    >
      <Sun v-if="isDark" class="size-6" />
      <Moon v-else class="size-6" />
    </Button>
  </div>
</template>

<style scoped>
.lucide {
  color: var(--muted-foreground);
  transition: color 150ms ease-in-out 0s;
}
button:hover {
  .lucide {
    color: var(--muted-foreground-hover);
    cursor: pointer;
  }
}
</style>
