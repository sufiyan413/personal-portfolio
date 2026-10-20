const LOCALES = ["en", "es", "fr", "de", "ar"];

const SPEECH_LANG = {
  en: "en-US",
  es: "es-ES",
  fr: "fr-FR",
  de: "de-DE",
  ar: "ar-SA",
};

const MESSAGES = {
  en: {
    openOptions: "Open accessibility options",
    title: "Accessibility Options",
    increaseText: "Increase Text",
    decreaseText: "Decrease Text",
    lineHeight: "Line Height",
    letterSpacing: "Letter Spacing",
    dyslexicFont: "Dyslexic Font",
    invertColors: "Invert Colors",
    highContrast: "High Contrast",
    increaseSaturation: "Increase Saturation",
    decreaseSaturation: "Decrease Saturation",
    readScreen: "Read Screen",
    stopReading: "Stop Reading",
    summarize: "Summarize",
    checkImages: "Check Images",
    highlightLinks: "Highlight Links",
    bigCursor: "Big Cursor",
    toggleImages: "Toggle Images",
    reset: "Reset All Settings",
    close: "Close",
    readSummary: "Read Summary",
    resetConfirm:
      "Reset all accessibility settings? This clears every change made with this widget.",
    resetDone: "Accessibility settings were reset.",
    imagesOk: "All images have alt text.",
    imagesMissing:
      "Accessibility issue:\nThese images are missing alt text:\n\n",
    speechUnsupported: "Speech synthesis is not supported in this browser.",
    speechFailed: "Speech synthesis failed. Please try again.",
    summaryFailed: "The summary could not be created.",
    summaryEmpty: "There is no text to summarize.",
  },
  es: {
    openOptions: "Abrir opciones de accesibilidad",
    title: "Opciones de accesibilidad",
    increaseText: "Aumentar texto",
    decreaseText: "Reducir texto",
    lineHeight: "Interlineado",
    letterSpacing: "Espaciado",
    dyslexicFont: "Fuente para dislexia",
    invertColors: "Invertir colores",
    highContrast: "Alto contraste",
    increaseSaturation: "Aumentar saturación",
    decreaseSaturation: "Reducir saturación",
    readScreen: "Leer pantalla",
    stopReading: "Detener lectura",
    summarize: "Resumir",
    checkImages: "Revisar imágenes",
    highlightLinks: "Resaltar enlaces",
    bigCursor: "Cursor grande",
    toggleImages: "Alternar imágenes",
    reset: "Restablecer ajustes",
    close: "Cerrar",
    readSummary: "Leer resumen",
    resetConfirm:
      "¿Restablecer todos los ajustes de accesibilidad? Se desharán los cambios de este widget.",
    resetDone: "Los ajustes de accesibilidad se restablecieron.",
    imagesOk: "Todas las imágenes tienen un texto alternativo.",
    imagesMissing:
      "Problema de accesibilidad:\nEstas imágenes no tienen texto alternativo:\n\n",
    speechUnsupported: "Este navegador no admite síntesis de voz.",
    speechFailed: "No se pudo leer el texto. Inténtalo de nuevo.",
    summaryFailed: "No se pudo crear el resumen.",
    summaryEmpty: "No hay texto para resumir.",
  },
  fr: {
    openOptions: "Ouvrir les options d'accessibilité",
    title: "Options d'accessibilité",
    increaseText: "Agrandir le texte",
    decreaseText: "Réduire le texte",
    lineHeight: "Interligne",
    letterSpacing: "Espacement",
    dyslexicFont: "Police dyslexie",
    invertColors: "Inverser les couleurs",
    highContrast: "Contraste élevé",
    increaseSaturation: "Augmenter la saturation",
    decreaseSaturation: "Réduire la saturation",
    readScreen: "Lire l'écran",
    stopReading: "Arrêter la lecture",
    summarize: "Résumer",
    checkImages: "Vérifier les images",
    highlightLinks: "Surligner les liens",
    bigCursor: "Grand curseur",
    toggleImages: "Afficher les images",
    reset: "Réinitialiser",
    close: "Fermer",
    readSummary: "Lire le résumé",
    resetConfirm:
      "Réinitialiser tous les réglages d'accessibilité ? Cette action annule les modifications de ce widget.",
    resetDone: "Les réglages d'accessibilité ont été réinitialisés.",
    imagesOk: "Toutes les images ont un texte alternatif.",
    imagesMissing:
      "Problème d'accessibilité :\nCes images n'ont pas de texte alternatif :\n\n",
    speechUnsupported:
      "La synthèse vocale n'est pas prise en charge par ce navigateur.",
    speechFailed: "La lecture a échoué. Veuillez réessayer.",
    summaryFailed: "Impossible de créer le résumé.",
    summaryEmpty: "Aucun texte à résumer.",
  },
  de: {
    openOptions: "Barrierefreiheitsoptionen öffnen",
    title: "Barrierefreiheitsoptionen",
    increaseText: "Text vergrößern",
    decreaseText: "Text verkleinern",
    lineHeight: "Zeilenhöhe",
    letterSpacing: "Zeichenabstand",
    dyslexicFont: "Dyslexie-Schrift",
    invertColors: "Farben invertieren",
    highContrast: "Hoher Kontrast",
    increaseSaturation: "Sättigung erhöhen",
    decreaseSaturation: "Sättigung verringern",
    readScreen: "Bildschirm vorlesen",
    stopReading: "Vorlesen stoppen",
    summarize: "Zusammenfassen",
    checkImages: "Bilder prüfen",
    highlightLinks: "Links hervorheben",
    bigCursor: "Großer Zeiger",
    toggleImages: "Bilder umschalten",
    reset: "Einstellungen zurücksetzen",
    close: "Schließen",
    readSummary: "Zusammenfassung vorlesen",
    resetConfirm:
      "Alle Barrierefreiheitseinstellungen zurücksetzen? Dadurch werden die Änderungen dieses Widgets aufgehoben.",
    resetDone: "Die Barrierefreiheitseinstellungen wurden zurückgesetzt.",
    imagesOk: "Alle Bilder haben einen Alternativtext.",
    imagesMissing:
      "Barrierefreiheitsproblem:\nDiesen Bildern fehlt ein Alternativtext:\n\n",
    speechUnsupported:
      "Sprachausgabe wird von diesem Browser nicht unterstützt.",
    speechFailed: "Vorlesen fehlgeschlagen. Bitte erneut versuchen.",
    summaryFailed: "Die Zusammenfassung konnte nicht erstellt werden.",
    summaryEmpty: "Kein Text zum Zusammenfassen.",
  },
  ar: {
    openOptions: "فتح خيارات إمكانية الوصول",
    title: "خيارات إمكانية الوصول",
    increaseText: "تكبير النص",
    decreaseText: "تصغير النص",
    lineHeight: "ارتفاع السطر",
    letterSpacing: "تباعد الأحرف",
    dyslexicFont: "خط عسر القراءة",
    invertColors: "عكس الألوان",
    highContrast: "تباين عالٍ",
    increaseSaturation: "زيادة التشبع",
    decreaseSaturation: "تقليل التشبع",
    readScreen: "قراءة الشاشة",
    stopReading: "إيقاف القراءة",
    summarize: "تلخيص",
    checkImages: "فحص الصور",
    highlightLinks: "تمييز الروابط",
    bigCursor: "مؤشر كبير",
    toggleImages: "تبديل الصور",
    reset: "إعادة ضبط الإعدادات",
    close: "إغلاق",
    readSummary: "قراءة الملخص",
    resetConfirm:
      "هل تريد إعادة ضبط جميع إعدادات إمكانية الوصول؟ سيؤدي ذلك إلى إلغاء تغييرات هذه الأداة.",
    resetDone: "تمت إعادة ضبط إعدادات إمكانية الوصول.",
    imagesOk: "كل الصور تحتوي على نص بديل.",
    imagesMissing: "مشكلة في إمكانية الوصول:\nالصور التالية بلا نص بديل:\n\n",
    speechUnsupported: "هذا المتصفح لا يدعم تحويل النص إلى كلام.",
    speechFailed: "تعذرت القراءة. حاول مرة أخرى.",
    summaryFailed: "تعذر إنشاء الملخص.",
    summaryEmpty: "لا يوجد نص للتلخيص.",
  },
};

export function normalizeLocale(value) {
  const code = String(value || "")
    .toLowerCase()
    .split("-")[0];
  return LOCALES.includes(code) ? code : "en";
}

export function getLocale() {
  return normalizeLocale(
    window.__a11yLocale || document.documentElement.lang || "en",
  );
}

export function isRtl(locale = getLocale()) {
  return locale === "ar" || document.documentElement.dir === "rtl";
}

export function t(key, locale = getLocale()) {
  const messages = MESSAGES[normalizeLocale(locale)] || MESSAGES.en;
  return messages[key] || MESSAGES.en[key] || key;
}

export function getSpeechLang(locale = getLocale()) {
  return SPEECH_LANG[normalizeLocale(locale)] || SPEECH_LANG.en;
}
