<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { PencilLine, Trash, Check, X } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Skill } from "@types";
import CardContent from "@/components/ui/card/CardContent.vue";
import Draggable from "vuedraggable";

const emit = defineEmits<{
  save: [skills: Skill[]];
}>();

const { skills, category } = defineProps<{
  skills: Skill[] | undefined;
  category: string;
}>();

const localSkills = ref<Skill[]>([]);
const showConfirm = ref(false);
const editingId = ref<string | null>(null);
const editingName = ref("");

watch(
  () => skills,
  (newSkills) => {
    if (newSkills) {
      localSkills.value = [...newSkills];
    }
  },
  { immediate: true, deep: true },
);

const handleSaveClick = () => {
  showConfirm.value = true;
};

const confirmSave = () => {
  emit("save", localSkills.value);
  showConfirm.value = false;
  toast.success(`${category} skills saved successfully!`);
};

const cancelSave = () => {
  showConfirm.value = false;
};

const handleAdd = async () => {
  const newSkill: Skill = {
    id: `skill-${Date.now()}`,
    name: "New Skill",
    icon: "fas fa-star",
    rank: localSkills.value.length + 1,
  };
  localSkills.value.push(newSkill);
  editingId.value = newSkill.id;
  editingName.value = newSkill.name;
  await nextTick();
  const input = document.querySelector(
    `input[data-skill-id="${newSkill.id}"]`,
  ) as HTMLInputElement;
  input?.focus();
};

const startEdit = (skill: Skill) => {
  editingId.value = skill.id;
  editingName.value = skill.name;
};

const saveEdit = (skill: Skill) => {
  skill.name = editingName.value;
  editingId.value = null;
};

const cancelEdit = (skill: Skill) => {
  if (editingName.value === "New Skill" && skill.name === "New Skill") {
    handleDelete(skill.id);
  } else {
    editingId.value = null;
  }
};

const handleDelete = (id: string) => {
  localSkills.value = localSkills.value.filter((skill) => skill.id !== id);
};
</script>

<template>
  <Card class="w-1/4">
    <CardHeader>
      <CardTitle>{{ category }}</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col gap-4 h-full">
      <Draggable
        v-model="localSkills"
        item-key="id"
        class="flex flex-col gap-2"
        v-bind="{ animation: 200, ghostClass: 'dragging' }"
      >
        <template #item="{ element, index }">
          <div
            v-if="editingId !== element.id"
            class="flex gap-3 items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors cursor-default h-12 w-full"
          >
            <span class="text-gray-400 font-semibold w-6">{{ index + 1 }}</span>
            <i :class="element.icon + ' text-blue-400'"></i>
            <span class="flex-1">{{ element.name }}</span>
            <button
              @click="startEdit(element)"
              class="flex items-center justify-center rounded-full size-5 bg-gray-700 hover:bg-gray-600 transition-colors"
              title="Edit skill"
              :key="`edit-${element.id}`"
            >
              <PencilLine class="text-gray-400 size-3" />
            </button>
            <button
              @click="handleDelete(element.id)"
              class="flex items-center justify-center rounded-full size-5 bg-gray-700 hover:bg-gray-600 transition-colors"
              title="Delete skill"
              :key="`delete-${element.id}`"
            >
              <Trash class="text-gray-400 size-3" />
            </button>
          </div>

          <div
            v-else
            class="flex gap-3 items-center p-3 rounded-lg bg-blue-900 h-12 w-full"
          >
            <span class="text-gray-400 font-semibold w-6">{{ index + 1 }}</span>
            <i :class="element.icon + ' text-blue-400'"></i>
            <input
              :data-skill-id="element.id"
              v-model="editingName"
              @keyup.enter="saveEdit(element)"
              @keyup.escape="cancelEdit(element)"
              class="flex-1 bg-gray-800 text-white px-2 py-1 rounded border border-blue-500 h-6 w-full"
              type="text"
            />
            <button
              @click="saveEdit(element)"
              class="flex items-center justify-center rounded-full size-5 bg-green-600 hover:bg-green-700 transition-colors"
              title="Save"
              :key="`create-${element.id}`"
            >
              <Check class="text-white size-3" />
            </button>
            <button
              @click="cancelEdit(element)"
              class="flex items-center justify-center rounded-full size-5 bg-red-600 hover:bg-red-700 transition-colors"
              title="Cancel"
              :key="`cancel-${element.id}`"
            >
              <X class="text-white size-3" />
            </button>
          </div>
        </template>
      </Draggable>

      <button
        @click="handleAdd"
        class="flex gap-3 items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors border-2 border-dashed border-gray-600 hover:border-blue-500 cursor-pointer"
      >
        <span class="text-gray-400 font-semibold w-6">+</span>
        <span class="text-gray-400">Add new skill</span>
      </button>

      <div v-if="!showConfirm" class="mt-auto">
        <button
          @click="handleSaveClick"
          class="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
        >
          Save Changes
        </button>
      </div>

      <div v-else class="mt-auto flex flex-col gap-2">
        <p class="text-white text-sm text-center">
          Save changes to {{ category }}?
        </p>
        <div class="flex gap-2">
          <button
            @click="confirmSave"
            class="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium"
          >
            Confirm
          </button>
          <button
            @click="cancelSave"
            class="flex-1 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<style lang="scss" scoped>
:deep(.dragging) {
  @apply opacity-50 bg-gray-700;
}
</style>
