import type { InjectionKey } from "vue";
import type { BehaviorSubject, Subject } from "rxjs";

import type { IEventApp, TRecordJson } from "~/types";

export const TOKEN_foo = <InjectionKey<string>>Symbol();
export const TOKEN_appEmitter$ = <InjectionKey<Subject<IEventApp>>>Symbol();
export const TOKEN_appState$ = <InjectionKey<BehaviorSubject<TRecordJson>>>(
  Symbol()
);
