import path from "node:path";
import { Knex } from "knex";

const CWD = process.cwd();
const config = useRuntimeConfig();

export const development: Knex.Config = {
  client: "pg",
  connection: {
    connectionString: config.databaseUrl,
    ssl: {
      ca: config.databaseCa,
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
