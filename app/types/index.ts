import type { Observable, Subject } from "rxjs";
import type { RequestExtendedOptions } from "graphql-request";
import type { AsyncDataOptions } from "#app";
import type {
  JsonDataRecord as TRecordJson,
  TJson,
  TJsonLiteral,
} from "../schemas/json.schema";
import type {
  Component as TVueComponent,
  FunctionalComponent as TVueFunctionalComponent,
} from "vue";

export type ElementOf<T extends readonly unknown[]> = T[number];
export type TFunctionVoid = (...args: unknown[]) => void;
export type TFunction<TRes = void, TArgs = unknown> = (
  ...args: TArgs[]
) => TRes;
export type THasId<T = any> = T & { id: any };
export type TOrNoValue<T = any> = T | undefined | null;
export type TMaybeEmptySubject = TOrNoValue<Subject<void>>;
export type TMaybePromise<T> = T | Promise<T>;
export type TMaybeAsync<T> = T | Observable<T> | Promise<T>;
export interface IEventApp<TEventAppPayload = unknown> {
  type: string;
  payload: TEventAppPayload;
}
export type TGQLOptions<TData = unknown> = { key: any } & Omit<
  RequestExtendedOptions,
  "url"
> &
  AsyncDataOptions<TData>;
export interface IUser<ID = any> {
  id: ID;
  email: string;
  key?: unknown;
  password?: string;
}
export type TUser = IUser<string> & { key: string };
export interface ICredentials {
  email: string;
  password: string;
}
export interface IAuthenticateOptions {
  timeoutMs: number;
  controller?: globalThis.AbortController;
}

//
export type { TRecordJson, TJson, TJsonLiteral };
export type { TVueComponent, TVueFunctionalComponent };
export type TCashDomClient = typeof import("cash-dom").default;
export {
  AuthService as TAuthService,
  OAuthAuthService as TOAuthAuthService,
} from "~/services/auth/base";
