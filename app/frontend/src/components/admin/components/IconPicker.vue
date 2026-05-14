<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { Input } from "@/components/ui/input";

interface DeviconEntry {
  name: string;
  altnames: string[];
  tags: string[];
  versions: { svg: string[]; font: string[] };
}

interface IconOption {
  label: string;
  className: string;
  searchText: string;
}

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();

const open = ref(false);
const search = ref("");
const triggerRef = ref<HTMLElement | null>(null);

// Module-level cache so the fetch only happens once per page load
let cachedIcons: IconOption[] | null = null;
let fetchPromise: Promise<IconOption[]> | null = null;

const icons = ref<IconOption[]>([]);
const loading = ref(false);

async function loadIcons() {
  if (cachedIcons) {
    icons.value = cachedIcons;
    return;
  }
  if (fetchPromise) {
    icons.value = await fetchPromise;
    return;
  }

  loading.value = true;
  fetchPromise = fetch(
    "https://cdn.jsdelivr.net/gh/devicons/devicon/devicon.json",
  )
    .then((res) => res.json())
    .then((data: DeviconEntry[]) => {
      const options: IconOption[] = [];
      for (const entry of data) {
        const versions = entry.versions.font ?? [];
        const unique = [...new Set(versions)].filter(
          (v) => !v.includes("wordmark"),
        );
        const searchText = [entry.name, ...entry.altnames, ...entry.tags]
          .join(" ")
          .toLowerCase();
        for (const version of unique) {
          const base = `devicon-${entry.name}-${version}`;
          options.push({ label: `${entry.name}-${version}`, className: base, searchText });
          options.push({ label: `${entry.name}-${version} colored`, className: `${base} colored`, searchText });
        }
      }
      cachedIcons = options;
      return options;
    });

  icons.value = await fetchPromise;
  loading.value = false;
}

const filtered = computed(() => {
  const q = search.value.toLowerCase().trim();
  if (!q) return icons.value.slice(0, 60);
  return icons.value
    .filter((i) => i.label.includes(q) || i.searchText.includes(q))
    .slice(0, 60);
});

function toggle() {
  open.value = !open.value;
  if (open.value && !icons.value.length) {
    loadIcons();
  }
}

function select(icon: IconOption) {
  emit("update:modelValue", icon.className);
  open.value = false;
  search.value = "";
}

function handleClickOutside(e: MouseEvent) {
  if (triggerRef.value && !triggerRef.value.contains(e.target as Node)) {
    open.value = false;
  }
}

onMounted(() => document.addEventListener("mousedown", handleClickOutside));
onUnmounted(() =>
  document.removeEventListener("mousedown", handleClickOutside),
);
</script>

<template>
  <div ref="triggerRef" class="relative">
    <button
      type="button"
      @click="toggle"
      class="flex items-center justify-center size-6 rounded border border-gray-600 hover:border-blue-500 transition-colors shrink-0"
      :title="modelValue || 'Pick an icon'"
    >
      <i v-if="modelValue" :class="modelValue + ' text-blue-400 text-sm'" />
      <span v-else class="text-gray-500 text-xs">?</span>
    </button>

    <div
      v-if="open"
      class="absolute left-0 top-8 z-50 w-72 bg-gray-900 border border-gray-700 rounded-lg shadow-xl p-2 flex flex-col gap-2"
    >
      <Input
        v-model="search"
        placeholder="Search icons..."
        class="h-7 text-xs bg-gray-800 border-gray-600"
        @click.stop
      />

      <div v-if="loading" class="text-gray-400 text-xs text-center py-4">
        Loading icons...
      </div>

      <div v-else class="grid grid-cols-6 gap-1 overflow-y-auto max-h-48">
        <button
          v-for="icon in filtered"
          :key="icon.className"
          type="button"
          @click="select(icon)"
          :title="icon.label"
          :class="[
            'flex items-center justify-center rounded p-1 text-lg transition-colors',
            modelValue === icon.className
              ? 'bg-blue-600 text-white'
              : 'hover:bg-gray-700 text-gray-300',
          ]"
        >
          <i :class="icon.className" />
        </button>

        <div
          v-if="!filtered.length"
          class="col-span-6 text-gray-500 text-xs text-center py-4"
        >
          No icons found
        </div>
      </div>
    </div>
  </div>
</template>
