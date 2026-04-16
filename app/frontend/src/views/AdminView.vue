<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useExperience } from "@/stores/experience";
import SkillsSection from "@/components/admin/skills-section/SkillsSection.vue";
import JobsSection from "@/components/admin/jobs-section/JobsSection.vue";
import AwardsSection from "@/components/admin/awards-section/AwardsSection.vue";

const { skills, jobs, awards } = storeToRefs(useExperience());
</script>

<template>
  <div class="admin-view">
    <section>
      <h1 class="mt-12 mb-4">Skills</h1>
      <SkillsSection :skills="skills" />
    </section>
    <section>
      <h1 class="mt-12 mb-4">Jobs</h1>
      <JobsSection :jobs="jobs" />
    </section>
    <section>
      <h1 class="mt-12 mb-4">Awards</h1>
      <AwardsSection :awards="awards" />
    </section>
  </div>
</template>

<style scoped>
.admin-view {
  padding: 2rem;
}
</style>
