<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  project: { type: Object, default: null },
});

const emit = defineEmits(["close"]);

const open = computed(() => !!props.project);
const projectKey = computed(() => props.project?.title ?? "modal");

const featuresRef = ref<HTMLElement | null>(null);

watch(open, async (val) => {
  if (val) {
    document.body.style.overflow = "hidden";
    await nextTick();
  } else {
    document.body.style.overflow = "";
  }
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <transition name="fade" appear>
      <div
        v-show="open"
        class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm sm:items-center sm:overflow-hidden sm:p-6"
        @click.self="emit('close')"
      >
        <transition name="scale" appear>
          <!-- Modal wrapper -->
          <div
            v-if="open"
            :key="projectKey"
            class="relative max-h-screen w-full max-w-2xl overflow-y-auto rounded-2xl border border-gray-800 bg-gray-900/95 shadow-2xl sm:flex sm:max-h-[90vh] sm:flex-col sm:overflow-hidden"
          >
            <!-- Close button -->
            <button
              @click="emit('close')"
              class="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              ✕
            </button>

            <!-- Image -->
            <div class="p-4 sm:p-6">
              <div class="mb-3 flex justify-center">
                <div
                  class="aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-gray-800 shadow-md sm:w-3/4"
                >
                  <img
                    :src="project?.image"
                    :alt="project?.title"
                    class="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <!-- Scrollable body -->
            <div
              ref="featuresRef"
              class="px-4 pb-4 sm:flex-1 sm:overflow-y-auto sm:px-6 sm:pb-6"
            >
              <!-- Intro -->
              <p
                v-if="project?.details?.intro"
                class="mb-4 leading-relaxed text-gray-400 sm:mb-5"
                v-html="project.details.intro"
              ></p>

              <!-- Features -->
              <div v-if="project?.details?.features" class="mb-4 sm:mb-6">
                <h4 class="mb-2 text-lg font-semibold text-white sm:text-xl">
                  Key Features
                </h4>
                <ul class="list-inside list-disc space-y-2 text-gray-400">
                  <li v-for="(feature, i) in project.details.features" :key="i">
                    <span class="text-white">{{ feature.title }}:</span>
                    {{ feature.description }}
                  </li>
                </ul>
              </div>

              <!-- Conclusion -->
              <p
                v-if="project?.details?.conclusion"
                class="mb-3 leading-relaxed text-gray-400 sm:mb-4"
              >
                {{ project.details.conclusion }}
              </p>

              <!-- Tech stack -->
              <div v-if="project?.tech" class="mb-4">
                <h4 class="mb-2 text-lg font-semibold text-white sm:text-xl">
                  Tech Stack
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="(t, i) in project.tech"
                    :key="i"
                    class="rounded-lg bg-gray-800 px-3 py-1 text-sm font-medium text-gray-300 shadow"
                  >
                    {{ t }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div
              v-if="project?.docs || project?.code"
              class="border-t border-gray-800 px-4 py-3 sm:px-6"
            >
              <div class="flex flex-wrap gap-3">
                <a
                  v-if="project?.code && project.code !== '_blank'"
                  :href="project.code"
                  target="_blank"
                  class="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:bg-blue-500"
                >
                  Source Code
                </a>
                <RouterLink
                  v-if="project?.docs"
                  :to="project.docs"
                  class="rounded-xl bg-gray-700 px-5 py-2.5 text-sm font-medium text-white shadow transition hover:bg-gray-600"
                >
                  Documentation
                </RouterLink>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
/* Overlay fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modal scale + fade */
.scale-enter-active,
.scale-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.scale-enter-from,
.scale-leave-to {
  transform: scale(0.96);
  opacity: 0;
}

/* Scrollbar styles */
::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
::-webkit-scrollbar-track {
  background: transparent;
}
</style>
