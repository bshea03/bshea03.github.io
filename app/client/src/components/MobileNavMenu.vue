<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import avatar from "/images/me.jpg";
import {
  House,
  LibraryBig,
  PencilRuler,
  User,
  Star,
  Contact,
  Award,
  Briefcase,
  FileBadge,
} from "lucide-vue-next";

const isOpen = ref(false);

const links = [
  { label: "Home", to: "/", icon: House },
  { label: "Experience", to: "/experience", icon: LibraryBig },
  { label: "Projects", to: "/projects", icon: PencilRuler, disabled: true },
];

const homeSections = [
  { label: "About", id: "about", icon: User },
  { label: "Skills", id: "skills", icon: Star },
  { label: "Contact", id: "contact", icon: Contact },
];

const experienceSections = [
  { label: "Work", id: "work", icon: Briefcase },
  { label: "Awards", id: "awards", icon: Award },
  { label: "Portfolio", id: "portfolio", icon: PencilRuler },
  { label: "Resume", id: "resume", icon: FileBadge },
];

function toggleDrawer() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div class="fixed top-0 left-0 z-50 w-full md:hidden">
    <!-- Top bar with avatar + hamburger -->
    <div
      class="flex items-center justify-between bg-white/10 px-4 py-3 shadow-lg backdrop-blur-md dark:bg-black/30"
    >
      <div class="flex items-center gap-3">
        <img
          :src="avatar"
          alt="avatar"
          class="h-9 w-9 rounded-full border-2 border-purple-500 shadow-md"
        />
        <span class="font-medium text-white/80">Brady Shea</span>
      </div>
      <button
        class="rounded-md p-2 text-white transition hover:bg-white/20"
        @click="toggleDrawer"
      >
        <svg
          v-if="!isOpen"
          name="Toggle menu drawer"
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Slide-in drawer -->
    <transition name="slide">
      <div
        v-if="isOpen"
        class="fixed top-0 left-0 z-40 flex h-full w-3/4 max-w-xs flex-col bg-gradient-to-br from-indigo-900/95 to-purple-900/95 p-6 shadow-2xl"
      >
        <nav class="flex flex-col gap-6 text-white">
          <RouterLink
            v-for="link in links"
            :key="link.label"
            :to="link.to"
            class="flex items-center gap-3 rounded-md px-3 py-2 transition hover:bg-white/10"
            :class="link.disabled ? 'pointer-events-none opacity-50' : ''"
            @click="toggleDrawer"
          >
            <component :is="link.icon" class="h-6 w-6" />
            <span>{{ link.label }}</span>
          </RouterLink>

          <div>
            <h3 class="mb-2 text-sm text-gray-300">Home Sections</h3>
            <RouterLink
              v-for="s in homeSections"
              :key="s.id"
              :to="{ path: '/', hash: '#' + s.id }"
              class="flex items-center gap-3 rounded-md px-3 py-2 transition hover:bg-white/10"
              @click="toggleDrawer"
            >
              <component :is="s.icon" class="h-5 w-5" />
              <span>{{ s.label }}</span>
            </RouterLink>
          </div>

          <div>
            <h3 class="mb-2 text-sm text-gray-300">Experience Sections</h3>
            <RouterLink
              v-for="s in experienceSections"
              :key="s.id"
              :to="{ path: '/experience', hash: '#' + s.id }"
              class="flex items-center gap-3 rounded-md px-3 py-2 transition hover:bg-white/10"
              @click="toggleDrawer"
            >
              <component :is="s.icon" class="h-5 w-5" />
              <span>{{ s.label }}</span>
            </RouterLink>
          </div>
        </nav>
      </div>
    </transition>

    <!-- Backdrop -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-30 bg-black/50"
        @click="toggleDrawer"
      />
    </transition>
  </div>
</template>

<style scoped>
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-leave-from {
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(-100%);
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
