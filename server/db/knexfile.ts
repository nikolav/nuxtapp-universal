import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Knex } from "knex";

const DIR = path.dirname(fileURLToPath(import.meta.url));

export const connection: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: path.join(DIR, "./database.sqlite"),
  },
  useNullAsDefault: true,
  pool: {
    min: 0,
    max: 7,
    afterCreate: (conn: any, cb: any) => {
      // Enable foreign keys
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

export default connection;
