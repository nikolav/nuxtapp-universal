import fs from "node:fs";
import path from "node:path";
import { defineNuxtModule } from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "app:on-build-copy-sqlite-db",
  },
  async setup({ PRODUCTION, databaseInit, databaseConnectionName }, nuxt) {
    nuxt.hook("build:done", () => {
      // skip if not sqlite
      if (!(databaseInit && "sqlite" === databaseConnectionName)) return;
      if (!PRODUCTION) {
        setTimeout(() => {
          const devDir = path.join(nuxt.options.buildDir, "dev");
          const dbSource = path.join(
            nuxt.options.rootDir,
            "server/db/database.sqlite",
          );
          const dbDest = path.join(devDir, "database.sqlite");
          const destDir = path.dirname(dbDest);

          if (!fs.existsSync(dbSource)) {
            console.log(`⚠️  Database file not found: [${dbSource}]`);
            return;
          }

          if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
          }

          fs.copyFileSync(dbSource, dbDest);
          console.log(`📊 Database copied to: [${dbDest}]`);
        }, 555);
      } else {
        // cp2:production:build
      }
    });
  },
});
