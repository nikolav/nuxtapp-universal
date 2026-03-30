import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { defineVitestProject } from "@nuxt/test-utils/config";

export default defineConfig({
  test: {
    hookTimeout: 60000,
    testTimeout: 60000,
    teardownTimeout: 60000,
    projects: [
      {
        test: {
          name: "unit",
          environment: "node",
          include: ["test/unit/*.{test,spec}.{ts,tsx}"],
          setupFiles: [
            "test/polyfills.ts",
            "test/env.ts",
            "test/setup.ts",
            "test/unit/setup.ts",
          ],
        },
      },

      // {
      //   test: {
      //     name: "e2e",
      //     include: ["test/e2e/*.{test,spec}.ts"],
      //     environment: "node",
      //   },
      // },

      await defineVitestProject({
        test: {
          name: "nuxt",
          environment: "nuxt",
          include: ["test/nuxt/*.{test,spec}.{ts,tsx}"],
          setupFiles: [
            "test/polyfills.ts",
            "test/env.ts",
            "test/setup.ts",
            "test/nuxt/setup.ts",
          ],

          hookTimeout: 60000,
          testTimeout: 60000,

          globals: true,
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
