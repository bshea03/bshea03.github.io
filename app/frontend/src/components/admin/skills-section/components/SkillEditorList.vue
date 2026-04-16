<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { toast } from "vue-sonner";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import type { Skill } from "@types";
import CardContent from "@/components/ui/card/CardContent.vue";
import Draggable from "vuedraggable";
import { useExperience } from "@/stores/experience";
import SkillEditorItem from "./SkillEditorItem.vue";

const store = useExperience();

const { skills, category } = defineProps<{
  skills: Skill[] | undefined;
  category: string;
}>();

const localSkills = ref<Skill[]>([]);
const saving = ref(false);
const editingId = ref<string | null>(null);
const editingName = ref("");
const editingIcon = ref("");

watch(
  () => skills,
  (newSkills) => {
    if (newSkills) {
      localSkills.value = [...newSkills];
    }
  },
  { immediate: true, deep: true },
);

const confirmSave = async () => {
  saving.value = true;
  try {
    await store.updateSkills(localSkills.value, category);
    toast.success(`${category} skills saved successfully!`);
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to save skills");
  } finally {
    saving.value = false;
  }
};

const handleAdd = async () => {
  const newSkill: Skill = {
    id: `skill-${Date.now()}`,
    name: "New Skill",
    icon: "",
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

const handleDelete = (id: string) => {
  localSkills.value = localSkills.value.filter((skill) => skill.id !== id);
};

const startEdit = (skill: Skill) => {
  editingId.value = skill.id;
  editingName.value = skill.name;
  editingIcon.value = skill.icon;
};

const saveEdit = (skill: Skill) => {
  skill.name = editingName.value;
  skill.icon = editingIcon.value;
  editingId.value = null;
};

const cancelEdit = (skill: Skill) => {
  if (editingName.value === "New Skill" && skill.name === "New Skill") {
    handleDelete(skill.id);
  } else {
    editingId.value = null;
  }
};
</script>

<template>
  <Card class="w-1/4">
    <CardHeader>
      <CardTitle>{{ category }}</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-col gap-4 h-full">
      <div class="flex gap-2">
        <div class="flex flex-col gap-2">
          <div
            v-for="(_, index) in localSkills"
            :key="index"
            class="h-12 w-5 flex items-center justify-center text-gray-400 font-semibold select-none shrink-0"
          >
            {{ index + 1 }}
          </div>
        </div>

        <Draggable
          v-model="localSkills"
          item-key="id"
          class="flex flex-col gap-2 flex-1"
          v-bind="{ animation: 200, ghostClass: 'dragging', disabled: editingId !== null }"
        >
          <template #item="{ element }">
            <SkillEditorItem
              :skill="element"
              :is-editing="editingId === element.id"
              v-model:editing-name="editingName"
              v-model:editing-icon="editingIcon"
              @start-edit="startEdit(element)"
              @save-edit="saveEdit(element)"
              @cancel-edit="cancelEdit(element)"
              @delete="handleDelete(element.id)"
            />
          </template>
        </Draggable>
      </div>

      <button
        @click="handleAdd"
        class="flex gap-3 items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors border-2 border-dashed border-gray-600 hover:border-blue-500 cursor-pointer"
      >
        <span class="text-gray-400 font-semibold w-6">+</span>
        <span class="text-gray-400">Add new skill</span>
      </button>

      <div class="mt-auto">
        <button
          @click="confirmSave"
          :disabled="saving"
          class="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium"
        >
          Save Changes
        </button>
      </div>
    </CardContent>
  </Card>
</template>

<style lang="scss" scoped>
:deep(.dragging) {
  @apply opacity-50 bg-gray-700;
}
</style>
