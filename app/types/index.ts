import type { Observable, Subject } from "rxjs";
import type {
  JsonDataRecord as TRecordJson,
  TJson,
  TJsonLiteral,
} from "../schemas/json.schema";

export type ElementOf<T extends readonly unknown[]> = T[number];
export type TFunctionVoid = (...args: any[]) => void;
export type THasId<T = any> = T & { id: any };
export type TOrNoValue<T = any> = T | undefined | null;
export type TMaybeEmptySubject = TOrNoValue<Subject<void>>;
export type TMaybeAsync<T> = T | Observable<T> | Promise<T>;
export interface IEventApp<TEventAppPayload = unknown> {
  type: string;
  payload: TEventAppPayload;
}
export interface IUser<ID = unknown> {
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

//
export type { TRecordJson, TJson, TJsonLiteral };
export type TCashDomClient = typeof import("cash-dom").default;
export { AuthService as TAuthService } from "~/services/auth/base";
