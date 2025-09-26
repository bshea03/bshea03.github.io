<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useExperience } from "@/stores/experience";
import SkillEditor from "@/components/admin/SkillEditor.vue";
// import JobEditor from "@/components/admin/JobEditor.vue";
// import ProjectEditor from "@/components/admin/ProjectEditor.vue";
// import AwardEditor from "@/components/admin/AwardEditor.vue";

const experience = useExperience();
const experienceLoaded = ref(false);

onMounted(async () => {
  await experience.loadPortfolio();
  experienceLoaded.value = true;
});

const { skills, jobs, projects, awards } = experience;
</script>

<template>
  <div class="admin-view">
    <h1>Admin Dashboard</h1>

    <section v-if="experienceLoaded">
      <SkillEditor :skills="skills" />
      <!-- <JobEditor :jobs="jobs" />
      <ProjectEditor :projects="projects" />
      <AwardEditor :awards="awards" /> -->
    </section>

    <p v-else>Loading portfolio data…</p>
  </div>
</template>

<style scoped>
.admin-view {
  padding: 2rem;
}
</style>
