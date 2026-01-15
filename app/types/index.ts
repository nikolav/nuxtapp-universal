import type { Observable, Subject } from "rxjs";
import type { RequestExtendedOptions } from "graphql-request";
import type { AsyncDataOptions } from "#app";
import type {
  JsonDataRecord as TRecordJson,
  TJson,
  TJsonLiteral,
} from "../schemas/json.schema";

export type ElementOf<T extends readonly unknown[]> = T[number];
export type TFunctionVoid = (...args: unknown[]) => void;
export type TFunction<TRes = void, TArgs = unknown> = (
  ...args: TArgs[]
) => TRes;
export type THasId<T = any> = T & { id: any };
export type TOrNoValue<T = any> = T | undefined | null;
export type TMaybeEmptySubject = TOrNoValue<Subject<void>>;
export type TMaybePromise<T> = T | Promise<T>;
export type TMaybeAsync<T> = Observable<T> | TMaybePromise<T>;
export interface IEventApp<TEventAppPayload = unknown> {
  type: string;
  payload: TEventAppPayload;
}
export type TGQLOptions<TData = unknown> = { key: any } & Omit<
  RequestExtendedOptions,
  "url"
> &
  AsyncDataOptions<TData>;

//
export type { TRecordJson, TJson, TJsonLiteral };
export type TCashDomClient = typeof import("cash-dom").default;
