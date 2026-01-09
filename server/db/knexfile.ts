import path from "node:path";

import dotenv from "dotenv";
import { Knex } from "knex";

dotenv.config({
  path: path.join("../../.env"),
});

const CWD = process.cwd();

export const development: Knex.Config = {
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      ca: process.env.DATABASE_CA,
      rejectUnauthorized: true,
    },
  },
  pool: { min: 2, max: 10 },
  migrations: {
    directory: path.join(CWD, "migrations"),
    tableName: "_knex_migrations_",
    extension: "ts",
  },
  seeds: {
    directory: path.join(CWD, "seeds"),
    extension: "ts",
  },
};
