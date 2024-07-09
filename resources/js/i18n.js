import { createI18n } from "vue-i18n";
import enLocalization from "./Localizations/en.json";
import arLocalization from "./Localizations/ar.json";

const messages = {
    en: enLocalization,
    ar: arLocalization,
};
const savedLocale = localStorage.getItem("locale") || "en";

const i18n = createI18n({
    legacy: false,
    locale: savedLocale, // set default locale
    messages, // set locale messages
});

export default i18n;
