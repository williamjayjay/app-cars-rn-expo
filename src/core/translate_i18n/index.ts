import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import translationEn from "./locales/enUS.json";
import translationPt from "./locales/ptBR.json";

const resources = {
  "pt-BR": { translation: translationPt },
  "en-US": { translation: translationEn },
};

export const initI18n = async () => {
  let savedLanguage = await AsyncStorage.getItem("language");

  if (!savedLanguage) {
    const locales = Localization.getLocales(); 
    if (locales && locales.length > 0) {
      savedLanguage = locales[0].languageTag; 
    } else {
      savedLanguage = "pt-BR"; 
    }
  }

  await i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources,
    lng: savedLanguage,
    fallbackLng: "pt-BR",
    interpolation: {
      escapeValue: false,
    },
  });
};

export default i18n;
