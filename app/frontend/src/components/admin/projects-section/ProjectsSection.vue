<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronDown, ChevronUp, Plus, Trash, GripVertical } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { Card } from "@/components/ui/card";
import type { Project } from "@types";
import Draggable from "vuedraggable";
import ProjectEditorCard from "./components/ProjectEditorCard.vue";
import { useExperience } from "@/stores/experience";

const { projects } = defineProps<{ projects: Project[] }>();
const store = useExperience();

const expandedId = ref<number | "new" | null>(null);
const deletingId = ref<number | null>(null);

const localProjects = computed({
  get: () => projects,
  set: (val) => store.reorderProjects(val).catch((err) => toast.error(err.message)),
});

const handleDelete = async (project: Project, e: MouseEvent) => {
  e.stopPropagation();
  if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
  deletingId.value = project.id;
  try {
    await store.deleteProject(project.id);
    if (expandedId.value === project.id) expandedId.value = null;
    toast.success(`"${project.title}" deleted.`);
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to delete project");
  } finally {
    deletingId.value = null;
  }
};

const toggle = (id: number) => {
  expandedId.value = expandedId.value === id ? null : id;
};

const blankProject = (): Project => ({
  id: 0,
  order: 0,
  title: "",
  description: "",
  details: { intro: "", features: [], conclusion: "" },
  image: "",
  alt: "",
  tech: [],
  docs: "",
  code: "",
});
</script>

<template>
  <div class="flex flex-col gap-3 mb-8">
    <Draggable
      v-model="localProjects"
      item-key="id"
      handle=".drag-handle"
      :animation="200"
      :disabled="expandedId !== null"
      class="flex flex-col gap-3"
    >
      <template #item="{ element: project }">
        <Card class="overflow-hidden hover:bg-white/5 transition-colors cursor-pointer">
          <button
            class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            @click="toggle(project.id)"
          >
            <div class="flex items-center gap-4 min-w-0">
              <GripVertical class="drag-handle text-gray-600 size-5 cursor-grab shrink-0" @click.stop />
              <img v-if="project.image" :src="project.image" :alt="project.alt" class="h-8 w-12 object-cover rounded shrink-0" />
              <div class="min-w-0">
                <p class="font-semibold truncate">{{ project.title }}</p>
                <p class="text-sm text-gray-400 truncate">{{ project.description }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <button
                @click="handleDelete(project, $event)"
                :disabled="deletingId === project.id"
                class="flex items-center justify-center size-7 rounded-full bg-gray-700 hover:bg-red-600 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                title="Delete project"
              >
                <Trash class="size-3" />
              </button>
              <ChevronUp v-if="expandedId === project.id" class="size-4 text-gray-400" />
              <ChevronDown v-else class="size-4 text-gray-400" />
            </div>
          </button>

          <div v-if="expandedId === project.id" class="border-t border-white/10">
            <ProjectEditorCard :project="project" @saved="expandedId = null" @cancel="expandedId = null" />
          </div>
        </Card>
      </template>
    </Draggable>

    <Card v-if="expandedId === 'new'" class="overflow-hidden pt-0 pb-5">
      <div class="px-5 py-4 border-b border-white/10">
        <p class="font-semibold">New Project</p>
      </div>
      <ProjectEditorCard :project="blankProject()" :is-new="true" @saved="expandedId = null" @cancel="expandedId = null" />
    </Card>

    <button
      v-if="expandedId !== 'new'"
      @click="expandedId = 'new'"
      class="flex gap-3 items-center p-4 rounded-lg bg-gray-800 border-2 border-dashed border-gray-600 hover:border-blue-500 transition-colors text-gray-400 cursor-pointer"
    >
      <Plus class="size-5" />
      <span class="font-medium">Add new project</span>
    </button>
  </div>
</template>
