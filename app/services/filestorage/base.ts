import { BehaviorSubject } from "rxjs";

import type {
  TMaybeAsync,
  TUploadFiles,
  TFileStorageMetadata,
  TOrNoValue,
} from "~/types";

export abstract class FileStorageBase {
  readonly files$ = new BehaviorSubject<TFileStorageMetadata[]>([]);

  // batch commit files
  abstract push(files: TUploadFiles): TMaybeAsync<void>;

  // drop files:upstream by key
  abstract rm(...keys: string[]): TMaybeAsync<void>;

  // fetch upstream, refresh
  abstract pull(): TMaybeAsync<void>;

  // public file url
  abstract url(key: string): TMaybeAsync<TOrNoValue<string>>;

  // public file url
  abstract meta(key: string): TMaybeAsync<TOrNoValue<TFileStorageMetadata>>;

  init(): TMaybeAsync<void> {}
  destroy(): TMaybeAsync<void> {}
}
