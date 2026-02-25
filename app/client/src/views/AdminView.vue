<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useExperience } from "@/stores/experience";
import SkillsSection from "@/components/admin/SkillsSection.vue";

const { skills } = storeToRefs(useExperience());
</script>

<template>
  <div class="admin-view">
    <section>
      <h1 class="mt-12 mb-4">Skills</h1>
      <SkillsSection :skills="skills" />
      <!-- <JobEditor :jobs="jobs" />
      <ProjectEditor :projects="projects" />
      <AwardEditor :awards="awards" /> -->
    </section>
  </div>
</template>

<style scoped>
.admin-view {
  padding: 2rem;
}
</style>
