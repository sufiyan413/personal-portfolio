const THEMES = new Set([
  "dark",
  "light",
  "reading",
  "midnight",
  "obsidian",
  "sage",
]);

const SKIP_SELECTOR =
  "#accessibility-widget, #accessibility-toggle, [data-preserve-theme='true'], [data-a11y-generated='true']";

const BIG_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M5 3l12 9-5 1 3 7-2 1-3-7-5 4V3z'/%3E%3C/svg%3E") 4 2, auto`;
const POINTER_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M8 2l1 8 2-1 1 5 2-1 3 6 2-1-3-6 3-1L8 2z'/%3E%3C/svg%3E") 6 2, pointer`;

function rememberTheme() {
  const theme = document.documentElement.dataset.theme;
  return THEMES.has(theme) ? theme : theme || "dark";
}

function restoreTheme(theme) {
  if (theme) document.documentElement.dataset.theme = theme;
}

export function isSkipped(element) {
  return Boolean(element?.closest?.(SKIP_SELECTOR));
}

function pageElements() {
  return Array.from(document.body.querySelectorAll("*")).filter(
    (element) => !isSkipped(element),
  );
}

function snapshotOriginalStyles() {
  pageElements().forEach((element) => {
    if (
      element.hasAttribute("style") &&
      !element.hasAttribute("data-asw-original-style")
    ) {
      element.setAttribute(
        "data-asw-original-style",
        element.getAttribute("style"),
      );
    }
  });
}

function setPercent(button, className, value) {
  if (!button) return;
  let span = button.querySelector(`.${className}`);
  if (!span) {
    span = document.createElement("span");
    span.className = className;
    button.appendChild(span);
  }
  span.textContent = value;
}

