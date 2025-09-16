<script setup lang="ts">
import { useRoute } from "vue-router";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import CustomNavTrigger from "./CustomNavTrigger.vue";
import DropdownContent from "./DropdownContent.vue";
import GlowingIconButton from "../../GlowingIconButton.vue";

import avatar from "/images/me.jpg";
import {
  Award,
  Briefcase,
  Contact,
  FileBadge,
  House,
  LibraryBig,
  PencilLine,
  PencilRuler,
  Star,
  User,
} from "lucide-vue-next";
import { useDelayedDropdown } from "@/composables/useDelayedDropdown";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";

const route = useRoute();

const { open, openMenu, closeMenu } = useDelayedDropdown<
  "home" | "experience" | "projects"
>();

// Sections for Home page
const homeSections = [
  { label: "About", id: "about", icon: User, description: "About me" },
  {
    label: "Skills",
    id: "skills",
    icon: Star,
    description: "A list of my professional skills",
  },
  {
    label: "Contact",
    id: "contact",
    icon: Contact,
    description: "Links to my GitHub, LinkedIn, and email",
  },
];

const experienceSections = [
  {
    label: "Work",
    id: "work",
    icon: Briefcase,
    description: "A complete list of of my relevant job history",
  },
  {
    label: "Awards",
    id: "awards",
    icon: Award,
    description: "A list of rewards I have received at work",
  },
  {
    label: "Portfolio",
    id: "portfolio",
    icon: PencilLine,
    description: "A list of large projects I have worked on",
  },
  {
    label: "Resume",
    id: "resume",
    icon: FileBadge,
    description: "A downloadable copy of my professional resume",
  },
];

const activeSection = ref<string | null>(null);
const observers: IntersectionObserver[] = [];

function setupObservers(sections: { id: string }[]) {
  // Cleanup old observers
  observers.forEach((obs) => obs.disconnect());
  observers.length = 0;

  if (!sections.length) return;

  // ✅ Handle hero separately
  const heroEl = document.getElementById("hero");
  if (heroEl) {
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = null; // Clear active section if hero is visible
          }
        });
      },
      { root: null, threshold: 0.1 }
    ); // adjust threshold if needed
    heroObserver.observe(heroEl);
    observers.push(heroObserver);
  }

  // Main observer (for all sections)
  const options: IntersectionObserverInit = {
    root: null,
    rootMargin: "-100px 0px -60% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;

      if (entry.isIntersecting) {
        activeSection.value = id;
      }
    });
  }, options);

  sections.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  observers.push(observer);

  // ✅ Bottom-of-page fallback
  const bottomObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = sections[sections.length - 1].id;
        }
      });
    },
    { root: null, threshold: 1.0 }
  );

  const lastEl = document.getElementById(sections[sections.length - 1].id);
  if (lastEl) bottomObserver.observe(lastEl);
  observers.push(bottomObserver);
}

onMounted(() => {
  const init = async () => {
    await nextTick();
    if (route.path === "/") setupObservers(homeSections);
    if (route.path === "/experience") setupObservers(experienceSections);
  };

  init();

  watch(
    () => route.path,
    async () => {
      await nextTick();
      if (route.path === "/") setupObservers(homeSections);
      if (route.path === "/experience") setupObservers(experienceSections);
    },
    { immediate: true }
  );
});

onUnmounted(() => {
  observers.forEach((obs) => obs.disconnect());
  observers.length = 0;
});
</script>

