<script setup lang="ts">
import SectionHeader from '../SectionHeader.vue'
import BaseCard from '../BaseCard.vue'

// Lucide icons
import { Hourglass, Layers, BookOpen, User } from 'lucide-vue-next'
</script>

<template>
  <!-- About Section -->
  <section
    id="about"
    class="relative scroll-mt-16 bg-gradient-to-b from-slate-900 to-slate-800 px-6 pt-10 pb-18"
  >
    <div class="absolute inset-0 bg-[url('/patterns/dots.svg')] bg-repeat opacity-20"></div>

    <div class="relative mx-auto max-w-5xl text-center">
      <!-- Heading -->
      <SectionHeader
        ><div
          class="flex w-full flex-col items-center sm:flex-row sm:items-center sm:justify-center"
        >
          <User class="mr-0 mb-2 size-10 sm:mr-4 sm:mb-0 sm:size-12" />
          <div class="text-center sm:text-left">About <span class="text-blue-400">Me</span></div>
        </div>
      </SectionHeader>

      <!-- Body -->
      <div
        class="mx-auto max-w-3xl text-lg leading-relaxed text-gray-200"
        data-aos="fade-up"
        data-aos-delay="200"
        data-aos-duration="800"
        data-aos-once="true"
      >
        <p>
          I’m <span class="font-semibold text-white">Brady Shea</span>, a full stack engineer based
          in <span class="font-semibold text-white">Pittsburgh, PA</span>, with a passion for
          building modern, user-focused web applications. While I thrive in
          <span class="font-semibold text-white">frontend development</span> and enjoy creating
          engaging user interfaces, I’m also comfortable across the
          <span class="font-semibold text-white">backend</span>, delivering reliable, end-to-end
          solutions. I’m always eager to learn new technologies and apply them in creative ways —
          whether through my <span class="font-semibold text-white">Discord apps</span>, or projects
          like this website. I’m currently most interested in
          <span class="font-semibold text-white">remote roles</span> where I can collaborate with
          diverse teams and expand my impact beyond my city.
        </p>
        <p class="mt-8">
          Outside of coding, one of my greatest passions has always been
          <span class="font-semibold text-white">music</span>. From a young age, it’s been a
          constant source of creativity and inspiration. While guitar is my main focus, I’ve also
          spent countless hours exploring theory, history, and more recently, production. Music is
          what first sparked my love for learning, and it continues to push me to grow and
          experiment years later.
        </p>
      </div>

      <!-- Highlights / Cards -->
      <div
        class="mt-12 grid gap-6 md:grid-cols-3"
        data-aos="fade-up"
        data-aos-delay="400"
        data-aos-duration="800"
        data-aos-once="true"
      >
        <BaseCard hoverScale hoverGlow scaleMode="outer">
          <div class="flex flex-col items-center p-6 text-center">
            <Hourglass class="mb-4 h-10 w-10 text-blue-400" />
            <h3 class="mb-2 text-xl font-semibold text-white">5+ Years</h3>
            <p class="text-sm text-gray-200">
              Experience building and scaling modern web applications
            </p>
          </div>
        </BaseCard>

        <BaseCard hoverScale hoverGlow scaleMode="outer">
          <div class="flex flex-col items-center p-6 text-center">
            <Layers class="mb-4 h-10 w-10 text-blue-400" />
            <h3 class="mb-2 text-xl font-semibold text-white">Full Stack</h3>
            <p class="text-sm text-gray-200">
              Proficient across frontend and backend, with a passion for UI
            </p>
          </div>
        </BaseCard>

        <BaseCard hoverScale hoverGlow scaleMode="outer">
          <div class="flex flex-col items-center p-6 text-center">
            <BookOpen class="mb-4 h-10 w-10 text-blue-400" />
            <h3 class="mb-2 text-xl font-semibold text-white">Always Learning</h3>
            <p class="text-sm text-gray-200">
              Constantly exploring new frameworks, tools, and technologies
            </p>
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>
