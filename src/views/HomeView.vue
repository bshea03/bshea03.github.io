<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";
import { useSeoMeta } from "@unhead/vue";
import HeroSection from "@/components/home-page/HeroSection.vue";
import AboutSection from "@/components/home-page/AboutSection.vue";
import SkillsSection from "@/components/home-page/SkillsSection.vue";
import ContactSection from "@/components/home-page/ContactSection.vue";

useSeoMeta({
  title: "Brady Shea – Senior Software Engineer",
  description:
    "Brady Shea – Senior Software Engineer blending full-stack development, cloud infrastructure, and authentic technical leadership.",
});

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};
</script>

<template>
  <meta
    name="description"
    content="Brady Shea – Senior Software Engineer blending full-stack development, cloud infrastructure, and authentic technical leadership."
  />
  <div
    class="relative overflow-hidden bg-gradient-to-br from-blue-950 via-black to-blue-950"
  >
    <!-- Soft animated glow -->
    <div
      class="pointer-events-none absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"
    ></div>

    <HeroSection />

    <!-- Scroll indicator -->
    <div
      class="pointer-events-auto absolute bottom-10 left-1/2 z-20 -translate-x-1/2"
    >
      <button
        @click="scrollTo('about')"
        name="Go to about section"
        class="group flex flex-col items-center text-blue-400 outline-none hover:text-blue-300"
        aria-label="Scroll to next section"
      >
        <div
          class="animate-bounce rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 p-[1px]"
        >
          <div
            class="rounded-full bg-slate-900/90 p-1 transition duration-300 group-hover:bg-slate-900"
          >
            <ChevronDown class="h-8 w-8" />
          </div>
        </div>
        <span
          class="mt-1 text-xs opacity-80 transition duration-300 group-hover:opacity-100"
          >Scroll</span
        >
      </button>
    </div>
  </div>

  <AboutSection />
  <SkillsSection />
  <ContactSection />
</template>

<style>
@keyframes gradient {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes grow {
  to {
    transform: scaleX(1);
  }
}
.animate-grow {
  animation: grow 0.8s ease-out;
}
</style>
