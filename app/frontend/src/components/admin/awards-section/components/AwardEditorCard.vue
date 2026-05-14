<script setup lang="ts">
import { ref, watch } from "vue";
import { Award as AwardIcon, Medal } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { Award } from "@types";
import { useExperience } from "@/stores/experience";

const store = useExperience();

const { award, isNew = false } = defineProps<{
  award: Award;
  isNew?: boolean;
}>();
const emit = defineEmits<{ saved: []; cancel: [] }>();

const local = ref<Award>({ ...award });
const saving = ref(false);

watch(
  () => award,
  (a) => {
    local.value = { ...a };
  },
  { immediate: true },
);

const save = async () => {
  saving.value = true;
  try {
    if (isNew) {
      await store.createAward(local.value);
      toast.success("Award created successfully!");
    } else {
      await store.updateAward(local.value.id, local.value);
      toast.success(`"${local.value.title}" saved successfully!`);
    }
    emit("saved");
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to save award");
  } finally {
    saving.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col gap-3 px-5 pt-4">
    <div class="grid grid-cols-2 gap-3">
      <div class="flex flex-col gap-1">
        <label class="text-xs text-gray-400">Title</label>
        <input v-model="local.title" type="text" class="input" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-gray-400">Date</label>
        <input
          v-model="local.date"
          type="text"
          class="input"
          placeholder="e.g. May 2024"
        />
      </div>
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-xs text-gray-400">Description</label>
      <textarea
        v-model="local.description"
        rows="3"
        class="input resize-none"
      />
    </div>

    <div class="flex flex-col gap-1">
      <label class="text-xs text-gray-400">Icon</label>
      <div class="flex gap-3">
        <button
          type="button"
          @click="local.icon = 'Award'"
          class="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors"
          :class="
            local.icon === 'Award'
              ? 'border-blue-500 bg-blue-500/10 text-blue-400'
              : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500'
          "
        >
          <AwardIcon class="size-4" />
          <span class="text-sm">Award</span>
        </button>
        <button
          type="button"
          @click="local.icon = 'Medal'"
          class="flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors"
          :class="
            local.icon === 'Medal'
              ? 'border-blue-500 bg-blue-500/10 text-blue-400'
              : 'border-gray-600 bg-gray-800 text-gray-400 hover:border-gray-500'
          "
        >
          <Medal class="size-4" />
          <span class="text-sm">Medal</span>
        </button>
      </div>
    </div>

    <div class="flex gap-2">
      <button
        @click="save"
        :disabled="saving"
        class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
      >
        {{ isNew ? "Create Award" : "Save Changes" }}
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
</style>
