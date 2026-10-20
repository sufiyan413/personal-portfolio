const STYLE_ID = "a11y-widget-styles";

const ICONS = {
  text: `<svg width="30" height="30" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M5 9V15H15V39H21V15H31V9H5ZM43 19H25V25H31V39H37V25H43V19Z" fill="currentColor"></path></svg>`,
  lines: `<svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75Zm0 6.5a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"></path></svg>`,
  spacing: `<svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M2 3.75A.75.75 0 0 1 2.75 3h10.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 3.75ZM2 8a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 2 8Zm0 4.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"></path></svg>`,
  font: `<svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M11.013 2.513a1.75 1.75 0 0 1 2.475 2.474L6.226 12.25a2.751 2.751 0 0 1-.892.596l-2.047.848a.75.75 0 0 1-.98-.98l.848-2.047a2.75 2.75 0 0 1 .596-.892l7.262-7.261Z" clip-rule="evenodd"></path></svg>`,
  invert: `<svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M12.613 1.258a1.535 1.535 0 0 1 2.13 2.129l-1.905 2.856a8 8 0 0 1-3.56 2.939 4.011 4.011 0 0 0-2.46-2.46 8 8 0 0 1 2.94-3.56l2.855-1.904ZM5.5 8A2.5 2.5 0 0 0 3 10.5a.5.5 0 0 1-.7.459.75.75 0 0 0-.983 1A3.5 3.5 0 0 0 8 10.5 2.5 2.5 0 0 0 5.5 8Z"></path></svg>`,
  contrast: `<svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 1a7 7 0 1 0 0 14V1Z"></path></svg>`,
  saturation: `<svg width="30" height="30" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM22 39.86C14.12 38.88 8 32.16 8 24C8 15.84 14.1 9.12 22 8.14V39.86Z" fill="currentColor"></path></svg>`,
  read: `<svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M2 4.25A2.25 2.25 0 0 1 4.25 2h7.5A2.25 2.25 0 0 1 14 4.25v5.5A2.25 2.25 0 0 1 11.75 12h-1.312c.1.128.21.248.328.36a.75.75 0 0 1 .234.545v.345a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1-.75-.75v-.345a.75.75 0 0 1 .234-.545c.118-.111.228-.232.328-.36H4.25A2.25 2.25 0 0 1 2 9.75v-5.5Zm2.25-.75a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75h7.5a.75.75 0 0 0 .75-.75v-4.5a.75.75 0 0 0-.75-.75h-7.5Z" clip-rule="evenodd"></path></svg>`,
  stop: `<svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="3" y="3" width="10" height="10" rx="2"></rect></svg>`,
  images: `<svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd"></path></svg>`,
  link: `<svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Z" clip-rule="evenodd"></path></svg>`,
  cursor: `<svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 3l12 9-5 1 3 7-2 1-3-7-5 4V3Z"></path></svg>`,
  reset: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>`,
  person: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-720q-33 0-56.5-23.5T400-800q0-33 23.5-56.5T480-880q33 0 56.5 23.5T560-800q0 33-23.5 56.5T480-720ZM360-80v-520H120v-80h720v80H600v520h-80v-240h-80v240h-80Z"></path></svg>`,
};

