import { from, Observable, of } from "rxjs";
import { catchError, mergeMap, reduce, switchMap } from "rxjs/operators";

import { useProcessMonitor } from "~/composables/utils/use-process-monitor";
import type { IPickFileOptions } from "~/types";

// const picker = useFilePicker();
// picker.open({ accept: 'image/*', multiple: true })
//   .subscribe(files => handle(files))
export const useFilePicker = () => {
  const { $window$, $$ } = useNuxtApp();
  const ps = useProcessMonitor();

  const isProgressive$ = (opts: IPickFileOptions = {}) =>
    $window$.pipe(
      switchMap((window) =>
        of(!opts.directory && "showOpenFilePicker" in window),
      ),
    );

  const openProgressive$ = (opts: IPickFileOptions = {}) =>
    $window$.pipe(
      switchMap((window) =>
        from<Promise<globalThis.FileSystemFileHandle[]>>(
          (<any>window).showOpenFilePicker({
            multiple: Boolean(opts.multiple),
            types: opts.accept ? pickerTypes(opts.accept) : undefined,
            excludeAcceptAllOption: Boolean(opts.accept),
          }),
        ),
      ),
      mergeMap((handles) =>
        from(handles).pipe(mergeMap((h) => from(h.getFile()))),
      ),
      reduce(
        (ls, file) => {
          ls.push(file);
          return ls;
        },
        <File[]>[],
      ),
    );

  const openFallback$ = (opts: IPickFileOptions = {}) =>
    $window$.pipe(
      switchMap(
        (window) =>
          new Observable<File[]>((observer) => {
            const document = window.document;
            const input = document.createElement("input");

            input.type = "file";
            // allow selecting same file twice
            input.value = "";
            if (opts.accept) input.accept = opts.accept;
            if (opts.multiple) input.multiple = true;
            if (opts.capture)
              input.setAttribute("capture", String(opts.capture));
            // non-standard
            if (opts.directory) (input as any).webkitdirectory = true;

            // ios/safari reliability: must be in dom
            input.style.position = "fixed";
            input.style.left = "-9999px";
            input.style.top = "0";
            input.style.opacity = "0";

            const parent = document.body || document.documentElement;
            parent.appendChild(input);

            let settled = false;

            const cleanup = () => {
              input.removeEventListener("change", onChange);
              window.removeEventListener("focus", onFocus, true);

              // defer removal a tick (safari can be sensitive)
              setTimeout(() => {
                try {
                  input.remove();
                } catch {
                  // ignore
                }
              }, 0);
            };

            const settle = (files: File[]) => {
              if (settled) return;
              settled = true;
              observer.next(files);
              observer.complete();
              cleanup();
            };

            const onChange = () => {
              const list = input.files;
              settle($$.isEmpty(list) ? [] : Array.from(list!));
            };

            // cancel fallback: focus returns and no files were chosen
            const onFocus = () => {
              // wait a moment for change to fire if it will
              setTimeout(() => {
                if (!settled) {
                  const list = input.files;
                  if ($$.isEmpty(list)) settle([]);
                }
              }, 256);
            };

            input.addEventListener("change", onChange);
            window.addEventListener("focus", onFocus, true);

            try {
              input.click();
            } catch (err) {
              if (!settled) {
                settled = true;
                observer.error(err);
                cleanup();
              }
            }

            // teardown on unsubscribe
            return () => {
              if (!settled) {
                settled = true;
                cleanup();
              }
            };
          }),
      ),
    );

  const open = (opts: IPickFileOptions = {}) =>
    from(
      ps.exec(() =>
        isProgressive$(opts).pipe(
          switchMap((isProgressive) =>
            isProgressive ? openProgressive$(opts) : openFallback$(opts),
          ),
          catchError((err) => {
            if ("AbortError" === err?.name || 20 === err?.code)
              return of(<File[]>[]);
            throw err;
          }),
        ),
      ),
    );

  // # export
  return { open, ps };
};

// --utils
function acceptTypes(accept: string) {
  const entries = accept
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const mimeMap: Record<string, string[]> = {};

  const extToMime: Record<string, string> = {
    ".json": "application/json",
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".txt": "text/plain",
    ".csv": "text/csv",
  };

  for (const e of entries) {
    // MIME wildcard like image/*
    if (e.endsWith("/*")) {
      mimeMap[e] = [];
      continue;
    }

    // Full MIME type like application/json
    if (e.includes("/")) {
      mimeMap[e] ||= [];
      continue;
    }

    // Extension like .png
    if (e.startsWith(".")) {
      const mime = extToMime[e] || "application/octet-stream";
      mimeMap[mime] ||= [];
      mimeMap[mime].push(e);
    }
  }

  return mimeMap;
}

function pickerTypes(accept: string, description = "Accepted") {
  return [
    {
      description,
      accept: acceptTypes(accept),
    },
  ];
}
