import { EMPTY, of, ReplaySubject, shareReplay, type Observable } from "rxjs";
import type { TMaybeEmptySubject } from "~/types";

export default defineNuxtPlugin(() => {
  // flags
  const isBrowser = import.meta.client;

  // streams
  const onPlatformBrowser$: Observable<void> = (
    isBrowser ? of(void 0) : EMPTY
  ).pipe(shareReplay({ bufferSize: 1, refCount: false }));

  const win = isBrowser ? globalThis.window : undefined;
  const window$: Observable<Window> = (win ? of(win) : EMPTY).pipe(
    shareReplay({ bufferSize: 1, refCount: false })
  );

  // server, no emit
  let _onDomMountedSubject: TMaybeEmptySubject;
  let onAppMounted$: Observable<void> = EMPTY;

  // client: create stream
  if (isBrowser) {
    _onDomMountedSubject = new ReplaySubject<void>(1);
    onAppMounted$ = _onDomMountedSubject.asObservable();
  }

  onNuxtReady(() => {
    // .onNuxtReady only runs on the client-side
    _onDomMountedSubject?.next();
    _onDomMountedSubject?.complete();
  });

  return {
    provide: {
      // streams
      onPlatformBrowser$,
      window$,
      onAppMounted$,
    },
  };
});
