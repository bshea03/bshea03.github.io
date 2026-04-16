<script setup lang="ts">
import { ref, computed } from "vue";
import { ChevronDown, ChevronUp, Plus, Trash, GripVertical, Award as AwardIcon, Medal } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { Card } from "@/components/ui/card";
import type { Award } from "@types";
import Draggable from "vuedraggable";
import AwardEditorCard from "./components/AwardEditorCard.vue";
import { useExperience } from "@/stores/experience";

const { awards } = defineProps<{ awards: Award[] }>();
const store = useExperience();

const expandedId = ref<number | "new" | null>(null);
const deletingId = ref<number | null>(null);
const localAwards = computed({
  get: () => awards,
  set: (val) => store.reorderAwards(val).catch((err) => toast.error(err.message)),
});

const iconComponent = (icon: string) => icon === "Medal" ? Medal : AwardIcon;

const handleDelete = async (award: Award, e: MouseEvent) => {
  e.stopPropagation();
  if (!confirm(`Delete "${award.title}"? This cannot be undone.`)) return;
  deletingId.value = award.id;
  try {
    await store.deleteAward(award.id);
    if (expandedId.value === award.id) expandedId.value = null;
    toast.success(`"${award.title}" deleted.`);
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Failed to delete award");
  } finally {
    deletingId.value = null;
  }
};

const toggle = (id: number) => {
  expandedId.value = expandedId.value === id ? null : id;
};

const blankAward = (): Award => ({
  id: 0,
  title: "",
  description: "",
  icon: "Award",
  date: "",
});
</script>

<template>
  <div class="flex flex-col gap-3 mb-8">
    <Draggable
      v-model="localAwards"
      item-key="id"
      handle=".drag-handle"
      :animation="200"
      :disabled="expandedId !== null"
      class="flex flex-col gap-3"
    >
      <template #item="{ element: award }">
        <Card class="overflow-hidden">
          <button
            class="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/5 transition-colors"
            @click="toggle(award.id)"
          >
            <div class="flex items-center gap-4 min-w-0">
              <GripVertical
                class="drag-handle text-gray-600 size-5 cursor-grab shrink-0"
                @click.stop
              />
              <div class="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-lg shrink-0">
                <component :is="iconComponent(award.icon)" class="size-4" />
              </div>
              <div class="min-w-0">
                <p class="font-semibold truncate">{{ award.title }}</p>
                <p class="text-sm text-gray-400 truncate">{{ award.date }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 shrink-0">
              <button
                @click="handleDelete(award, $event)"
                :disabled="deletingId === award.id"
                class="flex items-center justify-center size-7 rounded-full bg-gray-700 hover:bg-red-600 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                title="Delete award"
              >
                <Trash class="size-3" />
              </button>
              <ChevronUp v-if="expandedId === award.id" class="size-4 text-gray-400" />
              <ChevronDown v-else class="size-4 text-gray-400" />
            </div>
          </button>

          <div v-if="expandedId === award.id" class="border-t border-white/10">
            <AwardEditorCard
              :award="award"
              @saved="expandedId = null"
              @cancel="expandedId = null"
            />
          </div>
        </Card>
      </template>
    </Draggable>

    <Card v-if="expandedId === 'new'" class="overflow-hidden">
      <div class="px-5 py-4 border-b border-white/10">
        <p class="font-semibold">New Award</p>
      </div>
      <AwardEditorCard
        :award="blankAward()"
        :is-new="true"
        @saved="expandedId = null"
        @cancel="expandedId = null"
      />
    </Card>

    <button
      v-if="expandedId !== 'new'"
      @click="expandedId = 'new'"
      class="flex gap-3 items-center p-4 rounded-lg bg-gray-800 border-2 border-dashed border-gray-600 hover:border-blue-500 transition-colors text-gray-400 cursor-pointer"
    >
      <Plus class="size-5" />
      <span class="font-medium">Add new award</span>
    </button>
  </div>
</template>
