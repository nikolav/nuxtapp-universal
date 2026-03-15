import { BehaviorSubject, of, Subscription, from, EMPTY } from "rxjs";
import { distinctUntilChanged, map, switchMap, tap } from "rxjs/operators";
import type { TablesDB, Realtime } from "appwrite";
import { Query, ID } from "appwrite";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import reduce from "lodash/reduce";
import unset from "lodash/unset";

import type {
  TOrNoValue,
  TRecordJson,
  TUseCleanup,
  TUseProcessMonitorReturnType,
} from "~/types";
import { transformAppwriteDoc } from "~/schemas";
import { CacheByKeyBase } from "~/services/doc/base";
import { deepmerge } from "~/utils/deepmerge";

const merged = deepmerge();
export class CacheByKeyDriverAppwrite extends CacheByKeyBase {
  private DB_ID = "69b4317e00167e67dfa3";
  private TABLE_ID = "69b60a080015864baa25";
  private subscription_: TOrNoValue<Subscription>;

  data$ = new BehaviorSubject<TRecordJson>({});

  constructor(
    protected key: string,
    protected ps: TUseProcessMonitorReturnType,
    protected tables: TablesDB,
    protected realtime: Realtime,
    protected cleanup: TUseCleanup,
  ) {
    super();
  }

  async push(patch: TRecordJson) {
    if (isEmpty(patch)) return;
    await this.ps.monitor(() =>
      of(<TOrNoValue<string>>this.data$.getValue()["$id"]).pipe(
        switchMap((rowId) =>
          rowId
            ? from(
                this.tables.getRow({
                  databaseId: this.DB_ID,
                  tableId: this.TABLE_ID,
                  rowId,
                }),
              ).pipe(
                switchMap((d) =>
                  from(
                    this.tables.updateRow({
                      databaseId: this.DB_ID,
                      tableId: this.TABLE_ID,
                      rowId,
                      data: {
                        data: JSON.stringify(
                          merged(JSON.parse(d.data ?? "{}"), patch),
                        ),
                      },
                    }),
                  ),
                ),
              )
            : from(
                this.tables.createRow({
                  databaseId: this.DB_ID,
                  tableId: this.TABLE_ID,
                  rowId: ID.unique(),
                  data: {
                    key: this.key,
                    data: JSON.stringify(patch),
                  },
                }),
              ).pipe(
                tap((d) => {
                  this.data$.next(transformAppwriteDoc.parse(d));
                }),
              ),
        ),
      ),
    );
  }

  // drop keys
  async drop(...paths: string[]) {
    if (isEmpty(paths)) return;
    await this.ps.monitor(() =>
      of(<TOrNoValue<string>>this.data$.getValue()["$id"]).pipe(
        switchMap((rowId) =>
          rowId
            ? from(
                this.tables.getRow({
                  databaseId: this.DB_ID,
                  tableId: this.TABLE_ID,
                  rowId,
                }),
              ).pipe(
                switchMap((d) =>
                  from(
                    this.tables.updateRow({
                      databaseId: this.DB_ID,
                      tableId: this.TABLE_ID,
                      rowId,
                      data: {
                        data: JSON.stringify(
                          reduce(
                            paths,
                            (res, path) => {
                              unset(res, path);
                              return res;
                            },
                            JSON.parse(d.data ?? "{}"),
                          ),
                        ),
                      },
                    }),
                  ),
                ),
              )
            : EMPTY,
        ),
      ),
    );
  }

  // load cached data
  async pull() {
    this.data$.next(
      (await this.ps.monitor(async () =>
        transformAppwriteDoc.parse(
          get(
            await this.tables.listRows({
              databaseId: this.DB_ID,
              tableId: this.TABLE_ID,
              queries: [Query.equal("key", this.key), Query.limit(1)],
            }),
            "rows.0",
          ),
        ),
      ))!,
    );
  }

  override async init() {
    this.subscription_ = this.data$
      .pipe(
        map((d) => d["$id"]),
        distinctUntilChanged(),
        switchMap((id) =>
          from(this.cleanup.run()).pipe(
            tap(() => {
              if (!id) return;
              const sub_ = this.realtime.subscribe(
                `databases.${this.DB_ID}.tables.${this.TABLE_ID}.rows.${id}`,
                (event) => {
                  this.data$.next(transformAppwriteDoc.parse(event.payload));
                },
              );
              this.cleanup.task(async () => {
                (await sub_).close();
              });
            }),
          ),
        ),
      )
      .subscribe();
    await this.pull();
  }

  override destroy() {
    this.subscription_?.unsubscribe();
    this.cleanup.run();
  }
}
