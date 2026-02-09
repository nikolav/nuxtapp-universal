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
