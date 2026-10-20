import { getLocale, isRtl, normalizeLocale, t } from "./translations.js";
import {
  applyLabels,
  mountAccessibilityUI,
  setReadingState,
  setWidgetLocale,
  showOverlay,
} from "./ui.js";
import { createAccessibilityFeatures } from "./features.js";
import { createReadingAssistance } from "./reading.js";

if (window.__a11yWidgetInitialized) {
  window.a11yWidget?.setLocale?.(getLocale());
} else {
  window.__a11yWidgetInitialized = true;
  initAccessibilityWidget();
}

function initAccessibilityWidget() {
  const translate = (key) => t(key, getLocale());
  const locale = getLocale();
  const { widget, openWidget } = mountAccessibilityUI(
    translate,
    locale,
    isRtl(locale),
  );
  const features = createAccessibilityFeatures(translate);
  const reading = createReadingAssistance(getLocale, translate);

  const finishReading = () => setReadingState(false, translate);

  const checkImages = () => {
    const missing = [];
    document.querySelectorAll("img").forEach((image, index) => {
      if (!image.getAttribute("alt")?.trim()) {
        const src = image.currentSrc || image.src || "unknown";
        missing.push(
          `Image ${index + 1}: ${src.length > 50 ? `${src.slice(0, 50)}...` : src}`,
        );
      }
    });
    alert(
      missing.length
        ? `${translate("imagesMissing")}${missing.join("\n")}`
        : translate("imagesOk"),
    );
  };

  const handlers = {
    "increase-text": () => features.adjustFontSize(1),
    "decrease-text": () => features.adjustFontSize(-1),
    "line-height": () => features.adjustLineHeight(),
    "letter-spacing": () => features.adjustLetterSpacing(),
    "dyslexic-font": () => features.enableDyslexicFont(),
    "invert-colors": () => features.toggleInvertColors(),
    "high-contrast": () => features.adjustContrast(),
    "increase-saturation": () => features.adjustSaturation("increase"),
    "decrease-saturation": () => features.adjustSaturation("decrease"),
    "highlight-links": () => features.enableHighlightLinks(),
    "big-cursor": () => features.enableBigCursor(),
    "hide-images": () => features.toggleHideImages(),
    "check-images": checkImages,
    "toggle-reading": () => {
      const button = document.getElementById("toggle-reading");
      if (window.speechSynthesis?.speaking || window.a11yWidget?.isReading) {
        reading.stopReading();
        finishReading();
        return;
      }
      setReadingState(true, translate);
      reading.readText(reading.extractUniqueDocumentText(), button);
    },
    "reset-all-settings": () => {
      features.resetAllSettings(() => {
        reading.stopReading();
        finishReading();
      });
    },
  };

  Object.entries(handlers).forEach(([id, handler]) => {
    document.getElementById(id)?.addEventListener("click", handler);
  });

  document
    .getElementById("toggle-reading")
    ?.addEventListener("a11y-reading-finished", finishReading);

  const setLocale = (nextLocale) => {
    window.__a11yLocale = normalizeLocale(nextLocale);
    const current = getLocale();
    setWidgetLocale(current, isRtl(current));
    applyLabels(translate);
  };

  window.a11yWidget = {
    isReading: false,
    setLocale,
    stopSpeaking: () => {
      reading.stopReading();
      finishReading();
    },
  };

  setLocale(locale);

  const languageObserver = new MutationObserver(() => {
    setLocale(document.documentElement.lang);
  });
  languageObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang", "dir"],
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) window.a11yWidget.stopSpeaking();
  });

  widget.dataset.ready = "true";
}
