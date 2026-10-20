import { getSpeechLang, t } from "./translations.js";
import { isSkipped } from "./features.js";
import { showLoader } from "./ui.js";

function normalizeVoiceLang(lang) {
  return String(lang || "")
    .toLowerCase()
    .replace(/_/g, "-");
}

function getVoices() {
  if (!window.speechSynthesis?.getVoices) return [];
  try {
    return window.speechSynthesis.getVoices() || [];
  } catch {
    return [];
  }
}

function findVoice(locale) {
  const target = normalizeVoiceLang(getSpeechLang(locale));
  const prefix = target.split("-")[0];
  const voices = getVoices();

  return (
    voices.find((voice) => normalizeVoiceLang(voice.lang) === target) ||
    voices.find(
      (voice) => normalizeVoiceLang(voice.lang).split("-")[0] === prefix,
    ) ||
    null
  );
}

function whenVoiceReady(locale) {
  if (!window.speechSynthesis) return Promise.resolve(null);
  const existing = findVoice(locale);
  if (existing) return Promise.resolve(existing);

  return new Promise((resolve) => {
    let settled = false;
    const finish = (voice) => {
      if (settled) return;
      settled = true;
      window.speechSynthesis.removeEventListener(
        "voiceschanged",
        onVoicesChanged,
      );
      resolve(voice || null);
    };
    const onVoicesChanged = () => {
      const voice = findVoice(locale);
      if (voice) finish(voice);
    };
    window.speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);
    window.setTimeout(() => finish(findVoice(locale)), 1500);
  });
}

function chunkText(text) {
  const sentences = text
    .split(/([.!?؟]+[\s\n]+|$)/)
    .map((part) => part.trim())
    .filter((part) => part && !/^[.!?,;:؟\s]+$/.test(part));

  const chunks = [];
  let current = "";
  sentences.forEach((sentence) => {
    if (`${current} ${sentence}`.trim().length <= 200) {
      current = `${current} ${sentence}`.trim();
      return;
    }
    if (current) chunks.push(current);
    if (sentence.length <= 200) {
      current = sentence;
      return;
    }
    current = "";
    let piece = "";
    sentence.split(/\s+/).forEach((word) => {
      if (`${piece} ${word}`.trim().length <= 200) {
        piece = `${piece} ${word}`.trim();
      } else {
        if (piece) chunks.push(piece);
        piece = word;
      }
    });
    current = piece;
  });
  if (current) chunks.push(current);
  return chunks;
}

function isHidden(element) {
  if (!element || element.nodeType !== 1) return true;
  if (isSkipped(element)) return true;
  if (element.closest("[hidden], [aria-hidden='true']")) return true;
  const tag = element.tagName;
  if (/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|SVG|CANVAS|HEAD)$/.test(tag))
    return true;
  const style = getComputedStyle(element);
  return style.display === "none" || style.visibility === "hidden";
}

export function extractUniqueDocumentText() {
  const parts = [];
  const seen = new Set();

  const push = (value) => {
    const text = String(value || "")
      .replace(/\s+/g, " ")
      .trim();
    if (!text || text.length < 2) return;
    if (/^(var|let|const|function)\b/i.test(text)) return;
    if (/^https?:\/\//i.test(text)) return;
    const key = text.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    parts.push(text);
  };

  const walk = (element) => {
    if (isHidden(element)) return;
    if (element.tagName === "IMG") {
      push(element.getAttribute("alt"));
      return;
    }
    element.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) push(child.nodeValue);
      else if (child.nodeType === Node.ELEMENT_NODE) walk(child);
    });
  };

  if (document.body) walk(document.body);
  return parts.join("\n");
}

export function createReadingAssistance(getLocale, translate) {
  let stopRequested = false;

  function stopReading() {
    stopRequested = true;
    window.a11yWidget && (window.a11yWidget.isReading = false);
    window.speechSynthesis?.cancel();
  }

  function readText(text, button) {
    if (!text) return;

    if (!window.speechSynthesis) {
      alert(translate("speechUnsupported"));
      return;
    }

    stopRequested = false;
    window.speechSynthesis.cancel();

    const chunks = chunkText(text);
    let index = 0;
    const readingLocale = getLocale();
    const speechLang = getSpeechLang(readingLocale);

    window.a11yWidget = window.a11yWidget || {};
    window.a11yWidget.isReading = true;

    const speakNext = () => {
      if (stopRequested || index >= chunks.length) {
        window.a11yWidget.isReading = false;
        button?.dispatchEvent(new CustomEvent("a11y-reading-finished"));

        if (button?.classList.contains("read-button")) {
          button.textContent = t("readSummary", getLocale());
        }
        return;
      }

      const utterance = new SpeechSynthesisUtterance(chunks[index]);
      utterance.lang = getSpeechLang(readingLocale);

      const voice = findVoice(readingLocale);
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang;
      }

      utterance.onend = () => {
        index += 1;
        speakNext();
      };

      utterance.onerror = (event) => {
        if (event.error === "interrupted" || event.error === "canceled") {
          return;
        }

        index += 1;
        speakNext();
      };

      window.speechSynthesis.speak(utterance);
    };

    whenVoiceReady(readingLocale).then(() => {
      if (!stopRequested) speakNext();
    });
  }

  if (window.speechSynthesis) {
    window.speechSynthesis.addEventListener("voiceschanged", () => getVoices());
    getVoices();
  }

  return { readText, stopReading, extractUniqueDocumentText };
}
