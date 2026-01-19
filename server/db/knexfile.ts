import path from "node:path";
import { Knex } from "knex";

const CWD = process.cwd();

const config: { [key: string]: Knex.Config } = {
  pg: {
    client: "pg",
    connection: {
      // connectionString: config.databaseUrl,
      connectionString: process.env.NUXT_DATABASE_URL,
      ssl: {
        // ca: config.databaseCa,
        ca: process.env.NUXT_DATABASE_CA,
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
  },
  sqlite: {
    client: "sqlite3",
    connection: {
      filename: path.join(CWD, "database.sqlite"),
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn: any, cb: any) => {
        // Enable foreign keys
        conn.run("PRAGMA foreign_keys = ON", cb);
      },
    },
    migrations: {
      directory: path.join(CWD, "migrations"),
      tableName: "_knex_migrations_",
      extension: "ts",
    },
    seeds: {
      directory: path.join(CWD, "seeds"),
      extension: "ts",
    },
  },
};

// Export based on environment variable
const connectionName = process.env.NUXT_DATABASE_CONNECTION_NAME || "sqlite";
export default config[connectionName];

// Also export all connections if needed elsewhere
export { config as connections };
