import i18n from "@/i18n";

export function translate(message) {
    const translatedText = i18n.global.t(message); // Access the global `t` function
    
    return translatedText;
}
