<script setup lang="ts">
import JobTimeline from '@/components/JobTimeline.vue'
import { Briefcase } from 'lucide-vue-next'
import SectionHeader from '@/components/SectionHeader.vue'
import { useExperience } from '@/stores/experience'

const { jobs } = useExperience()
</script>

<template>
  <section id="work" class="relative bg-cover bg-center bg-no-repeat pt-8">
    <div class="absolute inset-0 bg-[url('/patterns/circles.svg')] bg-cover"></div>
    <div class="absolute inset-0 bg-black/20"></div>

    <div class="relative z-10 flex flex-col items-center pt-16 pb-4 md:pt-20">
      <SectionHeader underlineStyles="!mb-2 ">
        <div
          class="flex w-full flex-col items-center sm:flex-row sm:items-center sm:justify-center"
        >
          <Briefcase class="mr-0 mb-2 size-10 sm:mr-4 sm:mb-0 sm:size-12" />
          <div class="text-center sm:text-left">
            Work <span class="text-blue-400">Experience</span>
          </div>
        </div>
      </SectionHeader>
      <JobTimeline v-if="jobs.length > 0" :jobs="jobs" class="w-full md:mb-8" />
    </div>
  </section>
</template>
