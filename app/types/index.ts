import { z } from "zod";
import type { Observable, Subject, Subscription } from "rxjs";
import type { RequestExtendedOptions } from "graphql-request";
import type { AsyncDataOptions } from "#app";
import type {
  JsonDataRecord as TRecordJson,
  TJson,
  TJsonLiteral,
} from "../schemas/json.schema";
import { schemaCacheKeyDriver } from "../schemas";
import type { PhotoSwipeOptions as TPhotoSwipeOptions } from "photoswipe";

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
export interface IPickFileOptions {
  // accept attribute: e.g. "image/*,.pdf,.csv"
  accept?: string;
  // allow multiple selection
  multiple?: boolean;
  // mobile camera/mic hint: "user" | "environment"
  capture?: "user" | "environment";
  // chrome-only directory pick (non-standard)
  // uses webkitdirectory under the hood
  directory?: boolean;
}
export interface IStoreFlags {
  [name: string]: boolean;
}
export type TUseCacheKeyDriver = z.infer<typeof schemaCacheKeyDriver>;
export type TManageSubscriptionsCache = Record<
  string,
  TOrNoValue<Subscription>
>;
export type TFnMaybeAsync<T = unknown> = () => TMaybeAsync<T>;
//
export { AuthService as TAuthService } from "~/services/auth/base";
export type { TRecordJson, TJson, TJsonLiteral };
export type TCashDomClient = typeof import("cash-dom").default;
export type TUseProcessMonitorReturnType = ReturnType<
  typeof import("../composables/utils/use-process-monitor").useProcessMonitor
>;
export type { TPhotoSwipeOptions };
export type { DataSource as TPhotoSwipeDataSource } from "photoswipe";
export type { default as TPhotoSwipeLightbox } from "photoswipe/lightbox";
export type TPhotoSwipeMediaItem = {
  src?: string;
  srcset?: string;
  width?: number;
  height?: number;
  // placeholder image URL that's displayed before large image is loaded
  msrc?: string;
  alt?: string;
  // whether thumbnail is cropped client-side or not
  thumbCropped?: boolean;
  // html content of a slide
  html?: string;
  // slide type
  type?: string;
};
export type TPhotoSwipeMedia = {
  slides: TPhotoSwipeMediaItem[];
  options?: TPhotoSwipeOptions;
  index?: number;
};
