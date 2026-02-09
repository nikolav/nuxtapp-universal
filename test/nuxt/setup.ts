// test/nuxt/setup.ts

// Add polyfills into test/nuxt/setup.ts when needed
// ..matchMedia, localStorage, etc.

(() => {
  try {
    if (Object(globalThis).navigator) return;
  } catch (error) {
    // pass
  }

  Object.defineProperty(globalThis, "navigator", {
    value: { userAgent: "node" },
    configurable: true,
  });
})();
