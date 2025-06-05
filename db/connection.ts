import { Pool, PoolConfig } from "pg";
import { config as dotenvConfig } from "dotenv";

const ENV = process.env.NODE_ENV || "development";


dotenvConfig({
  path: `${__dirname}/../.env.${ENV}`,
});

const config: PoolConfig = {};

if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

export const db = new Pool(config)
