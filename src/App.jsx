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
    document.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // حذف التوكن من الرابط بعد التخزين (اختياري)
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);


  return (
    <>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </>
  )
}
