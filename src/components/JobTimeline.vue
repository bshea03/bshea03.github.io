<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import { type Job } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import ExperienceCard from "./experience-page/components/ExperienceCard.vue";

const props = defineProps<{
  jobs: Job[];
}>();

const scrollContainer = ref<HTMLDivElement | null>(null);
const progress = ref(0);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);
const activeIndex = ref(0);
const maxCardHeight = ref<number | null>(null);

function scrollToCard(index: number, behavior: ScrollBehavior = "smooth") {
  if (!props.jobs.length) return;
  const container = scrollContainer.value;
  if (!container) return;
  const children = Array.from(
    container.querySelectorAll("[data-card]")
  ) as HTMLElement[];
  if (!children[index]) return;

  const containerCenter = container.clientWidth / 2;
  const cardCenter =
    children[index].offsetLeft + children[index].offsetWidth / 2;
  container.scrollTo({
    left: cardCenter - containerCenter,
    behavior,
  });

  activeIndex.value = index;
}

function scrollLeft() {
  if (activeIndex.value > 0) {
    scrollToCard(activeIndex.value - 1);
  }
}

function scrollRight() {
  if (activeIndex.value < props.jobs.length - 1) {
    scrollToCard(activeIndex.value + 1);
  }
}

function updateScroll() {
  if (!scrollContainer.value || props.jobs.length === 0) {
    progress.value = 0;
    activeIndex.value = 0;
    canScrollLeft.value = false;
    canScrollRight.value = false;
    return;
  }

  const container = scrollContainer.value;
  const children = Array.from(
    container.querySelectorAll("[data-card]")
  ) as HTMLElement[];
  if (children.length === 0) return;

  // find closest to center
  const center = container.scrollLeft + container.clientWidth / 2;
  let closestIndex = 0;
  let closestDistance = Infinity;
  children.forEach((child, i) => {
    const cardCenter = child.offsetLeft + child.offsetWidth / 2;
    const distance = Math.abs(center - cardCenter);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = i;
    }
  });
  activeIndex.value = closestIndex;

  // progress = between first and last job
  const first = children[0];
  const last = children[children.length - 1];
  const maxScroll = last.offsetLeft - first.offsetLeft || 1;
  progress.value =
    (children[closestIndex].offsetLeft - first.offsetLeft) / maxScroll;

  canScrollLeft.value = activeIndex.value > 0;
  canScrollRight.value = activeIndex.value < props.jobs.length - 1;
}

function updateContainerHeight() {
  if (!scrollContainer.value) return;
  const cards =
    scrollContainer.value.querySelectorAll<HTMLElement>("[data-card]");
  let tallest = 0;
  cards.forEach((card) => {
    tallest = Math.max(tallest, card.offsetHeight);
  });
  maxCardHeight.value = tallest + 40;
}

onMounted(async () => {
  scrollContainer.value?.addEventListener("scroll", updateScroll);
  updateScroll();

  // ✅ Force initial center after DOM is painted
  await nextTick();
  scrollToCard(0, "auto");

  // measure height
  updateContainerHeight();
  window.addEventListener("resize", updateContainerHeight);
});

onBeforeUnmount(() => {
  scrollContainer.value?.removeEventListener("scroll", updateScroll);
  window.removeEventListener("resize", updateContainerHeight);
});

watch(
  () => props.jobs,
  async () => {
    await nextTick();
    updateContainerHeight();
  }
);
</script>

<template>
  <section class="relative w-full">
    <!-- Scroll Buttons -->
    <button
      v-if="canScrollLeft"
      name="Scroll left"
      @click="scrollLeft"
      class="absolute top-1/2 left-2 z-20 -translate-y-1/2 rounded-full bg-gray-900/70 p-3 shadow-lg transition hover:bg-gray-800"
    >
      <ChevronLeft class="h-6 w-6 text-white" />
    </button>

    <button
      v-if="canScrollRight"
      name="Scroll right"
      @click="scrollRight"
      class="absolute top-1/2 right-2 z-20 -translate-y-1/2 rounded-full bg-gray-900/70 p-3 shadow-lg transition hover:bg-gray-800"
    >
      <ChevronRight class="h-6 w-6 text-white" />
    </button>

    <!-- Timeline Wrapper -->
    <div
      ref="scrollContainer"
      class="scrollbar-thin scrollbar-thumb-gray-600 dark:scrollbar-track-gray-900 hover:scrollbar-thumb-gray-300 dark:hover:scrollbar-thumb-gray-500 flex snap-x snap-mandatory items-center gap-6 overflow-x-scroll overflow-y-visible px-6 transition-[height] duration-300"
      :style="{ height: maxCardHeight ? `${maxCardHeight + 40}px` : 'auto' }"
    >
      <!-- Left spacer -->
      <div
        class="w-[5%] shrink-0 sm:w-[10%] lg:w-[15%]"
        aria-hidden="true"
      ></div>

      <!-- Job cards -->
      <div
        v-for="(job, index) in jobs"
        :key="job.company"
        data-card
        class="w-[90%] shrink-0 snap-center transition-transform duration-300 sm:w-[75%] lg:w-[60%]"
        :class="
          index === activeIndex ? 'z-10 scale-105' : 'scale-95 opacity-80'
        "
      >
        <ExperienceCard :job="job" class="h-auto" />
      </div>

      <!-- Right spacer -->
      <div
        class="w-[5%] shrink-0 sm:w-[10%] lg:w-[15%]"
        aria-hidden="true"
      ></div>
    </div>

    <!-- Progress dots -->
    <div
      v-if="jobs.length > 0"
      class="mt-4 flex items-end justify-center gap-2"
    >
      <button
        v-for="(job, index) in jobs"
        :key="index"
        :name="'Job slide #' + index"
        @click="scrollToCard(index)"
        class="h-3 w-3 rounded-full transition-all duration-300 focus:outline-none"
        :class="
          index === activeIndex
            ? 'scale-110 bg-indigo-500'
            : 'bg-gray-600/50 hover:bg-gray-400/70'
        "
      ></button>
    </div>
  </section>
</template>
