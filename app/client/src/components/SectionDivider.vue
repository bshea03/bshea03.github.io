<template>
  <div
    data-aos="zoom-in"
    data-aos-duration="800"
    data-aos-easing="ease-out"
    data-aos-once="true"
    class="relative z-30 mx-auto h-2 w-full max-w-full origin-center"
  >
    <!-- Gradient line -->
    <div class="relative h-full overflow-hidden rounded-full">
      <!-- Core gradient -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>

      <!-- Fade left -->
      <div
        class="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-black to-transparent opacity-40"
      ></div>

      <!-- Fade right -->
      <div
        class="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-black to-transparent opacity-40"
      ></div>
    </div>

    <!-- Glow -->
    <div
      class="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-60 blur-md"
    ></div>
  </div>
</template>
