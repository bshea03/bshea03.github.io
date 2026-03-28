<script setup lang="ts">
import SkillEditorList from "./components/SkillEditorList.vue";
import type { SkillList } from "@types";

const props = defineProps<{ skills: SkillList | undefined }>();

const { frontend, backend, testing, cloud, tools } = props.skills || {};
</script>

<template>
  <div class="editor flex flex-row gap-4">
    <SkillEditorList :skills="frontend" category="Frontend" />
    <SkillEditorList :skills="backend" category="Backend" />
    <SkillEditorList :skills="testing" category="Testing" />
    <SkillEditorList :skills="cloud" category="Cloud" />
    <SkillEditorList :skills="tools" category="Tools" />
  </div>
</template>

<style scoped>
.editor {
  margin-bottom: 2rem;
}
</style>
