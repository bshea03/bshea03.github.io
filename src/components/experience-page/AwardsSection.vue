<script setup lang="ts">
import { Trophy } from 'lucide-vue-next'
import SectionHeader from '../SectionHeader.vue'
import AwardCard from './components/AwardCard.vue'
import SectionDivider from '../SectionDivider.vue'
import { useExperience } from '@/stores/experience'

const { awards } = useExperience()
</script>

<template>
  <section id="awards" class="relative bg-gradient-to-b from-gray-800 to-gray-950 pt-16 pb-24">
    <!-- Background pattern -->
    <div
      class="absolute inset-0 bg-[url('/patterns/diamonds.svg')] bg-[length:540px_450px] bg-repeat opacity-20"
    ></div>

    <!-- Divider (full width) -->
    <SectionDivider class="absolute -top-17 w-full" />

    <!-- Content wrapper -->
    <div class="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <SectionHeader>
        <div
          class="flex w-full flex-col items-center sm:flex-row sm:items-center sm:justify-center"
        >
          <Trophy class="mr-0 mb-2 size-10 sm:mr-4 sm:mb-0 sm:size-12" />
          <div class="text-center sm:text-left">
            Awards & <span class="text-blue-400">Achievements</span>
          </div>
        </div>
      </SectionHeader>

      <!-- Awards grid -->
      <div class="mt-2 flex w-full justify-center">
        <div class="grid w-full max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-8">
          <AwardCard v-for="award in awards" :key="award.title" :award="award" class="h-full" />
        </div>
      </div>
    </div>
  </section>
</template>
