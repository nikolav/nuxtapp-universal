import { defer, EMPTY, ReplaySubject } from "rxjs";
import {
  catchError,
  combineLatestWith,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
} from "rxjs/operators";

import type {
  TOrNoValue,
  TPhotoSwipeLightbox,
  TPhotoSwipeMedia,
  TPhotoSwipeOptions,
} from "~/types";
import { isPresent } from "~/utils/is-present";
import { onDebug } from "~/utils/on-debug";
import { resolved } from "~/utils/resolved";

const DEFAULTS_PHOTO_SWIPE_OPTIONS = <TPhotoSwipeOptions>{
  initialZoomLevel: "fit",
  secondaryZoomLevel: 1,
  maxZoomLevel: 5,
  bgOpacity: 0.86,
  spacing: 0.08,
  allowPanToNext: true,
  loop: true,
  pinchToClose: true,
  closeOnVerticalDrag: true,
  wheelToZoom: undefined,
  escKey: true,
  arrowKeys: true,
  trapFocus: true,
  returnFocus: true,
  imageClickAction: "zoom-or-close",
  bgClickAction: "close",
  tapAction: "toggle-controls",
  doubleTapAction: "zoom",
  clickToCloseNonZoomable: true,
  preloaderDelay: 350,
  preload: [1, 2] as [number, number],
  indexIndicatorSep: " / ",
  showHideAnimationType: "zoom",
  showAnimationDuration: 240,
  hideAnimationDuration: 120,
  zoomAnimationDuration: 240,
  easing: "ease-out",
};

const DEFAULTS_MEDIA = <Partial<TPhotoSwipeMedia>>{
  options: {},
  index: 0,
  setup: () => {},
};

export default defineNuxtPlugin({
  name: "lightbox-photoswipe",
  dependsOn: ["utils", "use-platform"],
  setup: () => {
    const { $$, $window$ } = useNuxtApp();

    const media$ = new ReplaySubject<TPhotoSwipeMedia>(1);

    // load deps once
    const deps$ = $window$.pipe(
      combineLatestWith(
        defer(() => import("photoswipe")),
        defer(() => import("photoswipe/lightbox")),
      ),
      filter(([w, mp, mpsw]) => [w, mp.default, mpsw.default].every(isPresent)),
      map(([_w, { default: PhotoSwipe }, { default: PhotoSwipeLightbox }]) => ({
        PhotoSwipe,
        PhotoSwipeLightbox,
      })),
      take(1),
      shareReplay({ bufferSize: 1, refCount: false }),
    );

    // holds the current live instance so we can destroy it
    let current: TOrNoValue<TPhotoSwipeLightbox>;

    const open$ = deps$.pipe(
      switchMap(({ PhotoSwipe, PhotoSwipeLightbox }) =>
        media$.pipe(
          // new media replaces previous instance
          // destroy old, init new, open
          switchMap((media) =>
            defer(async () => {
              // destroy previous safely
              try {
                current?.destroy();
              } catch (e) {
                onDebug({ "lightbox:photoswipe:destroy": e });
              } finally {
                current = null;
              }

              // create new instance with merged options
              const instance = new PhotoSwipeLightbox({
                ...$$.copy({}, DEFAULTS_PHOTO_SWIPE_OPTIONS, media.options),
                pswpModule: PhotoSwipe,
                dataSource: media.slides,
              });

              // pre .init setup, events, config, etc.
              await resolved(media.setup!(instance), false);

              // init before opening
              await resolved(instance.init(), false);
              current = instance;

              // open (await so caller gets 'opened' instance)
              await resolved(instance.loadAndOpen(media.index!), false);

              return <TPhotoSwipeLightbox>instance;
            }),
          ),
          shareReplay({ bufferSize: 1, refCount: false }),
        ),
      ),
      catchError((error) => {
        onDebug({ "lightbox:photoswipe": error });
        return EMPTY;
      }),
    );

    // $lightbox(media).open((instance) => { use(instance); });
    const lightbox = Object.assign(
      (media: TPhotoSwipeMedia) => {
        media$.next($$.copy({}, DEFAULTS_MEDIA, media));

        // $lightbox(media)((psw) => ...)
        return {
          open: (handle?: (psw: TPhotoSwipeLightbox) => void) =>
            open$.pipe(take(1)).subscribe({
              next: handle,
              error: (error) => onDebug({ "lightbox:photoswipe:open": error }),
            }),
        };
      },
      {
        close: async () => {
          try {
            await resolved(current?.destroy(), false);
            return true;
          } catch (e) {
            onDebug({ "lightbox:photoswipe:close": e });
          } finally {
            current = null;
          }
          return false;
        },
        instance: () => current,
      },
    );

    return {
      provide: {
        lightbox,
      },
    };
  },
});
