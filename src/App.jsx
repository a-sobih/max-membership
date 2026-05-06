// App.jsx
import { RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import router from "./routes/router.jsx";
import { Toaster } from "react-hot-toast";
import { authStorage } from "./services/auth.storage.js";
import Spinner from "./components/ui/Spinner.jsx";

export default function App() {
  const { i18n } = useTranslation();
  const [appReady, setAppReady] = useState(false);
  // const {t} = useTranslation("auth") // لازم تحدد لو مقسمين ملفات الترجمة

  // change dir with language at the same time.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);

      const token = params.get("token");
      const lang = params.get("lang");

      const normalizedToken = (token || "").trim();

      if (
        normalizedToken &&
        normalizedToken !== "null" &&
        normalizedToken !== "undefined"
      ) {
        authStorage.set(normalizedToken);
      }

      if (lang) {
        i18n.changeLanguage(lang);
        localStorage.setItem("lang", lang);
      }

      if (token) {
        params.delete("token");
        const nextQuery = params.toString();
        const nextUrl = `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""
          }`;
        window.history.replaceState({}, document.title, nextUrl);
      }
    } catch (e) {
      console.error("App init error:", e);
    } finally {
      setAppReady(true); // 🔥 لازم تبقى هنا
    }
  }, []);

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
  }, [i18n.language]);

  if (!appReady) {
    return <Spinner />;
  }

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  )
}
