import axios from "axios";
import api from "./api";
import { authStorage } from "./auth.storage";

const API_URL = import.meta.env.VITE_API_URL;

export async function refreshToken(originalRequest) {
  try {
    const res = await axios.post(
      `${API_URL}/auth/refresh`,
      {},
      { withCredentials: true },
    );

    const newToken = res.data?.accessToken;
    if (!newToken) throw new Error("No token");

    authStorage.set(newToken);
    originalRequest.headers.Authorization = `Bearer ${newToken}`;

    return api(originalRequest);
  } catch (err) {
    authStorage.remove();
    return Promise.reject(err);
  }
}
