<script setup lang="ts">
import { ref } from "vue";
import { Upload } from "lucide-vue-next";
import { toast } from "vue-sonner";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth";
import { apiUrl } from "@/composables/useGcsUpload";

const auth = useAuthStore();
const uploading = ref(false);
const file = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

const handleFileChange = (e: Event) => {
  file.value = (e.target as HTMLInputElement).files?.[0] ?? null;
};

const upload = async () => {
  if (!file.value) return;
  uploading.value = true;
  try {
    const urlRes = await fetch(`${apiUrl}/resume/upload-url`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    if (!urlRes.ok) throw new Error("Failed to get upload URL");
    const { signedUrl } = await urlRes.json();

    const uploadRes = await fetch(signedUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/pdf" },
      body: file.value,
    });
    if (!uploadRes.ok) throw new Error("Upload failed");

    toast.success("Resume uploaded successfully.");
    file.value = null;
    if (fileInput.value) fileInput.value.value = "";
  } catch (err) {
    toast.error(err instanceof Error ? err.message : "Upload failed");
  } finally {
    uploading.value = false;
  }
};
</script>

<template>
  <Card class="flex flex-col gap-4 p-5 mb-8">
    <p class="text-sm text-gray-400">
      Upload a PDF to replace <span class="text-white font-mono text-xs">brady-shea-resume.pdf</span> in GCS.
    </p>
    <div class="flex items-center gap-4">
      <label
        class="flex gap-2 items-center px-3 py-2 rounded-lg border border-gray-600 bg-gray-800 text-sm text-gray-400 cursor-pointer hover:border-blue-500 transition-colors"
        :class="{ 'opacity-50 cursor-not-allowed': uploading }"
      >
        <Upload class="size-4" />
        <span>{{ file ? file.name : "Choose PDF" }}</span>
        <input
          ref="fileInput"
          type="file"
          accept="application/pdf"
          class="hidden"
          :disabled="uploading"
          @change="handleFileChange"
        />
      </label>
      <button
        :disabled="!file || uploading"
        @click="upload"
        class="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors font-medium text-sm"
      >
        {{ uploading ? "Uploading…" : "Upload" }}
      </button>
    </div>
  </Card>
</template>
