import type { InjectionKey } from "vue";

import type { Subject } from "rxjs";

import type { IEventApp } from "~/types";

export const TOKEN_foo = <InjectionKey<string>>Symbol();
export const TOKEN_appEmitter$ = <InjectionKey<Subject<IEventApp>>>Symbol();
