import i18n from "@/i18n"
import { SaveLangToStorage } from "@/Storage/StorageMng";
import axios from "axios"




export function ChangeAppLanguageUseCase(lang: 'ar' | 'en') {

    i18n.global.locale.value = lang;
    axios.post(route('change-lang'), { locale: i18n.global.locale.value }).then(() => {
        SaveLangToStorage(lang);
        location.reload()
    })
}
export function GetAppLanguage(): 'ar' | 'en' {
    return i18n.global.locale.value

}
