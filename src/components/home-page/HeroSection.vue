<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import avatar from '/images/me.png'

const particlesOptions = {
  background: { color: 'transparent' },
  fullScreen: { enable: false },
  detectRetina: true,
  particles: {
    number: {
      value: 100,
      density: { enable: true, area: 800 },
    },
    color: {
      value: ['#ffffff', '#a5b4fc', '#c084fc'],
    },
    shape: { type: 'circle' },
    opacity: {
      value: { min: 0.3, max: 0.9 },
      random: { enable: true },
      animation: {
        enable: true,
        speed: 1.2,
        minimumValue: 0.2,
        sync: false,
      },
    },
    size: {
      value: { min: 1, max: 3 },
      random: { enable: true },
      animation: {
        enable: true,
        speed: 2,
        minimumValue: 1,
        sync: false,
      },
    },
    move: { enable: false },
    shadow: {
      enable: true,
      color: '#ffffff',
      blur: 6,
    },
    reduceDuplicates: true,
  },
}
</script>

<template>
  <!-- Hero content -->
  <section
    id="hero"
    class="relative z-10 flex min-h-[90vh] flex-col justify-center gap-8 px-4 py-12 text-center sm:px-6 md:min-h-[75vh] md:flex-row md:gap-12 md:py-0 md:text-left"
  >
    <!-- Gradient glow background -->
    <div
      class="absolute -inset-8 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
    ></div>

    <!-- Particles -->
    <vue-particles id="tsparticles" class="absolute inset-0 -z-10" :options="particlesOptions" />

    <div class="relative flex flex-col items-center gap-8 md:flex-row">
      <!-- Profile image -->
      <div
        data-aos="fade-right"
        data-aos-duration="800"
        class="flex flex-shrink-0 justify-center md:translate-y-[-10px]"
      >
        <div
          class="rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 p-1 transition-all duration-300"
        >
          <Avatar
            class="relative h-32 w-32 rounded-full object-cover shadow-lg shadow-blue-900/40 sm:h-40 sm:w-40 md:h-52 md:w-52"
          >
            <AvatarImage :src="avatar" />
            <AvatarFallback>BS</AvatarFallback>
          </Avatar>
        </div>
      </div>

      <!-- Divider (hidden on small) -->
      <div
        data-aos="fade-down"
        data-aos-duration="600"
        data-aos-delay="400"
        class="hidden h-32 w-0.5 origin-top bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 sm:h-40 md:block md:h-44"
      ></div>

      <!-- Text content -->
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay="700"
        class="max-w-xl space-y-5 leading-relaxed"
      >
        <!-- Headline -->
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Hi, I’m <span class="text-blue-400">Brady</span>
        </h1>

        <!-- Paragraph -->
        <p class="text-base text-gray-200 sm:text-lg">
          A full stack engineer inspired by music, driven by learning, and passionate about building
          things worth using.
        </p>

        <!-- Buttons -->
        <div class="mt-6 flex flex-wrap justify-center gap-4 md:justify-start">
          <RouterLink to="/experience#portfolio">
            <Button
              class="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 font-medium text-white shadow-md transition hover:scale-[105%] hover:shadow-[0_0_10px_rgba(139,92,246,0.6)]"
            >
              View Projects
            </Button>
          </RouterLink>

          <RouterLink to="/experience#resume">
            <Button
              variant="secondary"
              class="rounded-full border border-purple-500/40 bg-indigo-950 px-6 py-3 shadow-md transition hover:scale-[105%] hover:bg-indigo-950 hover:shadow-[0_0_10px_rgba(139,92,246,0.2)]"
            >
              Download Resume
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Bottom shape divider -->
    <div class="custom-shape-divider-bottom-1757396282">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
  </section>
</template>

<style lang="css">
.custom-shape-divider-bottom-1757396282 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  transform: rotate(180deg);
}

.custom-shape-divider-bottom-1757396282 svg {
  position: relative;
  display: block;
  width: calc(143% + 1.3px);
  height: 69px;
}

.custom-shape-divider-bottom-1757396282 .shape-fill {
  fill: var(--color-slate-900);
}
</style>
