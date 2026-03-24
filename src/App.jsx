import { RouterProvider } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import router from "./routes/router.jsx";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { i18n } = useTranslation();
  // const {t} = useTranslation("auth") // لازم تحدد لو مقسمين ملفات الترجمة

  // change dir with language at the same time.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const token = params.get("token");
    const lang = params.get("lang");

    if (token) {
      localStorage.setItem("token", token);
    }

    if (lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("lang", lang);
    }
    // حذف التوكن من الرابط بعد التخزين 
    window.history.replaceState({}, document.title, window.location.pathname);

  }, []);

  useEffect(() => {
    const dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.dir = dir;
  }, [i18n.language]);

  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  )
}
