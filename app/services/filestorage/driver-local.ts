import { z } from "zod";
import each from "lodash/each";
import keys from "lodash/keys";
import omit from "lodash/omit";
import reduce from "lodash/reduce";
import trim from "lodash/trim";

import type { TFileStorageMetadata, TUploadFiles } from "~/types";
import { FileStorageBase } from "./base";

const objectMetada = (key: string) =>
  z
    .object({
      name: z.string(),
      type: z.string(),
      size: z.number(),
      lastModified: z.number(),
    })
    .pipe(z.transform((node) => ({ ...omit(node, ["name"]), key })));

export class FileStorageDriverLocal extends FileStorageBase {
  // @@static props
  protected static storage: { [path: string]: File } = {};

  // @@instance props
  protected prefix: string;

  // @@
  constructor(prefix = "/") {
    super();
    this.prefix = `/${trim(prefix, "/")}`;
  }

  // batch commit files
  push(files: TUploadFiles) {
    Object.assign(
      FileStorageDriverLocal.storage,
      prefixedPaths(files, this.prefix),
    );
  }

  // drop files:upstream by key
  rm(...keys: string[]) {
    each(keys, (key) => {
      delete FileStorageDriverLocal.storage[prefixed(key, this.prefix)];
    });
  }

  // fetch upstream, refresh
  pull() {
    this.files$.next(
      reduce(
        keys(FileStorageDriverLocal.storage).filter((path) =>
          path.startsWith(this.prefix),
        ),
        (res, path) => {
          res.push(
            objectMetada(path).parse(FileStorageDriverLocal.storage[path]),
          );
          return res;
        },
        <TFileStorageMetadata[]>[],
      ),
    );
  }

  // public file url
  url(key: string) {
    const path = prefixed(key, this.prefix);
    return path in FileStorageDriverLocal.storage
      ? URL.createObjectURL(FileStorageDriverLocal.storage[path]!)
      : undefined;
  }

  // public file url
  meta(key: string) {
    const path = prefixed(key, this.prefix);
    return path in FileStorageDriverLocal.storage
      ? objectMetada(path).parse(FileStorageDriverLocal.storage[path])
      : undefined;
  }

  // init(): TMaybeAsync<void> {}
  // destroy(): TMaybeAsync<void> {}
}

// @@helpers
function prefixed(key: string, prefix = "/") {
  const prefix_ = trim(prefix, "/");
  return [prefix_ ? `/${prefix_}` : "", trim(key, "/")].join("/");
}
function prefixedPaths(files: TUploadFiles, prefix = "/") {
  return reduce(
    files,
    (res, file, key) => {
      res[prefixed(key, prefix)] = file;
      return res;
    },
    <TUploadFiles>{},
  );
}