<template>
  <div id="custom-navmenu" class="fixed top-0 z-50 w-full p-2">
    <div
      class="nav-container mx-auto flex w-[95%] flex-row justify-evenly rounded-full bg-white/10 px-6 py-2 shadow-[0_0_25px_rgba(139,92,246,0.3)] backdrop-blur-md dark:bg-black/30"
    >
      <!-- Avatar / Branding -->
      <div class="nav-section gap-2">
        <div class="flex items-center gap-3">
          <Avatar
            class="size-9 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px] shadow-[0_0_6px_rgba(139,92,246,0.6)] transition-all duration-300 ease-in-out hover:shadow-[0_0_10px_rgba(139,92,246,0.8)]"
          >
            <AvatarImage :src="avatar" class="rounded-full" />
            <AvatarFallback class="bg-muted rounded-full">BS</AvatarFallback>
          </Avatar>
          <div
            class="text-base font-medium text-white/70 transition-all duration-300 ease-in-out hover:text-white hover:drop-shadow-[0_0_6px_rgba(139,92,246,0.6)]"
          >
            Brady Shea
          </div>
        </div>
      </div>

      <!-- Main Nav -->
      <div class="nav-section gap-2">
        <!-- Home -->
        <router-link :to="{ path: '/' }" custom v-slot="{ navigate, isActive }">
          <CustomNavTrigger
            label="Home"
            :icon="House"
            :open="open === 'home'"
            @hover-enter="openMenu('home')"
            @hover-leave="closeMenu()"
            :class="isActive ? 'trigger-active' : 'nav-trigger'"
            @click="
              () => {
                closeMenu();
                navigate();
              }
            "
          />
        </router-link>

        <!-- Experience Trigger -->
        <router-link
          :to="{ path: '/experience' }"
          custom
          v-slot="{ navigate, isActive }"
        >
          <CustomNavTrigger
            label="Experience"
            :icon="LibraryBig"
            :open="open === 'experience'"
            @hover-enter="openMenu('experience')"
            @hover-leave="closeMenu()"
            :class="isActive ? 'trigger-active' : 'nav-trigger'"
            @click="
              () => {
                closeMenu();
                navigate();
              }
            "
          />
        </router-link>

        <!-- Projects Trigger -->
        <router-link
          :to="{ path: '/projects' }"
          custom
          v-slot="{ navigate, isActive }"
        >
          <CustomNavTrigger
            label="Projects"
            :icon="PencilRuler"
            :open="open === 'projects'"
            @hover-enter="openMenu('projects')"
            @hover-leave="closeMenu()"
            @click="navigate"
            disabled
            :class="[
              isActive ? 'trigger-active' : 'nav-trigger',
              'pointer-events-none opacity-50', // visually disabled + non-clickable
            ]"
            aria-disabled="true"
          />
        </router-link>

        <!-- HOME dropdown -->
        <DropdownContent
          :open="open === 'home'"
          @mouseenter="openMenu('home')"
          @mouseleave="closeMenu()"
          class="left-0"
        >
          <div class="flex flex-col gap-2">
            <router-link
              v-for="section in homeSections"
              :key="section.id"
              :to="{ path: '/', hash: '#' + section.id }"
              class="rounded-md py-2 text-left transition hover:bg-[rgba(139,92,246,0.25)] hover:text-white"
              :class="activeSection === section.id ? 'nav-active' : 'nav-link'"
              @click="closeMenu()"
            >
              <div class="flex items-center justify-start gap-4 text-white">
                <div class="flex w-[50px] justify-center">
                  <component
                    :is="section.icon"
                    class="text-white"
                    v-bind="{ size: 36 }"
                  />
                </div>
                <div class="flex flex-col gap-1">
                  <div class="font-semibold text-white">
                    {{ section.label }}
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </DropdownContent>

        <!-- EXPERIENCE dropdown -->
        <DropdownContent
          :open="open === 'experience'"
          @mouseenter="openMenu('experience')"
          @mouseleave="closeMenu()"
          class="right-[10%] left-[10%]"
        >
          <div class="flex flex-col gap-2">
            <router-link
              v-for="section in experienceSections"
              :key="section.id"
              :to="{ path: '/experience', hash: '#' + section.id }"
              class="rounded-md text-left transition hover:bg-[rgba(139,92,246,0.25)] hover:text-white"
              :class="activeSection === section.id ? 'nav-active' : 'nav-link'"
              @click="closeMenu()"
            >
              <div
                class="flex w-full items-center justify-around p-1 text-white"
              >
                <div class="flex w-1/5 items-center justify-center">
                  <component
                    :is="section.icon"
                    class="text-white"
                    v-bind="{ size: 36 }"
                  />
                </div>
                <div class="flex w-4/5 flex-col gap-1">
                  <div class="font-semibold text-white">
                    {{ section.label }}
                  </div>
                  <div class="text-sm text-gray-300">
                    {{ section.description }}
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </DropdownContent>

        <!-- PROJECTS dropdown -->
        <DropdownContent
          :open="open === 'projects'"
          @mouseenter="openMenu('projects')"
          @mouseleave="closeMenu()"
        >
          <div class="flex w-full flex-col items-center justify-center gap-2">
            <div>Under construction!</div>
          </div>
        </DropdownContent>
      </div>

      <!-- Right-side Actions -->
      <div class="nav-section gap-2">
        <GlowingIconButton
          icon="devicon-github-plain"
          href="https://github.com/bshea03"
          external
        />
        <GlowingIconButton
          icon="devicon-linkedin-plain"
          href="https://www.linkedin.com/in/brady-shea-699911152/"
          external
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
/* ======================
   NAV CONTAINER STYLES
====================== */
.nav-container {
  background: rgba(17, 17, 17, 0.4);
  border-radius: 9999px;
  position: relative;
  /* remove overflow hidden so dropdowns aren't clipped */
  overflow: visible;

  /* gradient border via pseudo-element */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    padding: 2px; /* border thickness */
    border-radius: inherit;
    background: linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899);

    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;

    z-index: 0;
    pointer-events: none; /* <-- allows clicks to pass through */
  }

  > * {
    position: relative;
    z-index: 1; /* content above border */
  }
}

.nav-section {
  display: flex;
  flex-direction: row;
  align-items: center;
}

// actual navigation buttons
.nav-link {
  color: var(--muted-foreground);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  transition: all 150ms ease 0s;

  .lucide {
    color: white;
    opacity: 60%;
  }
}

// buttons that open dropdown menus
.nav-trigger {
  color: var(--muted-foreground);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
  transition: all 150ms ease 0s;

  .lucide {
    color: var(--muted-foreground);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  }
}

// when on the route a button is pointing to
.nav-active {
  background: linear-gradient(90deg, #3b82f6, #8b5cf6); /* gradient pill */
  color: white;
  border-radius: var(--radius-md);
  box-shadow: 0 0 12px rgba(139, 92, 246, 0.6);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);

  .lucide {
    color: white;
    opacity: 100%;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  }
}

// active link in dropdown => active trigger
// active trigger style === hovering over a normal nav link
.nav-link:hover,
.nav-trigger:hover,
.trigger-active {
  background: rgba(139, 92, 246, 0.25);
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.4);
  border-radius: var(--radius-md);
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));

  .lucide {
    color: white;
    opacity: 80%;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5));
  }
}
</style>
