<script setup lang="ts">
import {
  House,
  LibraryBig,
  PencilRuler,
  User,
  Star,
  Contact,
  Briefcase,
  Award,
  PencilLine,
  FileBadge,
} from "lucide-vue-next";
import avatar from "/images/me.jpg";
import NavDropdown from "./NavDropdown.vue";

const homeSections = [
  { label: "About", id: "about", icon: User },
  { label: "Skills", id: "skills", icon: Star },
  { label: "Contact", id: "contact", icon: Contact },
];

const experienceSections = [
  { label: "Work", id: "work", icon: Briefcase },
  { label: "Awards", id: "awards", icon: Award },
  { label: "Portfolio", id: "portfolio", icon: PencilLine },
  { label: "Resume", id: "resume", icon: FileBadge },
];
</script>

<template>
  <nav
    class="fixed top-0 z-40 hidden w-full bg-white/5 shadow-lg backdrop-blur-md md:block dark:bg-black/30"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
      <!-- Branding -->
      <div class="flex items-center gap-3">
        <img
          :src="avatar"
          alt="avatar"
          class="size-10 rounded-full border border-white/20 shadow-md"
        />
        <span class="text-lg font-medium text-white/80">Brady Shea</span>
      </div>

      <!-- Nav Links -->
      <div class="flex items-center justify-center gap-6">
        <NavDropdown label="Home" :icon="House" to="/" :items="homeSections" />

        <NavDropdown
          label="Experience"
          :icon="LibraryBig"
          to="/experience"
          :items="experienceSections"
        />

        <NavDropdown
          label="Projects"
          :icon="PencilRuler"
          to="/projects"
          disabled
        />
      </div>

      <!-- Right actions -->
      <div class="flex items-center gap-4">
        <a
          href="https://github.com/bshea03"
          name="Github"
          target="_blank"
          class="text-gray-400 transition hover:text-white"
        >
          <i class="devicon-github-plain text-xl"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/brady-shea-699911152/"
          name="LinkedIn"
          target="_blank"
          class="text-gray-400 transition hover:text-white"
        >
          <i class="devicon-linkedin-plain text-xl"></i>
        </a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
