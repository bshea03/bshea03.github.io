<script setup lang="ts">
import { ref, watch } from "vue";
import { Plus, Trash, Upload } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { Project } from "@types";
import { useExperience } from "@/stores/experience";
import { useGcsUpload } from "@/composables/useGcsUpload";

const store = useExperience();
const { uploadToGcs } = useGcsUpload();

const { project, isNew = false } = defineProps<{ project: Project; isNew?: boolean }>();
const emit = defineEmits<{ saved: []; cancel: [] }>();

const local = ref<Project>({ ...project, details: { ...project.details, features: [...(project.details?.features ?? [])] }, tech: [...(project.tech ?? [])] });
const saving = ref(false);
const imageUploading = ref(false);
const readmeUploading = ref(false);
const newTech = ref("");

watch(() => project, (p) => {
  local.value = { ...p, details: { ...p.details, features: [...(p.details?.features ?? [])] }, tech: [...(p.tech ?? [])] };
}, { immediate: true });

// --- Features ---
const addFeature = () => local.value.details.features.push({ title: "", description: "" });
const removeFeature = (i: number) => local.value.details.features.splice(i, 1);

// --- Tech ---
const addTech = () => {
  const t = newTech.value.trim();
  if (!t) return;
  local.value.tech.push(t);
  newTech.value = "";
};
const removeTech = (i: number) => local.value.tech.splice(i, 1);
const handleTechKeydown = (e: KeyboardEvent) => { if (e.key === "Enter") { e.preventDefault(); addTech(); } };

// --- Image upload ---
const handleImageUpload = async (e: Event) => {
  if (isNew) return;
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  imageUploading.value = true;
  try {
    local.value.image = await uploadToGcs(`projects/${local.value.id}/image-upload-url`, file);
    toast.success("Image uploaded.");
  } catch { toast.error("Failed to upload image."); }
  finally { imageUploading.value = false; }
};

// --- Readme upload ---
const handleReadmeUpload = async (e: Event) => {
  if (isNew) return;
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  readmeUploading.value = true;
  try {
    local.value.docs = await uploadToGcs(`projects/${local.value.id}/readme-upload-url`, file);
    toast.success("Readme uploaded.");
  } catch { toast.error("Failed to upload readme."); }
  finally { readmeUploading.value = false; }
};

// --- Save ---
const save = async () => {
  saving.value = true;
  try {
    if (isNew) {
      await store.createProject(local.value);
      toast.success("Project created!");
    } else {
      await store.updateProject(local.value.id, local.value);
      toast.success(`"${local.value.title}" saved!`);
    }
    emit("saved");
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to save project");
  } finally { saving.value = false; }
};
</script>

