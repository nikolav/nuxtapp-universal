(() => {
  if (typeof Object(globalThis).navigator !== undefined) return;
  Object.defineProperty(globalThis, "navigator", {
    value: { userAgent: "node" },
    configurable: true,
  });
})();
