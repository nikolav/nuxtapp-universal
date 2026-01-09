import path from "node:path";
import { Knex } from "knex";

import "../config/dotenv.init";

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
