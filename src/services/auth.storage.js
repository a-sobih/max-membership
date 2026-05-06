import Cookies from "js-cookie";

const STORAGE_TYPE = import.meta.env.VITE_AUTH_STORAGE || "localStorage";
// "cookie" | "localStorage"

const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || "token";
const INVALID_TOKENS = new Set(["", "null", "undefined"]);

export const authStorage = {
  get() {
    const token = STORAGE_TYPE === "cookie"
      ? Cookies.get(TOKEN_KEY)
      : localStorage.getItem(TOKEN_KEY);
    const normalized = (token || "").trim();
    return INVALID_TOKENS.has(normalized.toLowerCase()) ? null : normalized;
  },

  set(token) {
    const normalized = (token || "").trim();
    if (INVALID_TOKENS.has(normalized.toLowerCase())) return;
    STORAGE_TYPE === "cookie"
      ? Cookies.set(TOKEN_KEY, normalized)
      : localStorage.setItem(TOKEN_KEY, normalized);
  },

  remove() {
    STORAGE_TYPE === "cookie"
      ? Cookies.remove(TOKEN_KEY)
      : localStorage.removeItem(TOKEN_KEY);
  },
};
