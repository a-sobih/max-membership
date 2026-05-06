// src/services/api.js
import axios from "axios";
import { authStorage } from "./auth.storage";

const rawApiUrl = import.meta.env.VITE_API_URL?.trim();

if (!rawApiUrl) {
  throw new Error("VITE_API_URL is not defined");
}

let API_URL = rawApiUrl.replace(/\/+$/, "");

try {
  const parsedUrl = new URL(API_URL);
  API_URL = parsedUrl.toString().replace(/\/+$/, "");
} catch {
  throw new Error(`VITE_API_URL is invalid: ${rawApiUrl}`);
}

const INVALID_TOKENS = new Set(["null", "undefined", ""]);

function getStoredToken() {
  const token = (authStorage.get() || "").trim();
  return INVALID_TOKENS.has(token.toLowerCase()) ? "" : token;
}

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else if (config.headers?.Authorization) {
    delete config.headers.Authorization;
  }

  if (import.meta.env.DEV) {
    console.info("[api:request]", {
      url: config.url,
      baseURL: config.baseURL,
      hasToken: Boolean(token),
    });
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (import.meta.env.DEV) {
      console.warn("[api:error]", {
        status: error?.response?.status || null,
        url: error?.config?.url || null,
        message: error?.message || "Request failed",
      });
    }
    return Promise.reject(error);
  },
);
export default api;
