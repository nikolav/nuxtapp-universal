import resizeObserverPolyfill from "resize-observer-polyfill";

(() => {
  if ("navigator" in globalThis) return;
  Object.defineProperty(globalThis, "navigator", {
    value: {
      userAgent: "node",
      platform: "node",
      language: "en",
      languages: ["en"],
    },
    configurable: true,
  });
})();

// Some libs touch these too (safe stubs)
globalThis.window ||= globalThis as any;
globalThis.document ||= (globalThis as any).document;

// --- ResizeObserver (Vuetify layouts/overlays) ---
(globalThis as any).ResizeObserver ??= resizeObserverPolyfill;
