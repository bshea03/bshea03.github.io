import { useAuthStore } from "@/stores/auth";

const api = import.meta.env.VITE_API_URL || "http://localhost:8080/";
export const apiUrl = `${api}v1`;

export function useGcsUpload() {
  const auth = useAuthStore();

  const uploadToGcs = async (uploadUrlPath: string, file: File): Promise<string> => {
    const urlRes = await fetch(
      `${apiUrl}/${uploadUrlPath}?contentType=${encodeURIComponent(file.type)}`,
      { headers: { Authorization: `Bearer ${auth.token}` } },
    );
    if (!urlRes.ok) throw new Error("Failed to get upload URL");
    const { signedUrl, publicUrl } = await urlRes.json();

    const uploadRes = await fetch(signedUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    });
    if (!uploadRes.ok) throw new Error("Upload failed");

    return publicUrl;
  };

  return { uploadToGcs };
}