function button(id, key, className, icon, extra = "") {
  return `<button id="${id}" type="button" class="${className}" data-i18n="${key}">${icon}<span data-i18n-text></span>${extra}</button>`;
}

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;

  style.textContent = `
  #accessibility-toggle {
    position: fixed;
    bottom: 80px;
    right: 20px;
    z-index: 9999;
    width: 48px;
    height: 48px;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--surface);
    color: var(--foreground);
    border: 1px solid var(--border);
    border-radius: 100px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    cursor: pointer;
    transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
  }

  #accessibility-toggle:hover {
    transform: scale(1.05);
  }

  #accessibility-toggle:active {
    transform: scale(0.95);
  }

  #accessibility-toggle:focus-visible {
    outline: 3px solid var(--accent);
    outline-offset: 3px;
  }

  #accessibility-toggle svg {
    width: 21px;
    height: 21px;
  }

  #accessibility-widget {
    display: none;
    position: fixed;
    left: 20px;
    right: 80px;
    bottom: 20px;
    z-index: 10000;
    width: auto;
    min-width: 0;
    max-width: none;
    box-sizing: border-box;
    background: var(--surface);
    color: var(--foreground);
    border: 1px solid var(--border);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
    padding: 24px;
    font-family: system-ui, -apple-system, sans-serif;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    text-align: start;
  }

  #accessibility-widget.open {
    display: flex;
    flex-direction: column;
  }

  #accessibility-widget[dir="rtl"] {
    text-align: right;
  }

  #accessibility-widget > span {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--border);
    width: 100%;
    box-sizing: border-box;
  }

  /* Default: big screens - 7 buttons per row */
  #accessibility-widget .button-group {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 8px;
    width: 100%;
  }

  #accessibility-widget .button-group button {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: 100%;
    min-width: 0;
    min-height: 50px;
    height: auto;
    padding: 6px 5px;
    box-sizing: border-box;
    border: 1px solid var(--border);
    border-radius: 7px;
    background: var(--surface);
    color: var(--foreground);
    font-family: inherit;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.2;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  #accessibility-widget .button-group button svg {
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
  }

  #accessibility-widget .button-group button [data-i18n-text],
  #accessibility-widget .button-group button .font-percentage,
  #accessibility-widget .button-group button .saturation-percentage {
    display: inline;
    font-size: 15px;
    line-height: 1.2;
    white-space: nowrap;
  }

  #accessibility-widget .button-group button:hover,
  #accessibility-widget .button-group button.active {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
  }

  #accessibility-widget .button-group button:focus-visible,
  #accessibility-widget #reset-all-settings:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }

  #accessibility-widget .font-percentage,
  #accessibility-widget .saturation-percentage {
    display: inline;
    color: inherit;
    font-size: 0.9rem;
  }

  /* Footer */
  #accessibility-widget .a11y-widget-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
  }

  #accessibility-widget #reset-all-settings {
    appearance: none;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
    width: auto;
    min-width: 0;
    min-height: 50px;
    padding: 6px 10px;
    margin: 0;
    box-sizing: border-box;
    border: 1px solid var(--border);
    border-radius: 7px;
    background: var(--surface);
    color: var(--foreground);
    font-family: inherit;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.2;
    white-space: nowrap;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  #accessibility-widget #reset-all-settings svg {
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
  }

  #accessibility-widget #reset-all-settings:hover,
  #accessibility-widget #reset-all-settings.active {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
  }

  #accessibility-widget .a11y-credit {
    margin-left: auto;
    text-align: right;
    font-size: 0.85rem;
    color: var(--foreground);
    opacity: 0.75;
  }

  #accessibility-widget[dir="rtl"] .a11y-credit {
    margin-left: 0;
    margin-right: auto;
    text-align: left;
  }

  /* Summary overlay */
  .summary-overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(90vw, 600px);
    max-height: 80vh;
    box-sizing: border-box;
    background: var(--surface);
    color: var(--foreground);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 32px;
    z-index: 10001;
    overflow-y: auto;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    text-align: start;
  }

  .summary-overlay[dir="rtl"] {
    text-align: right;
  }

  .summary-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 24px;
  }

  .summary-actions button {
    flex: 1 1 120px;
    padding: 12px 24px;
    border: 1px solid var(--border);
    border-radius: 12px;
    font-weight: 500;
    cursor: pointer;
    background: var(--surface);
    color: var(--foreground);
  }

  .close-button {
    background: var(--surface);
    color: var(--foreground);
  }

  .read-button {
    background: var(--accent);
    color: white;
    border-color: var(--accent);
  }

  /* Loader */
  .loader-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10001;
  }

  .loader {
    width: 48px;
    height: 48px;
    border: 5px solid #fff;
    border-bottom-color: transparent;
    border-radius: 50%;
    animation: a11y-rotation 1s linear infinite;
  }

  @keyframes a11y-rotation {
    to {
      transform: rotate(360deg);
    }
  }

  .invert-colors {
    filter: invert(1) hue-rotate(180deg) !important;
  }

  .highlight-links a {
    padding: 2px 4px;
    background-color: #fef3c7;
    border: 2px solid #f59e0b;
    border-radius: 4px;
    text-decoration: none !important;
    color: #000 !important;
  }

  .hide-images img,
  .hide-images [style*="background-image"] {
    background-image: none !important;
  }

  .hide-images img {
    display: none;
  }

  @font-face {
    font-family: "OpenDyslexic3";
    src: url("https://website-widgets.pages.dev/fonts/OpenDyslexic3-Regular.woff") format("woff");
    font-display: swap;
  }

  /* Laptop: 5 buttons per row */
  @media (min-width: 992px) and (max-width: 1199px) {
    #accessibility-widget .button-group {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }

    #accessibility-widget .button-group button {
      font-size: 13px;
      gap: 4px;
    }

    #accessibility-widget .button-group button [data-i18n-text],
    #accessibility-widget .button-group button .font-percentage,
    #accessibility-widget .button-group button .saturation-percentage {
      font-size: 13px;
    }
  }

  /* Medium screens/tablets: 4 buttons per row */
  @media (min-width: 701px) and (max-width: 991px) {
    #accessibility-widget {
      left: 12px;
      right: 80px;
      padding: 16px;
    }

    #accessibility-widget .button-group {
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 6px;
    }

    #accessibility-widget .button-group button {
      font-size: 12px;
      gap: 4px;
      padding: 6px 4px;
    }

    #accessibility-widget .button-group button svg {
      width: 17px;
      height: 17px;
      flex-basis: 17px;
    }

    #accessibility-widget .button-group button [data-i18n-text],
    #accessibility-widget .button-group button .font-percentage,
    #accessibility-widget .button-group button .saturation-percentage {
      font-size: 12px;
    }
  }

  /* Phones: 1 button per row */
  @media (max-width: 700px) {
    #accessibility-widget {
      left: 12px;
      right: 80px;
      bottom: 20px;
      padding: 12px;
      max-height: calc(100vh - 100px);
    }

    #accessibility-widget .button-group {
      grid-template-columns: minmax(0, 1fr);
      gap: 6px;
    }

    #accessibility-widget .button-group button {
      justify-content: flex-start;
      min-height: 34px;
      padding: 7px 10px;
      font-size: 12px;
      gap: 8px;
    }

    #accessibility-widget .button-group button svg {
      width: 16px;
      height: 16px;
      flex-basis: 16px;
    }

    #accessibility-widget .button-group button [data-i18n-text],
    #accessibility-widget .button-group button .font-percentage,
    #accessibility-widget .button-group button .saturation-percentage {
      font-size: 12px;
    }

    #accessibility-widget .a11y-widget-footer {
      align-items: center;
      flex-wrap: wrap;
    }

    #accessibility-widget #reset-all-settings {
      min-height: 34px;
      padding: 7px 10px;
      gap: 8px;
      font-size: 12px;
    }

    #accessibility-widget #reset-all-settings svg {
      width: 16px;
      height: 16px;
      flex-basis: 16px;
    }

    #accessibility-widget .a11y-credit {
      font-size: 11px;
    }

    .summary-overlay {
      padding: 20px;
    }
  }
`;

  document.head.appendChild(style);
}

