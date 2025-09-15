<script lang="ts" setup>
import { useExperience } from '@/stores/experience'
import SectionDivider from '../SectionDivider.vue'
import SectionHeader from '../SectionHeader.vue'
import SkillsCategory from './components/SkillsCategory.vue'
import { LaptopMinimalCheck } from 'lucide-vue-next'

const { skills } = useExperience()
</script>

<template>
  <section
    id="skills"
    class="relative scroll-mt-16 bg-gradient-to-b from-gray-800 to-gray-900 pb-8"
  >
    <SectionDivider class="absolute -top-1 mb-16" />
    <div
      class="absolute inset-0 bg-[url('/patterns/diamonds.svg')] bg-[length:540px_450px] bg-repeat opacity-30"
    ></div>

    <div class="relative mx-auto max-w-5xl px-6 text-center">
      <!-- Heading -->
      <SectionHeader>
        <div
          class="flex w-full flex-col items-center sm:flex-row sm:items-center sm:justify-center"
        >
          <LaptopMinimalCheck class="mr-0 mb-2 size-10 sm:mr-4 sm:mb-0 sm:size-12" />
          <div class="text-center sm:text-left">My <span class="text-blue-400">Skills</span></div>
        </div>
      </SectionHeader>

      <!-- Categories -->
      <div class="space-y-16">
        <SkillsCategory
          v-if="skills?.frontend.length"
          title="Frontend"
          :skills="skills?.frontend"
        />
        <SkillsCategory
          v-if="skills?.backend.length"
          title="Backend & Databases"
          :skills="skills?.backend"
        />
        <SkillsCategory
          v-if="skills?.testing.length"
          title="Testing & QA"
          :skills="skills?.testing"
        />
        <SkillsCategory
          v-if="skills?.cloud.length"
          title="Cloud & DevOps"
          :skills="skills?.cloud"
        />
        <SkillsCategory v-if="skills?.tools.length" title="Tools" :skills="skills?.tools" />
      </div>
    </div>
  </section>
</template>
