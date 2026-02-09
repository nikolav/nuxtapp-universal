import { loadEnv } from "vite";

Object.assign(process.env, loadEnv("test", process.cwd(), ""));

process.env.NODE_ENV ||= "test";
process.env.NUXT_ENV ||= "test";