<template>
  <div class="flex flex-col gap-3 px-5 pt-3 pb-5">

    <!-- Row 1: Title + Alt -->
    <div class="grid grid-cols-2 gap-3">
      <div class="flex flex-col gap-1">
        <label class="text-xs text-gray-400">Title</label>
        <input v-model="local.title" type="text" class="input" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-gray-400">Image Alt Text</label>
        <input v-model="local.alt" type="text" class="input" placeholder="Optional" />
      </div>
    </div>

    <!-- Description -->
    <div class="flex flex-col gap-1">
      <label class="text-xs text-gray-400">Description</label>
      <textarea v-model="local.description" rows="2" class="input resize-none" />
    </div>

    <!-- Details: Intro -->
    <div class="flex flex-col gap-1">
      <label class="text-xs text-gray-400">Intro</label>
      <textarea v-model="local.details.intro" rows="2" class="input resize-none" />
    </div>

    <!-- Features -->
    <div class="flex flex-col gap-2">
      <label class="text-xs text-gray-400">Key Features</label>
      <div v-for="(feature, i) in local.details.features" :key="i" class="flex gap-2 items-start">
        <div class="flex flex-col gap-1 flex-1">
          <span class="text-xs text-gray-500">Feature {{ i + 1 }}</span>
          <input v-model="feature.title" type="text" class="input" placeholder="Feature title" />
          <input v-model="feature.description" type="text" class="input" placeholder="Feature description" />
        </div>
        <button @click="removeFeature(i)" class="icon-btn-danger mt-1 shrink-0">
          <Trash class="size-3" />
        </button>
      </div>
      <button @click="addFeature" class="flex gap-2 items-center p-2 rounded-lg bg-gray-800 border-2 border-dashed border-gray-600 hover:border-blue-500 transition-colors text-gray-400 text-sm cursor-pointer">
        <Plus class="size-4" /> Add feature
      </button>
    </div>

    <!-- Conclusion -->
    <div class="flex flex-col gap-1">
      <label class="text-xs text-gray-400">Conclusion</label>
      <textarea v-model="local.details.conclusion" rows="2" class="input resize-none" />
    </div>

    <!-- Tech -->
    <div class="flex flex-col gap-2">
      <label class="text-xs text-gray-400">Tech</label>
      <div class="flex flex-wrap gap-2">
        <span v-for="(t, i) in local.tech" :key="i" class="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-200">
          {{ t }}
          <button @click="removeTech(i)" class="text-gray-400 hover:text-red-400 transition-colors">×</button>
        </span>
      </div>
      <div class="flex gap-2">
        <input v-model="newTech" type="text" class="input flex-1" placeholder="Add tech and press Enter" @keydown="handleTechKeydown" />
        <button @click="addTech" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors">Add</button>
      </div>
    </div>

    <!-- Links -->
    <div class="grid grid-cols-2 gap-3">
      <div class="flex flex-col gap-1">
        <label class="text-xs text-gray-400">Code URL</label>
        <input v-model="local.code" type="text" class="input" placeholder="Optional" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-gray-400">Docs URL</label>
        <input v-model="local.docs" type="text" class="input" placeholder="Optional" />
      </div>
    </div>

    <!-- Image upload -->
    <div class="flex flex-col gap-1">
      <label class="text-xs text-gray-400">Header Image</label>
      <div class="flex gap-3 items-center">
        <label class="flex gap-2 items-center px-3 py-2 rounded-lg border border-gray-600 bg-gray-800 text-sm text-gray-400 cursor-pointer hover:border-blue-500 transition-colors"
          :class="{ 'opacity-50 cursor-not-allowed': imageUploading || isNew }">
          <Upload class="size-4" />
          <span>{{ imageUploading ? "Uploading…" : "Choose image" }}</span>
          <input type="file" accept="image/*" class="hidden" :disabled="imageUploading || isNew" @change="handleImageUpload" />
        </label>
        <span v-if="isNew" class="text-xs text-gray-500">Save the project first to upload images.</span>
        <img v-if="local.image" :src="local.image" :alt="local.alt" class="h-10 w-auto object-cover rounded bg-gray-800" />
      </div>
    </div>

    <!-- Readme upload -->
    <div class="flex flex-col gap-1">
      <label class="text-xs text-gray-400">Readme / Docs File</label>
      <div class="flex gap-3 items-center">
        <label class="flex gap-2 items-center px-3 py-2 rounded-lg border border-gray-600 bg-gray-800 text-sm text-gray-400 cursor-pointer hover:border-blue-500 transition-colors"
          :class="{ 'opacity-50 cursor-not-allowed': readmeUploading || isNew }">
          <Upload class="size-4" />
          <span>{{ readmeUploading ? "Uploading…" : "Choose file (.md / .pdf)" }}</span>
          <input type="file" accept=".md,text/markdown,application/pdf" class="hidden" :disabled="readmeUploading || isNew" @change="handleReadmeUpload" />
        </label>
        <span v-if="isNew" class="text-xs text-gray-500">Save the project first to upload files.</span>
        <a v-else-if="local.docs" :href="local.docs" target="_blank" class="text-xs text-blue-400 hover:underline truncate max-w-xs">View current</a>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-2">
      <button @click="save" :disabled="saving" class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium">
        {{ isNew ? "Create Project" : "Save Changes" }}
      </button>
      <button @click="emit('cancel')" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium">
        Cancel
      </button>
    </div>

  </div>
</template>

<style scoped>
@reference "../../../../assets/index.css";

.input {
  @apply bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none text-sm w-full;
}
.icon-btn-danger {
  @apply flex items-center justify-center rounded-full size-6 bg-gray-700 hover:bg-red-600 text-gray-400 hover:text-white transition-colors shrink-0;
}
</style>
