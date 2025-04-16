import { createI18n } from "vue-i18n";
import enLocalization from "./Localizations/en.json";
import arLocalization from "./Localizations/ar.json";
import { GetLangFromStorage } from "./Storage/StorageMng";

const messages = {
    en: enLocalization,
    ar: arLocalization,
};
const savedLocale = GetLangFromStorage();


const i18n = createI18n({
    legacy: false,
    locale: savedLocale, // set default locale
    messages, // set locale messages
});

export default i18n;
