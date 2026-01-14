import type { Observable, Subject } from "rxjs";
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
export type TFunctionVoid = (...args: any[]) => void;
export type THasId<T = any> = T & { id: any };
export type TOrNoValue<T = any> = T | undefined | null;
export type TMaybeEmptySubject = TOrNoValue<Subject<void>>;
export type TMaybeAsync<T> = T | Observable<T> | Promise<T>;
export interface IEventApp<TEventAppPayload = unknown> {
  type: string;
  payload: TEventAppPayload;
}
//
export type { TRecordJson, TJson, TJsonLiteral };
export type { TVueComponent, TVueFunctionalComponent };
export type TCashDomClient = typeof import("cash-dom").default;
