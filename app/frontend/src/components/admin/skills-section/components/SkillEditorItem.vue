<script setup lang="ts">
import { PencilLine, Trash, Check, X, GripVertical } from "lucide-vue-next";
import type { Skill } from "@types";
import IconPicker from "../../components/IconPicker.vue";

const { skill, isEditing } = defineProps<{
  skill: Skill;
  isEditing: boolean;
}>();

const editingName = defineModel<string>("editingName", { required: true });
const editingIcon = defineModel<string>("editingIcon", { required: true });

const emit = defineEmits<{
  startEdit: [];
  saveEdit: [];
  cancelEdit: [];
  delete: [];
}>();
</script>

<template>
  <div
    v-if="!isEditing"
    class="flex gap-3 items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors cursor-grab h-12 w-full"
  >
    <GripVertical
      class="drag-handle text-gray-600 size-4 cursor-grab shrink-0"
    />
    <i :class="skill.icon + ' text-blue-400'"></i>
    <span class="flex-1">{{ skill.name }}</span>
    <button
      @click="emit('startEdit')"
      class="flex items-center justify-center rounded-full size-5 bg-gray-700 hover:bg-gray-600 transition-colors"
      title="Edit skill"
    >
      <PencilLine class="text-gray-400 size-3" />
    </button>
    <button
      @click="emit('delete')"
      class="flex items-center justify-center rounded-full size-5 bg-gray-700 hover:bg-gray-600 transition-colors"
      title="Delete skill"
    >
      <Trash class="text-gray-400 size-3" />
    </button>
  </div>

  <div
    v-else
    class="flex gap-3 items-center p-3 rounded-lg bg-blue-900 h-12 w-full"
  >
    <GripVertical class="drag-handle text-gray-600 size-4 shrink-0" />
    <IconPicker v-model="editingIcon" />
    <input
      :data-skill-id="skill.id"
      v-model="editingName"
      @keyup.enter="emit('saveEdit')"
      @keyup.escape="emit('cancelEdit')"
      class="flex-1 bg-gray-800 text-white px-2 py-1 rounded border border-blue-500 h-6 w-full"
      type="text"
    />
    <button
      @click="emit('saveEdit')"
      class="flex items-center justify-center rounded-full size-5 bg-green-600 hover:bg-green-700 transition-colors"
      title="Save"
    >
      <Check class="text-white size-3" />
    </button>
    <button
      @click="emit('cancelEdit')"
      class="flex items-center justify-center rounded-full size-5 bg-red-600 hover:bg-red-700 transition-colors"
      title="Cancel"
    >
      <X class="text-white size-3" />
    </button>
  </div>
</template>
