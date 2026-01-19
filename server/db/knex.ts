import Knex from "knex";
import { connection } from "./knexfile";

export const knex = useRuntimeConfig().databaseInit ? Knex(connection) : null;
