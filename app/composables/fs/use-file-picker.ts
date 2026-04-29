import { from, Observable, of } from "rxjs";
import { catchError, mergeMap, reduce, switchMap } from "rxjs/operators";

import type { IPickFileOptions } from "~/types";
import { useProcessMonitor } from "~/composables/utils/use-process-monitor";

const DEFAULT_MIME = "application/octet-stream";
const extToMime: Record<string, string> = {
  // text
  ".txt": "text/plain",
  ".html": "text/html",
  ".htm": "text/html",
  ".css": "text/css",
  ".csv": "text/csv",
  ".xml": "application/xml",

  // application
  ".json": "application/json",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".ts": "application/typescript",
  ".pdf": "application/pdf",
  ".zip": "application/zip",
  ".gz": "application/gzip",
  ".tar": "application/x-tar",
  ".rar": "application/vnd.rar",
  ".7z": "application/x-7z-compressed",

  // images
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".bmp": "image/bmp",
  ".tiff": "image/tiff",
  ".avif": "image/avif",

  // audio
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".ogg": "audio/ogg",
  ".m4a": "audio/mp4",
  ".aac": "audio/aac",
  ".flac": "audio/flac",

  // video
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".oggv": "video/ogg",
  ".mov": "video/quicktime",
  ".avi": "video/x-msvideo",
  ".mkv": "video/x-matroska",

  // fonts
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".eot": "application/vnd.ms-fontobject",

  // documents
  ".doc": "application/msword",
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xls": "application/vnd.ms-excel",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".ppt": "application/vnd.ms-powerpoint",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  // misc
  ".md": "text/markdown",
  ".wasm": "application/wasm",
};

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
      switchMap((handles) =>
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
      ps.monitor(() =>
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
  const mimeMap: Record<string, string[]> = {};
  const entries = accept
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

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
      const mime = extToMime[e] || DEFAULT_MIME;
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
