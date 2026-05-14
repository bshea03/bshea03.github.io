<script setup lang="ts">
import { ref, watch } from "vue";
import { Plus, Trash, CornerDownRight, Upload } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { Job, ListItem } from "@types";
import { useExperience } from "@/stores/experience";
import { useAuthStore } from "@/stores/auth";
import { useGcsUpload, apiUrl } from "@/composables/useGcsUpload";

const store = useExperience();
const auth = useAuthStore();
const { uploadToGcs } = useGcsUpload();

const iconUploading = ref(false);

const handleIconUpload = async (e: Event) => {
  if (isNew) return;
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  iconUploading.value = true;
  try {
    const publicUrl = await uploadToGcs(`jobs/${local.value.id}/icon-upload-url`, file);
    const saveRes = await fetch(`${apiUrl}/jobs/${local.value.id}/icon`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${auth.token}` },
      body: JSON.stringify({ icon: publicUrl }),
    });
    if (!saveRes.ok) throw new Error("Failed to save icon to database");
    local.value.icon = publicUrl;
    toast.success("Icon uploaded.");
  } catch {
    toast.error("Failed to upload icon.");
  } finally {
    iconUploading.value = false;
  }
};

const { job, isNew = false } = defineProps<{ job: Job; isNew?: boolean }>();
const emit = defineEmits<{ saved: []; cancel: [] }>();

const local = ref<Job>({ ...job, details: [], skills: [] });
const saving = ref(false);

watch(
  () => job,
  (newJob) => {
    local.value = {
      ...newJob,
      details: newJob.details.map((d) => ({
        text: d.text,
        children: d.children ? d.children.map((c) => ({ text: c.text })) : [],
      })),
      skills: [...(newJob.skills ?? [])],
    };
  },
  { immediate: true, deep: true },
);

// --- Details helpers ---
const addBullet = () => {
  local.value.details.push({ text: "", children: [] });
};

const removeBullet = (i: number) => {
  local.value.details.splice(i, 1);
};

const addChild = (i: number) => {
  const detail = local.value.details[i] as ListItem & { children: ListItem[] };
  if (!detail.children) detail.children = [];
  detail.children.push({ text: "" });
};

const removeChild = (i: number, j: number) => {
  local.value.details[i].children!.splice(j, 1);
};

// --- Skills helpers ---
const newSkill = ref("");

const addSkill = () => {
  const trimmed = newSkill.value.trim();
  if (!trimmed) return;
  if (!local.value.skills) local.value.skills = [];
  local.value.skills.push(trimmed);
  newSkill.value = "";
};

const removeSkill = (i: number) => {
  local.value.skills!.splice(i, 1);
};

const handleSkillKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addSkill();
  }
};

// --- Save ---
const save = async () => {
  saving.value = true;
  try {
    if (isNew) {
      await store.createJob(local.value);
      toast.success("Job created successfully!");
    } else {
      await store.updateJob(local.value.id, local.value);
      toast.success(`${local.value.company} saved successfully!`);
    }
    emit("saved");
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to save job");
  } finally {
    saving.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col gap-3 px-5 pt-4 pb-5">

    <!-- Basic fields -->
    <div class="grid grid-cols-2 gap-3">
      <div class="flex flex-col gap-1">
        <label class="text-xs text-gray-400">Company</label>
        <input v-model="local.company" type="text" class="input" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-gray-400">Role / Description</label>
        <input v-model="local.description" type="text" class="input" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-gray-400">Dates</label>
        <input v-model="local.dates" type="text" class="input" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-gray-400">Location</label>
        <input v-model="local.location" type="text" class="input" placeholder="Optional" />
      </div>
    </div>

    <!-- Icon upload -->
    <div class="flex flex-col gap-1">
      <label class="text-xs text-gray-400">Icon</label>
      <div class="flex gap-3 items-center">
        <label
          class="flex gap-2 items-center px-3 py-2 rounded-lg border border-gray-600 bg-gray-800 text-sm text-gray-400 cursor-pointer hover:border-blue-500 transition-colors"
          :class="{ 'opacity-50 cursor-not-allowed': iconUploading || isNew }"
        >
          <Upload class="size-4" />
          <span>{{ iconUploading ? "Uploading…" : "Choose file" }}</span>
          <input
            type="file"
            accept="image/*"
            class="hidden"
            :disabled="iconUploading || isNew"
            @change="handleIconUpload"
          />
        </label>
        <span v-if="isNew" class="text-xs text-gray-500">Save the job first to enable icon upload.</span>
        <img
          v-if="local.icon"
          :src="local.icon"
          :alt="local.company"
          class="h-10 w-auto object-contain rounded bg-gray-800 p-1"
        />
      </div>
    </div>

    <!-- Details / bullet editor -->
    <div class="flex flex-col gap-2">
      <label class="text-xs text-gray-400">Details</label>

      <div v-for="(detail, i) in local.details" :key="i" class="flex flex-col gap-1">
        <div class="flex gap-2 items-center">
          <span class="text-gray-500 text-sm select-none">•</span>
          <input v-model="detail.text" type="text" class="input flex-1" placeholder="Bullet point" />
          <button @click="addChild(i)" class="icon-btn" title="Add sub-bullet">
            <CornerDownRight class="size-3" />
          </button>
          <button @click="removeBullet(i)" class="icon-btn-danger" title="Remove bullet">
            <Trash class="size-3" />
          </button>
        </div>
        <div v-for="(child, j) in detail.children" :key="j" class="flex gap-2 items-center pl-6">
          <span class="text-gray-600 text-sm select-none">–</span>
          <input v-model="child.text" type="text" class="input flex-1" placeholder="Sub-bullet" />
          <button @click="removeChild(i, j)" class="icon-btn-danger" title="Remove sub-bullet">
            <Trash class="size-3" />
          </button>
        </div>
      </div>

      <button
        @click="addBullet"
        class="flex gap-2 items-center p-2 rounded-lg bg-gray-800 border-2 border-dashed border-gray-600 hover:border-blue-500 transition-colors text-gray-400 text-sm cursor-pointer"
      >
        <Plus class="size-4" /> Add bullet
      </button>
    </div>

    <!-- Skills tags -->
    <div class="flex flex-col gap-2">
      <label class="text-xs text-gray-400">Skills</label>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(skill, i) in local.skills"
          :key="i"
          class="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-200"
        >
          {{ skill }}
          <button @click="removeSkill(i)" class="text-gray-400 hover:text-red-400 transition-colors">×</button>
        </span>
      </div>
      <div class="flex gap-2">
        <input
          v-model="newSkill"
          type="text"
          class="input flex-1"
          placeholder="Add skill and press Enter"
          @keydown="handleSkillKeydown"
        />
        <button @click="addSkill" class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors">
          Add
        </button>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex gap-2">
      <button
        @click="save"
        :disabled="saving"
        class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
      >
        {{ isNew ? "Create Job" : "Save Changes" }}
      </button>
      <button
        @click="emit('cancel')"
        class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
      >
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
.icon-btn {
  @apply flex items-center justify-center rounded-full size-6 bg-gray-700 hover:bg-gray-600 text-gray-400 transition-colors shrink-0;
}
.icon-btn-danger {
  @apply flex items-center justify-center rounded-full size-6 bg-gray-700 hover:bg-red-600 text-gray-400 hover:text-white transition-colors shrink-0;
}
</style>
