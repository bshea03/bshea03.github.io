<script setup lang="ts">
import type { Skill } from "@/types";
defineProps<{ skills: Skill[] }>();
</script>

<template>
  <div class="editor">
    <h2>Skills</h2>
    <ul>
      <li v-for="(skill, index) in skills" :key="index">
        {{ skill.name }} ({{ skill.category }}) - Rank: {{ skill.rank }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.editor {
  margin-bottom: 2rem;
}
</style>
