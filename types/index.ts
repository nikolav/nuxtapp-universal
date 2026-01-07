import type { Subject } from "rxjs";

export type ElementOf<T extends readonly unknown[]> = T[number];
export type TFunctionVoid = (...args: any[]) => void;
export type THasId<T = any> = T & { id: any };
export type TOrNoValue<T = any> = T | undefined | null;
export type TMaybeEmptySubject = TOrNoValue<Subject<void>>;
