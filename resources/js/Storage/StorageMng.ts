

export function SaveLangToStorage(lang: 'ar' | 'en') {
    localStorage.setItem("locale", lang)

}
export function GetLangFromStorage(): 'ar' | 'en' {
    const savedLocale = localStorage.getItem("locale") || "en";
    // Validate value
    if (savedLocale === 'ar' || savedLocale === 'en') {
        return savedLocale;
    }

    return 'en'; // fallback

}