<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

const username = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

async function submit() {
  error.value = "";
  loading.value = true;
  try {
    const err = await auth.login(username.value, password.value);
    if (err) {
      error.value = err;
    } else {
      router.push("/admin");
    }
  } catch {
    error.value = "Could not reach the server.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <form
      class="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur"
      @submit.prevent="submit"
    >
      <h1 class="mb-2 text-2xl font-semibold">Admin Login</h1>

      <div class="flex flex-col gap-1">
        <label class="text-sm text-white/60" for="username">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          autocomplete="username"
          required
          class="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-400"
        />
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm text-white/60" for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          autocomplete="current-password"
          required
          class="rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white outline-none focus:border-blue-400"
        />
      </div>

      <p v-if="error" class="text-sm text-red-400">{{ error }}</p>

      <button
        type="submit"
        :disabled="loading"
        class="mt-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-500 disabled:opacity-50"
      >
        {{ loading ? "Signing in…" : "Sign in" }}
      </button>
    </form>
  </div>
</template>
