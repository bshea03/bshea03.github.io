<script setup lang="ts">
import { FileUser } from "lucide-vue-next";
import SectionDivider from "../SectionDivider.vue";
import SectionHeader from "../SectionHeader.vue";
</script>

<template>
  <section
    id="resume"
    class="relative bg-gradient-to-b from-slate-800 to-slate-950 pb-16"
  >
    <div
      class="absolute inset-0 bg-[url('/patterns/diagonal.svg')] bg-repeat opacity-10"
    ></div>

    <SectionDivider class="absolute -top-1 mb-16" />

    <div
      class="relative mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
    >
      <SectionHeader>
        <div
          class="flex w-full flex-col items-center sm:flex-row sm:items-center sm:justify-center"
        >
          <FileUser class="mr-0 mb-2 size-10 sm:mr-4 sm:mb-0 sm:size-12" />
          <div class="text-center sm:text-left">
            My <span class="text-blue-400">Resume</span>
          </div>
        </div>
      </SectionHeader>

      <p class="mb-6 text-white/70 md:mb-8">
        You can download a copy of my most up-to-date resume below, or view it
        directly in your browser.
      </p>

      <!-- Gradient Border Frame -->
      <div
        class="relative mb-6 w-full max-w-4xl rounded-2xl p-[2px] shadow-[0_0_25px_rgba(139,92,246,0.3)]"
      >
        <div
          class="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        ></div>

        <!-- Resume preview (optional, remove if you only want download) -->
        <div
          class="relative overflow-hidden rounded-xl border border-white/10 shadow-md"
        >
          <iframe
            alt="Preview of Brady Shea’s resume highlighting full-stack and cloud experience"
            src="brady_shea_resume.pdf"
            class="h-[600px] w-full"
            title="Resume PDF"
          ></iframe>
        </div>
      </div>

      <!-- Download button -->
      <div class="mt-10 flex justify-center">
        <a
          name="Download resume"
          href="brady_shea_resume.pdf"
          download
          class="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105 hover:shadow-xl"
        >
          Download Resume
        </a>
      </div>
    </div>
  </section>
</template>
