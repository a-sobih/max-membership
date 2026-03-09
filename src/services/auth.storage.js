import Cookies from "js-cookie";

const STORAGE_TYPE = import.meta.env.VITE_AUTH_STORAGE || "cookie";
// "cookie" | "localStorage"

const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN_KEY || "token";

export const authStorage = {
  get() {
    return STORAGE_TYPE === "cookie"
      ? Cookies.get(TOKEN_KEY)
      : localStorage.getItem(TOKEN_KEY);
  },

  set(token) {
    if (!token) return;
    STORAGE_TYPE === "cookie"
      ? Cookies.set(TOKEN_KEY, token)
      : localStorage.setItem(TOKEN_KEY, token);
  },

  remove() {
    STORAGE_TYPE === "cookie"
      ? Cookies.remove(TOKEN_KEY)
      : localStorage.removeItem(TOKEN_KEY);
  },
};
