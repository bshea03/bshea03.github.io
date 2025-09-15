<script lang="ts" setup>
import { Contact, Mail } from 'lucide-vue-next'
import SectionHeader from '../SectionHeader.vue'
import SectionDivider from '../SectionDivider.vue'
</script>

<template>
  <section id="contact" class="relative bg-gradient-to-b from-gray-900 to-slate-950 pb-20">
    <SectionDivider class="absolute -top-1 mb-16" />

    <!-- BG constellation -->
    <div
      class="absolute inset-0 bg-[url('/patterns/constellation.svg')] bg-[length:400px_400px] bg-repeat opacity-40"
    ></div>

    <!-- Content -->
    <div
      class="relative z-10 mx-auto max-w-3xl px-6 text-center"
      data-aos="fade-up"
      data-aos-once="true"
    >
      <SectionHeader>
        <div
          class="flex w-full flex-col items-center sm:flex-row sm:items-center sm:justify-center"
        >
          <Contact class="mr-0 mb-2 size-10 sm:mr-4 sm:mb-0 sm:size-12" />
          <div class="text-center sm:text-left">
            Get in <span class="text-blue-400">Touch</span>
          </div>
        </div>
      </SectionHeader>
      <p class="text-white-200 mb-8">
        Let’s connect! I’m always happy to discuss opportunities, projects, or ideas.
      </p>

      <!-- Contact options -->
      <div class="mt-6 flex items-center justify-center gap-8">
        <!-- GitHub -->
        <div
          class="rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 p-[1px] transition-all hover:scale-105"
        >
          <a
            href="https://github.com/bshea03"
            target="_blank"
            rel="noopener"
            class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-gray-400 duration-500 hover:text-white hover:shadow-md hover:shadow-blue-500/40"
          >
            <i class="devicon-github-original text-3xl"></i>
          </a>
        </div>

        <!-- LinkedIn -->
        <div
          class="rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 p-[1px] transition-all hover:scale-105"
        >
          <a
            href="https://www.linkedin.com/in/brady-shea-699911152/"
            target="_blank"
            rel="noopener"
            class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-gray-400 duration-500 hover:text-white hover:shadow-md hover:shadow-blue-500/40"
          >
            <i class="devicon-linkedin-plain text-3xl"></i>
          </a>
        </div>

        <!-- Email -->
        <div
          class="rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 p-[1px] transition-all hover:scale-105"
        >
          <a
            href="mailto:brady.shea97@gmail.com"
            target="_blank"
            class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-gray-400 duration-500 hover:text-white hover:shadow-md hover:shadow-blue-500/40"
          >
            <Mail class="h-8 w-8" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
