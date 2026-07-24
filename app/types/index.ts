import type { Directive } from "vue";
import { z } from "zod";
import type { Observable, Subject, Subscription } from "rxjs";
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
  MaybeRefOrGetter,
} from "vue";
import { schemaCacheKeyDriver, schemaCollectionsKeyDriver } from "../schemas";

/* =============================================================================
 * Core utility types
 * ========================================================================== */

export * from "./nuxt";
export * from "./page-meta";
export * from "./vuetify-styles";

export type ElementOf<T extends readonly unknown[]> = T[number];

export type TFunctionVoid = (...args: unknown[]) => void;

/** Generic function type (variadic args). */
export type TFunction<TRes = void, TArg = unknown> = (...args: TArg[]) => TRes;

export type THasId<T = unknown> = T & { id: unknown };

export type TOrNoValue<T = unknown> = T | undefined | null;

export type TMaybePromise<T> = T | Promise<T>;
export type TMaybeAsync<T> = T | Observable<T> | Promise<T>;
export type TFnMaybeAsync<T = unknown> = () => TMaybeAsync<T>;
export type TLooseRest<T, TRest = unknown> = T & { [key: string]: TRest };

/** watch() dep style: value or getter fn. */
export type TWatchDep<T = unknown> = T | (() => T);

/* =============================================================================
 * App events
 * ========================================================================== */

export interface IEventApp<TPayload = unknown> {
  type: string;
  payload: TPayload;
}

/* =============================================================================
 * GraphQL / AsyncData options
 * ========================================================================== */

export type TGQLOptions<TData = unknown, TKey = MaybeRefOrGetter<string>> = {
  key: TKey;
} & Omit<RequestExtendedOptions, "url"> &
  AsyncDataOptions<TData>;

/* =============================================================================
 * Auth / user models
 * ========================================================================== */

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

export interface IAuthenticateOptions {
  timeoutMs: number;
  controller?: globalThis.AbortController;
}

/* =============================================================================
 * Browser / file picking
 * ========================================================================== */

export interface IPickFileOptions {
  /** accept attribute: e.g. "image/*,.pdf,.csv" */
  accept?: string;
  /** allow multiple selection */
  multiple?: boolean;
  /** mobile camera/mic hint */
  capture?: "user" | "environment";
  /**
   * chrome-only directory pick (non-standard)
   * uses webkitdirectory under the hood
   */
  directory?: boolean;
}

/* =============================================================================
 * Store / flags
 * ========================================================================== */

export interface IStoreFlags {
  [name: string]: boolean;
}

/* =============================================================================
 * Zod-derived driver types
 * ========================================================================== */

export type TUseCacheKeyDriver = z.infer<typeof schemaCacheKeyDriver>;
export type TUseDocsKeyDriver = z.infer<typeof schemaCollectionsKeyDriver>;

/* =============================================================================
 * RxJS helpers
 * ========================================================================== */

export type TMaybeEmptySubject = TOrNoValue<Subject<void>>;

export type TManageSubscriptionsCache = Record<
  string,
  TOrNoValue<Subscription>
>;
//

/* =============================================================================
 * Re-exports (types/services)
 * ========================================================================== */

// service type alias (value export -> aliased as a type)
export { AuthService as TAuthService } from "~/services/auth/base";

// json schema types
export type { TRecordJson, TJson, TJsonLiteral };
export type { TVueComponent, TVueFunctionalComponent };
export type { MaybeRefOrGetter as TMaybeRefOrGetter };

export * from "./charts.types";

/* =============================================================================
 * External libs / dynamic imports
 * ========================================================================== */

export type TElement = HTMLElement & Element & Node;

export type {
  Selector as TDomSelector,
  Context as TDomContext,
  Cash as TCash,
} from "cash-dom";

export type TCashDomClient = typeof import("cash-dom").default;

export type TUseProcessMonitorReturnType = ReturnType<
  typeof import("../composables/utils/use-process-monitor").useProcessMonitor
>;

// photoswipe
import type { PhotoSwipeOptions as TPhotoSwipeOptions } from "photoswipe";
import type { default as TPhotoSwipeLightbox } from "photoswipe/lightbox";
export type { TPhotoSwipeOptions, TPhotoSwipeLightbox };
export type { DataSource as TPhotoSwipeDataSource } from "photoswipe";
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
  setup?: (instance: TPhotoSwipeLightbox) => TMaybeAsync<void>;
};
// plyr
/* =============================================================================
 * Plyr (video)
 * ========================================================================== */

export type TPlayer = typeof import("plyr").default;
export type TPlayerInstance = InstanceType<TPlayer>;
export type { Options as TPlayerOptions } from "plyr";

/* =============================================================================
 * Deep-merge options
 * ========================================================================== */

export type TDeepmergeArrayMergeStrategy<T = unknown> = (
  targetArray: T[],
  sourceArray: T[],
) => T[];

export interface IDeepMergeOptions<T = unknown> {
  arrayMergeStrategy: TDeepmergeArrayMergeStrategy<T>;
}

/* =============================================================================
 * vue
 * ========================================================================== */

export type TDirective<T = unknown> = Directive<TElement, T>;

/* =============================================================================
 * FileStorage types
 * ========================================================================== */

export type TUploadFiles = {
  [path: string]: File;
};

export type TFileStorageMetadata<TRest = unknown> = TLooseRest<
  {
    key: string;
    type: string;
    size: number;
    lastModified: number;
  },
  TRest
>;
