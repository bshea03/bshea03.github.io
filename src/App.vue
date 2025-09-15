<script setup lang="ts">
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

    <div class="h-full">
      <div
        class="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-purple-900/20"
      ></div>
      <RouterView v-slot="{ Component }">
        <div :key="$route.path">
          <component :is="Component" />
        </div>
      </RouterView>
    </div>
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
