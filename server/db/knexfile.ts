import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Knex } from "knex";

import "../config/dotenv.init";

const DIR = path.dirname(fileURLToPath(import.meta.url));

export const sqlite: Knex.Config = {
  client: "sqlite3",

  connection: {
    filename: path.join(DIR, "./database.sqlite"),
  },
  useNullAsDefault: true,
  pool: {
    min: 0,
    max: 7,
    afterCreate: (conn: any, cb: any) => {
      conn.run("PRAGMA foreign_keys = ON", cb);
    },
  },
  migrations: {
    directory: path.join(DIR, "migrations"),
    tableName: "_knex_migrations_",
    extension: "ts",
  },
  seeds: {
    directory: path.join(DIR, "seeds"),
    extension: "ts",
  },
};

export const pg_render: Knex.Config = {
  client: "pg",

  connection: {
    connectionString: process.env.NUXT_DATABASE_URL_PG_RENDER,
    // host: process.env.PG_HOST ?? "127.0.0.1",
    // port: Number(process.env.PG_PORT ?? 5432),
    // user: process.env.PG_USER ?? "postgres",
    // password: process.env.PG_PASSWORD ?? "",
    // database: process.env.PG_DATABASE ?? "app_db",
    ssl: { rejectUnauthorized: false },
  },

  pool: {
    min: 0,
    max: 10,
  },

  migrations: {
    directory: path.join(DIR, "migrations"),
    tableName: "_knex_migrations_",
    extension: "ts",
  },

  seeds: {
    directory: path.join(DIR, "seeds"),
    extension: "ts",
  },
};

const clientDefault = (<any>{ sqlite, pg_render })[
  process.env.NUXT_DATABASE_CONNECTION_NAME ?? "sqlite"
];

export default clientDefault;
