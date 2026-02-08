// #caches:keyv
export type TOrNoValue<T = unknown> = T | undefined | null;
export type TCacheConnection = "memory" | "redis";