export function applyLabels(translate) {
  document
    .querySelectorAll("#accessibility-widget [data-i18n]")
    .forEach((node) => {
      const key = node.getAttribute("data-i18n");
      const label = node.querySelector("[data-i18n-text]");

      if (!label) {
        node.textContent = translate(key);
        return;
      }

      if (node.id === "toggle-reading" && node.dataset.reading === "true") {
        label.textContent = translate("stopReading");
        return;
      }

      label.textContent = translate(key);
    });

  const toggle = document.getElementById("accessibility-toggle");

  if (toggle) {
    toggle.setAttribute("aria-label", translate("openOptions"));
  }
}

export function setWidgetLocale(locale, rtl) {
  const widget = document.getElementById("accessibility-widget");

  if (!widget) return;

  widget.lang = locale;
  widget.dir = rtl ? "rtl" : "ltr";
}

export function setReadingState(active, translate) {
  const button = document.getElementById("toggle-reading");

  if (!button) return;

  button.dataset.reading = active ? "true" : "false";
  button.classList.toggle("active", active);

  const icon = button.querySelector("svg");

  if (icon) {
    icon.outerHTML = active ? ICONS.stop : ICONS.read;
  }

  const label = button.querySelector("[data-i18n-text]");

  if (label) {
    label.textContent = translate(active ? "stopReading" : "readScreen");
  }
}

