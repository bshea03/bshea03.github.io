<script setup lang="ts">
import WorkSection from '@/components/experience-page/WorkSection.vue'
import AwardsSection from '@/components/experience-page/AwardsSection.vue'
import ResumeSection from '@/components/experience-page/ResumeSection.vue'
import PortfolioSection from '@/components/experience-page/PortfolioSection.vue'
</script>

<template>
  <div class="relative bg-gradient-to-br from-gray-900 via-black to-gray-900">
    <WorkSection />

    <AwardsSection />

    <PortfolioSection />

    <ResumeSection />
  </div>
</template>

<style scoped></style>
