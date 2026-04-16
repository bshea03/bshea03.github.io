<script setup lang="ts">
import "vue-sonner/style.css";
import { Toaster } from "@/components/ui/sonner";
import DesktopNavMenu from "./components/DesktopNavMenu.vue";
import MobileNavMenu from "./components/MobileNavMenu.vue";
</script>

<template>
  <div id="app">
    <!-- Desktop -->
    <div class="z-20 hidden md:block">
      <DesktopNavMenu />
    </div>

    <!-- Mobile -->
    <div class="z-20 block md:hidden">
      <MobileNavMenu />
    </div>

    <div class="min-h-full">
      <div
        class="pointer-events-none fixed inset-0 bg-linear-to-br from-indigo-900/20 via-transparent to-purple-900/20"
      ></div>
      <RouterView v-slot="{ Component }">
        <div :key="$route.path">
          <component :is="Component" />
        </div>
      </RouterView>
    </div>
    <Toaster />
  </div>
</template>

<!-- <style>
/* Transition classes for fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style> -->
