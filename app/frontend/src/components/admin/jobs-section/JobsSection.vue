<script setup lang="ts">
import { ref } from "vue";
import { ChevronDown, ChevronUp, Plus, Trash } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { Card } from "@/components/ui/card";
import type { Job } from "@types";
import JobEditorCard from "./components/JobEditorCard.vue";
import { useExperience } from "@/stores/experience";

const { jobs } = defineProps<{ jobs: Job[] }>();
const store = useExperience();

const expandedId = ref<number | "new" | null>(null);
const deletingId = ref<number | null>(null);

const handleDelete = async (job: Job, e: MouseEvent) => {
  e.stopPropagation();
  if (!confirm(`Delete "${job.company}"? This cannot be undone.`)) return;
  deletingId.value = job.id;
  try {
    await store.deleteJob(job.id);
    if (expandedId.value === job.id) expandedId.value = null;
    toast.success(`${job.company} deleted.`);
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to delete job");
  } finally {
    deletingId.value = null;
  }
};

const toggle = (id: number) => {
  expandedId.value = expandedId.value === id ? null : id;
};

const blankJob = (): Job => ({
  id: 0,
  company: "",
  description: "",
  dates: "",
  location: "",
  icon: "",
  details: [],
  skills: [],
});
</script>

<template>
  <div class="flex flex-col gap-3 mb-8">
    <!-- Existing jobs -->
    <Card v-for="job in jobs" :key="job.id" class="overflow-hidden">
      <!-- Row header -->
      <button
        class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors"
        @click="toggle(job.id)"
      >
        <div class="flex items-center gap-4 min-w-0">
          <img
            v-if="job.icon"
            :src="job.icon"
            :alt="job.company"
            class="h-8 w-8 object-contain shrink-0 rounded"
          />
          <div class="min-w-0">
            <p class="font-semibold truncate">{{ job.company }}</p>
            <p class="text-sm text-gray-400 truncate">{{ job.description }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <span class="text-sm text-gray-500">{{ job.dates }}</span>
          <button
            @click="handleDelete(job, $event)"
            :disabled="deletingId === job.id"
            class="flex items-center justify-center size-7 rounded-full bg-gray-700 hover:bg-red-600 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
            title="Delete job"
          >
            <Trash class="size-3" />
          </button>
          <ChevronUp
            v-if="expandedId === job.id"
            class="size-4 text-gray-400"
          />
          <ChevronDown v-else class="size-4 text-gray-400" />
        </div>
      </button>

      <!-- Expanded editor -->
      <div v-if="expandedId === job.id" class="border-t border-white/10">
        <JobEditorCard
          :job="job"
          @saved="expandedId = null"
          @cancel="expandedId = null"
        />
      </div>
    </Card>

    <!-- Add new job -->
    <Card v-if="expandedId === 'new'" class="overflow-hidden">
      <div class="px-5 py-4 border-b border-white/10">
        <p class="font-semibold">New Job</p>
      </div>
      <JobEditorCard
        :job="blankJob()"
        :is-new="true"
        @saved="expandedId = null"
        @cancel="expandedId = null"
      />
    </Card>

    <button
      v-if="expandedId !== 'new'"
      @click="expandedId = 'new'"
      class="flex gap-3 items-center p-4 rounded-lg bg-gray-800 hover:bg-gray-750 border-2 border-dashed border-gray-600 hover:border-blue-500 transition-colors text-gray-400 cursor-pointer"
    >
      <Plus class="size-5" />
      <span class="font-medium">Add new job</span>
    </button>
  </div>
</template>
