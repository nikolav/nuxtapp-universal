import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";

export default defineConfig({
  test: {
    hookTimeout: 60000,
    testTimeout: 60000,
    projects: [
      {
        test: {
          name: "unit",
          environment: "node",
          include: ["test/unit/*.{test,spec}.{ts,tsx}"],
        },
      },
      await defineVitestProject({
        test: {
          name: "nuxt",
          environment: "nuxt",
          include: ["test/nuxt/*.{test,spec}.{ts,tsx}"],
          setupFiles: ["test/nuxt/setup.ts"],

          // first boot / win
          hookTimeout: 60000,
          testTimeout: 60000,
          // teardownTimeout: 60000,

          environmentOptions: {
            nuxt: {
              rootDir: fileURLToPath(new URL(".", import.meta.url)),
              domEnvironment: "happy-dom",
            },
          },
        },
      }),
    ],
  },
});
