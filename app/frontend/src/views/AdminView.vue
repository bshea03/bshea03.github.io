<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useExperience } from "@/stores/experience";
import SkillsSection from "@/components/admin/skills-section/SkillsSection.vue";
import JobsSection from "@/components/admin/jobs-section/JobsSection.vue";
import AwardsSection from "@/components/admin/awards-section/AwardsSection.vue";
import ResumeSection from "@/components/admin/resume-section/ResumeSection.vue";
import ProjectsSection from "@/components/admin/projects-section/ProjectsSection.vue";

const { skills, jobs, awards, projects } = storeToRefs(useExperience());
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
    <section>
      <h1 class="mt-12 mb-4">Projects</h1>
      <ProjectsSection :projects="projects" />
    </section>
    <section>
      <h1 class="mt-12 mb-4">Resume</h1>
      <ResumeSection />
    </section>
  </div>
</template>

<style scoped>
.admin-view {
  padding: 2rem;
}
</style>