export function mountAccessibilityUI(translate, locale, rtl) {
  injectStyles();

  if (document.getElementById("accessibility-toggle")) {
    applyLabels(translate);
    setWidgetLocale(locale, rtl);

    return {
      widget: document.getElementById("accessibility-widget"),
      toggle: document.getElementById("accessibility-toggle"),
    };
  }

  const toggle = document.createElement("button");
  toggle.id = "accessibility-toggle";
  toggle.type = "button";
  toggle.innerHTML = ICONS.person;
  toggle.setAttribute("aria-label", translate("openOptions"));
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "accessibility-widget");

  const widget = document.createElement("div");
  widget.id = "accessibility-widget";
  widget.lang = locale;
  widget.dir = rtl ? "rtl" : "ltr";
  widget.setAttribute("role", "dialog");
  widget.setAttribute("aria-labelledby", "accessibility-widget-title");

  widget.innerHTML = `
    <span id="accessibility-widget-title" data-i18n="title"></span>

    <div class="button-group">
      ${button("increase-text", "increaseText", "text-controls", ICONS.text, `<span class="font-percentage"></span>`)}
      ${button("decrease-text", "decreaseText", "text-controls", ICONS.text, `<span class="font-percentage"></span>`)}
      ${button("line-height", "lineHeight", "text-controls", ICONS.lines)}
      ${button("letter-spacing", "letterSpacing", "text-controls", ICONS.spacing)}
      ${button("dyslexic-font", "dyslexicFont", "text-controls", ICONS.font)}
      ${button("invert-colors", "invertColors", "visual-controls", ICONS.invert)}
      ${button("high-contrast", "highContrast", "visual-controls", ICONS.contrast)}
      ${button("increase-saturation", "increaseSaturation", "visual-controls", ICONS.saturation, `<span class="saturation-percentage"></span>`)}
      ${button("decrease-saturation", "decreaseSaturation", "visual-controls", ICONS.saturation, `<span class="saturation-percentage"></span>`)}
      ${button("toggle-reading", "readScreen", "reading-controls", ICONS.read)}
      ${button("check-images", "checkImages", "reading-controls", ICONS.images)}
      ${button("highlight-links", "highlightLinks", "navigation-controls", ICONS.link)}
      ${button("big-cursor", "bigCursor", "navigation-controls", ICONS.cursor)}
      ${button("hide-images", "toggleImages", "navigation-controls", ICONS.images)}
    </div>

    <div class="a11y-widget-footer">
      ${button("reset-all-settings", "reset", "", ICONS.reset)}
      <div class="a11y-credit">Developed by Shaikh Sufiyan</div>
    </div>
  `;

  const openWidget = (open) => {
    widget.classList.toggle("open", open);
    widget.style.display = open ? "flex" : "none";
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  };

  toggle.addEventListener("click", () => {
    openWidget(!widget.classList.contains("open"));
  });

  document.addEventListener("click", (event) => {
    const path =
      typeof event.composedPath === "function" ? event.composedPath() : [];
    const inside = widget.contains(event.target) || path.includes(widget);
    const onToggle = toggle.contains(event.target) || path.includes(toggle);

    if (!inside && !onToggle) {
      openWidget(false);
    }
  });

  document.body.appendChild(toggle);
  document.body.appendChild(widget);

  applyLabels(translate);

  return { widget, toggle, openWidget };
}

export function showOverlay(paragraphs, translate, onRead, onStop) {
  const overlay = document.createElement("div");
  overlay.className = "summary-overlay";
  overlay.dir = document.getElementById("accessibility-widget")?.dir || "ltr";
  overlay.lang = document.getElementById("accessibility-widget")?.lang || "en";
  overlay.setAttribute("data-a11y-generated", "true");

  paragraphs.forEach((text) => {
    const para = document.createElement("p");
    para.textContent = text;
    overlay.appendChild(para);
  });

  const actions = document.createElement("div");
  actions.className = "summary-actions";

  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "close-button";
  closeButton.textContent = translate("close");
  closeButton.addEventListener("click", () => overlay.remove());

  const readButton = document.createElement("button");
  readButton.type = "button";
  readButton.className = "read-button";
  readButton.textContent = translate("readSummary");

  readButton.addEventListener("click", () => {
    if (window.speechSynthesis?.speaking) {
      onStop();
      readButton.textContent = translate("readSummary");
    } else {
      onRead(paragraphs.join(" "), readButton);
      readButton.textContent = translate("stopReading");
    }
  });

  actions.append(closeButton, readButton);
  overlay.appendChild(actions);
  document.body.appendChild(overlay);
}

export function showLoader() {
  const loaderOverlay = document.createElement("div");
  loaderOverlay.className = "loader-overlay";
  loaderOverlay.setAttribute("data-a11y-generated", "true");
  loaderOverlay.innerHTML = `<div class="loader"></div>`;
  document.body.appendChild(loaderOverlay);

  return loaderOverlay;
}
