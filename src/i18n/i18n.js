//i18n/i18n.js
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend"; // if we load translation files from backend
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .on("languageChanged", (lng) => {
    const dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lng);
  })
  .init({
    // lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "ar", // Default Lng:  لو استعملت لغة مش موجوده
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
      ],
      lookupQuerystring: "lang",
      caches: ["cookie"],
    },

    // comment here if we use more than one file for translations like (common.json, auth.json, dashboard.json, errors.json):
    // ns: ["common"], // namespaces اللي تتحمل بالبداية
    // defaultNS: "common",

    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
      // هنستخدم ده لو مقسمين ملفات الترجمه لاكتر من ملف
      // loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });


export default i18n;
