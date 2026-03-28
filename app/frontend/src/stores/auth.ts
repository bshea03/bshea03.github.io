import { defineStore } from "pinia";
import { ref, computed } from "vue";

const TOKEN_KEY = "access_token";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY));

  function isTokenExpired(t: string): boolean {
    try {
      const payload = JSON.parse(atob(t.split(".")[1]));
      return typeof payload.exp === "number" && payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  /** Clears the token if it is expired or malformed. Returns true if valid. */
  function validateToken(): boolean {
    if (!token.value) return false;
    if (isTokenExpired(token.value)) {
      clearToken();
      return false;
    }
    return true;
  }

  const isAuthenticated = computed(() => !!token.value && !isTokenExpired(token.value));

  function setToken(t: string) {
    token.value = t;
    localStorage.setItem(TOKEN_KEY, t);
  }

  function clearToken() {
    token.value = null;
    localStorage.removeItem(TOKEN_KEY);
  }

  /** Returns null on success, or an error message string on failure. */
  async function login(username: string, password: string): Promise<string | null> {
    const res = await fetch(`${import.meta.env.VITE_API_URL}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) return "Incorrect username or password.";
    const data = await res.json();
    setToken(data.accessToken);
    return null;
  }

  return { token, isAuthenticated, login, setToken, clearToken, validateToken };
});