export function createAccessibilityFeatures(translate) {
  const themeAtStart = rememberTheme();

  function toggleInvertColors() {
    const theme = rememberTheme();
    const button = document.getElementById("invert-colors");
    const enabled = localStorage.getItem("isInvertColorsEnabled") === "1";

    document.body.childNodes.forEach((child) => {
      if (child.nodeType === 1 && !isSkipped(child)) {
        child.classList.toggle("invert-colors", !enabled);
      }
    });

    localStorage.setItem("isInvertColorsEnabled", enabled ? "0" : "1");
    button?.classList.toggle("active", !enabled);
    restoreTheme(theme);
  }

  function toggleHideImages() {
    const theme = rememberTheme();
    const button = document.getElementById("hide-images");
    const enabled = localStorage.getItem("isHideImagesEnabled") === "1";

    document.querySelectorAll("div").forEach((div) => {
      if (!isSkipped(div)) {
        div.classList.toggle("hide-images", !enabled);
      }
    });

    document.body.classList.toggle("hide-images", !enabled);

    localStorage.setItem("isHideImagesEnabled", enabled ? "0" : "1");
    button?.classList.toggle("active", !enabled);
    restoreTheme(theme);
  }

  function enableDyslexicFont() {
    const theme = rememberTheme();
    const button = document.getElementById("dyslexic-font");
    const enabled = localStorage.getItem("isDyslexicFontEnabled") === "1";

    pageElements().forEach((element) => {
      if (enabled) {
        const original = element.getAttribute("data-asw-orgFontFamily");
        if (original) element.style.fontFamily = original;
        else element.style.removeProperty("font-family");
        element.removeAttribute("data-asw-orgFontFamily");
      } else {
        element.setAttribute(
          "data-asw-orgFontFamily",
          element.style.fontFamily || "",
        );
        element.style.fontFamily = "OpenDyslexic3, sans-serif";
      }
    });

    localStorage.setItem("isDyslexicFontEnabled", enabled ? "0" : "1");
    button?.classList.toggle("active", !enabled);
    restoreTheme(theme);
  }

  function adjustSaturation(action) {
    const currentSaved = parseFloat(localStorage.getItem("saturationValue"));
    const current = Number.isNaN(currentSaved) ? 1 : currentSaved;

    const next = Math.max(
      0,
      Math.min(
        2,
        parseFloat((current + (action === "increase" ? 0.1 : -0.1)).toFixed(2)),
      ),
    );

    localStorage.setItem("saturationValue", String(next));
    applySaturation(next);
  }

  function updateSaturationButtons(current) {
    const increaseBtn = document.getElementById("increase-saturation");
    const decreaseBtn = document.getElementById("decrease-saturation");
    const percent = Math.round((current - 1) * 100);

    [increaseBtn, decreaseBtn].forEach((btn) => {
      btn?.classList.remove("active");
      setPercent(btn, "saturation-percentage", "");
    });

    if (percent > 0) {
      setPercent(increaseBtn, "saturation-percentage", ` (+${percent}%)`);
      increaseBtn?.classList.add("active");
    } else if (percent < 0) {
      setPercent(decreaseBtn, "saturation-percentage", ` (${percent}%)`);
      decreaseBtn?.classList.add("active");
    }
  }

  function applySaturation(value) {
    const theme = rememberTheme();

    document.body.style.setProperty("--saturation", String(value));

    pageElements().forEach((element) => {
      element.style.filter = `saturate(${value})`;
    });

    updateSaturationButtons(value);
    restoreTheme(theme);
  }

  function restoreSaturation() {
    const saved = parseFloat(localStorage.getItem("saturationValue"));

    if (Number.isNaN(saved)) return;

    applySaturation(saved);
  }
  function adjustLetterSpacing() {
    const theme = rememberTheme();
    const button = document.getElementById("letter-spacing");
    const enabled = localStorage.getItem("isLetterSpacingEnabled") === "1";

    pageElements().forEach((element) => {
      if (enabled) {
        const original = element.getAttribute("data-asw-orgLetterSpacing");
        if (original) element.style.letterSpacing = original;
        else element.style.removeProperty("letter-spacing");
        element.removeAttribute("data-asw-orgLetterSpacing");
      } else {
        const original =
          element.getAttribute("data-asw-orgLetterSpacing") ||
          element.style.letterSpacing ||
          "0";
        element.setAttribute("data-asw-orgLetterSpacing", original);
        element.style.letterSpacing = `${parseFloat(original) + 0.1}em`;
      }
    });

    localStorage.setItem("isLetterSpacingEnabled", enabled ? "0" : "1");
    button?.classList.toggle("active", !enabled);
    restoreTheme(theme);
  }

  function adjustLineHeight() {
    const theme = rememberTheme();
    const button = document.getElementById("line-height");
    const enabled = localStorage.getItem("isLineHeightEnabled") === "1";

    pageElements().forEach((element) => {
      if (enabled) {
        const original = element.getAttribute("data-asw-orgLineHeight");
        if (original) element.style.lineHeight = original;
        else element.style.removeProperty("line-height");
        element.removeAttribute("data-asw-orgLineHeight");
      } else {
        const original =
          element.getAttribute("data-asw-orgLineHeight") ||
          element.style.lineHeight ||
          "1.1";
        element.setAttribute("data-asw-orgLineHeight", original);
        const parsed = parseFloat(original);
        element.style.lineHeight = String(
          (Number.isNaN(parsed) ? 1.1 : parsed) + 1,
        );
      }
    });

    localStorage.setItem("isLineHeightEnabled", enabled ? "0" : "1");
    button?.classList.toggle("active", !enabled);
    restoreTheme(theme);
  }

  function adjustContrast() {
    const theme = rememberTheme();
    const button = document.getElementById("high-contrast");
    const enabled = localStorage.getItem("isContrastEnabled") === "1";

    pageElements().forEach((element) => {
      if (enabled) {
        const color = element.getAttribute("data-asw-orgContrastColor");
        const background = element.getAttribute("data-asw-orgContrastBgColor");
        if (color) element.style.color = color;
        else element.style.removeProperty("color");
        if (background) element.style.backgroundColor = background;
        else element.style.removeProperty("background-color");
        element.removeAttribute("data-asw-orgContrastColor");
        element.removeAttribute("data-asw-orgContrastBgColor");
      } else {
        if (!element.hasAttribute("data-asw-orgContrastColor")) {
          element.setAttribute(
            "data-asw-orgContrastColor",
            element.style.color || "",
          );
        }
        if (!element.hasAttribute("data-asw-orgContrastBgColor")) {
          element.setAttribute(
            "data-asw-orgContrastBgColor",
            element.style.backgroundColor || "",
          );
        }
        element.style.color = "#ffff00";
        element.style.backgroundColor = "#0000ff";
      }
    });

    localStorage.setItem("isContrastEnabled", enabled ? "0" : "1");
    button?.classList.toggle("active", !enabled);
    restoreTheme(theme);
  }

  function adjustFontSize(step) {
    const theme = rememberTheme();
    const current =
      (parseFloat(localStorage.getItem("fontSizeStep")) || 0) + step;

    localStorage.setItem("fontSizeStep", String(current));

    pageElements().forEach((element) => {
      const originalFontSize = element.getAttribute(
        "data-asw-original-font-size",
      );

      if (originalFontSize === null) {
        const computedSize = parseFloat(getComputedStyle(element).fontSize);
        if (!Number.isNaN(computedSize)) {
          element.setAttribute(
            "data-asw-original-font-size",
            String(computedSize),
          );
        }
      }

      const baseSize = parseFloat(
        element.getAttribute("data-asw-original-font-size"),
      );

      if (!Number.isNaN(baseSize)) {
        element.style.fontSize = `${Math.max(baseSize + current, 8)}px`;
      }
    });

    updateFontSizeButtons(current);
    restoreTheme(theme);
  }

  function updateFontSizeButtons(current) {
    const increaseBtn = document.getElementById("increase-text");
    const decreaseBtn = document.getElementById("decrease-text");
    const percent = Math.round(current * 10);

    [increaseBtn, decreaseBtn].forEach((btn) => {
      btn?.classList.remove("active");
      setPercent(btn, "font-percentage", "");
    });

    if (percent > 0) {
      setPercent(increaseBtn, "font-percentage", ` (+${percent}%)`);
      increaseBtn?.classList.add("active");
    } else if (percent < 0) {
      setPercent(decreaseBtn, "font-percentage", ` (${percent}%)`);
      decreaseBtn?.classList.add("active");
    }
  }

  function restoreFontSize() {
    const saved = parseFloat(localStorage.getItem("fontSizeStep")) || 0;

    if (saved === 0) return;

    const theme = rememberTheme();

    pageElements().forEach((element) => {
      const currentOriginal = element.getAttribute(
        "data-asw-original-font-size",
      );

      if (currentOriginal === null) {
        const computedSize = parseFloat(getComputedStyle(element).fontSize);

        if (!Number.isNaN(computedSize)) {
          element.setAttribute(
            "data-asw-original-font-size",
            String(computedSize),
          );
        }
      }

      const baseSize = parseFloat(
        element.getAttribute("data-asw-original-font-size"),
      );

      if (!Number.isNaN(baseSize)) {
        element.style.fontSize = `${Math.max(baseSize + saved, 8)}px`;
      }
    });

    updateFontSizeButtons(saved);
    restoreTheme(theme);
  }

  function enableHighlightLinks() {
    const button = document.getElementById("highlight-links");
    const enabled = localStorage.getItem("isHighlightLinks") === "1";
    document.body.classList.toggle("highlight-links", !enabled);
    localStorage.setItem("isHighlightLinks", enabled ? "0" : "1");
    button?.classList.toggle("active", !enabled);
    restoreTheme(rememberTheme());
  }

  function enableBigCursor() {
    const theme = rememberTheme();
    const button = document.getElementById("big-cursor");
    const enabled = localStorage.getItem("isBigCursorEnabled") === "1";
    const interactive =
      "button, a, [role='button'], input[type='submit'], input[type='button']";

    pageElements().forEach((element) => {
      element.style.cursor = enabled ? "" : BIG_CURSOR;
    });
    if (!enabled) {
      document.querySelectorAll(interactive).forEach((element) => {
        if (!isSkipped(element)) element.style.cursor = POINTER_CURSOR;
      });
    }

    localStorage.setItem("isBigCursorEnabled", enabled ? "0" : "1");
    button?.classList.toggle("active", !enabled);
    restoreTheme(theme);
  }

  function markActiveFromStorage() {
    const flags = [
      ["isDyslexicFontEnabled", "dyslexic-font"],
      ["isLineHeightEnabled", "line-height"],
      ["isLetterSpacingEnabled", "letter-spacing"],
      ["isContrastEnabled", "high-contrast"],
      ["isHighlightLinks", "highlight-links"],
      ["isBigCursorEnabled", "big-cursor"],
      ["isInvertColorsEnabled", "invert-colors"],
      ["isHideImagesEnabled", "hide-images"],
    ];
    flags.forEach(([key, id]) => {
      if (localStorage.getItem(key) === "1") {
        document.getElementById(id)?.classList.add("active");
      }
    });
  }

  function restoreSavedToggleSettings() {
    const settings = [
      ["isDyslexicFontEnabled", enableDyslexicFont],
      ["isLineHeightEnabled", adjustLineHeight],
      ["isLetterSpacingEnabled", adjustLetterSpacing],
      ["isContrastEnabled", adjustContrast],
      ["isHighlightLinks", enableHighlightLinks],
      ["isBigCursorEnabled", enableBigCursor],
      ["isInvertColorsEnabled", toggleInvertColors],
      ["isHideImagesEnabled", toggleHideImages],
    ];

    settings.forEach(([key, applySetting]) => {
      if (localStorage.getItem(key) === "1") {
        // Existing handlers toggle the current state.
        // Set it to off first so the handler reapplies the saved setting.
        localStorage.setItem(key, "0");
        applySetting();
      }
    });
  }

  function resetAllSettings(stopReading) {
    if (!confirm(translate("resetConfirm"))) return;
    stopReading();

    const theme = rememberTheme() || themeAtStart;
    pageElements().forEach((element) => {
      const original = element.getAttribute("data-asw-original-style");
      if (original) element.setAttribute("style", original);
      else {
        [
          "font-size",
          "font-family",
          "line-height",
          "letter-spacing",
          "color",
          "background-color",
          "filter",
          "cursor",
        ].forEach((property) => element.style.removeProperty(property));
      }
    });

    document
      .querySelectorAll(
        "[data-asw-orgFontFamily],[data-asw-orgLineHeight],[data-asw-orgLetterSpacing],[data-asw-orgContrastColor],[data-asw-orgContrastBgColor],[data-asw-original-font-size]",
      )
      .forEach((element) => {
        [
          "data-asw-original-font-size",
          "data-asw-orgFontFamily",
          "data-asw-orgLineHeight",
          "data-asw-orgLetterSpacing",
          "data-asw-orgContrastColor",
          "data-asw-orgContrastBgColor",
        ].forEach((name) => element.removeAttribute(name));
      });

    [
      "fontSizeStep",
      "isDyslexicFontEnabled",
      "isLineHeightEnabled",
      "isLetterSpacingEnabled",
      "isContrastEnabled",
      "isHighlightLinks",
      "isBigCursorEnabled",
      "isInvertColorsEnabled",
      "isHideImagesEnabled",
      "saturationValue",
    ].forEach((key) => localStorage.removeItem(key));

    document.body.classList.remove(
      "highlight-links",
      "invert-colors",
      "hide-images",
    );
    document.body.style.removeProperty("--saturation");
    document
      .querySelectorAll(".invert-colors, .hide-images")
      .forEach((element) => {
        element.classList.remove("invert-colors", "hide-images");
      });
    document
      .querySelectorAll("#accessibility-widget button.active")
      .forEach((button) => {
        button.classList.remove("active");
      });
    document
      .querySelectorAll(".font-percentage, .saturation-percentage")
      .forEach((span) => {
        span.textContent = "";
      });

    restoreTheme(theme);
    alert(translate("resetDone"));
  }

  function nameFromUrl(href) {
    try {
      const url = new URL(href, window.location.href);
      const slug = url.pathname.split("/").filter(Boolean).pop();
      return (slug || url.hostname).replace(/[-_]/g, " ");
    } catch {
      return "";
    }
  }

  function applyAttributeFixes(root = document.body) {
    root.querySelectorAll("a").forEach((link) => {
      if (isSkipped(link)) return;
      const name =
        link.textContent.trim() ||
        link.getAttribute("aria-label") ||
        link.getAttribute("title") ||
        link.querySelector("img")?.getAttribute("alt");
      if (!name) {
        const generated = nameFromUrl(link.href);
        if (generated) link.setAttribute("aria-label", generated);
      }
      const image = link.querySelector("img");
      if (image && !image.getAttribute("alt")?.trim()) {
        image.setAttribute(
          "alt",
          link.textContent.trim() || nameFromUrl(link.href) || "Image",
        );
      }
    });

    root.querySelectorAll("iframe, frame").forEach((frame) => {
      if (frame.getAttribute("title")) return;
      frame.setAttribute("title", nameFromUrl(frame.src) || "Embedded content");
    });
  }

  function installFixes() {
    applyAttributeFixes();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1 || isSkipped(node)) return;
          if (
            node.matches?.("a, iframe, frame") ||
            node.querySelector?.("a, iframe, frame")
          ) {
            applyAttributeFixes(node);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  snapshotOriginalStyles();

  restoreFontSize();
  restoreSaturation();
  restoreSavedToggleSettings();

  markActiveFromStorage();
  installFixes();
  restoreTheme(themeAtStart);

  return {
    adjustFontSize,
    adjustLineHeight,
    adjustLetterSpacing,
    enableDyslexicFont,
    adjustContrast,
    adjustSaturation,
    toggleInvertColors,
    toggleHideImages,
    enableHighlightLinks,
    enableBigCursor,
    resetAllSettings,
  };
}
