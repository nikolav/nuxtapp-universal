import type { ZodType } from "zod";

import type { TJson, TRecordJson, TMaybeAsync } from "~/types";
import { schemaNonSpecialChars } from "~/schemas";
import { useStoreMain } from "~/stores/use-store-main.store";

interface IUseFormOptions {
  onSubmit?: (data: TRecordJson) => TMaybeAsync<void>;
}

export const useForm = <TRules extends Record<string, ZodType>>(
  key: string,
  rules: TRules,
  options?: IUseFormOptions,
) => {
  const { $$ } = useNuxtApp();
  const cache = useStoreMain();
  const FORM = `${useAppConfig().keys.KEY_FORMS}:${schemaNonSpecialChars.parse(key)}`;

  const _ = $$.copy(<IUseFormOptions>{}, { onSubmit: $$.noop }, options);

  const path = (fieldName: string) => `${FORM}.${fieldName}`;
  const isValid = (schema: ZodType, fieldName: string) =>
    schema.safeParse(cache.item(path(fieldName))).success;

  // getter/setter for each field
  const field = $$.reduce(
    rules,
    (accum, _schema, fieldName) => {
      const path_ = path(fieldName);
      accum[fieldName] = computed<TJson>({
        get: () => cache.item(path_),
        set: (value) => cache.push({ [path_]: value }),
      });
      return accum;
    },
    <Record<string, Ref<TJson>>>{},
  );

  const data = computed(() =>
    $$.reduce(
      rules,
      (d, _schema, fieldName) => {
        d[fieldName] = cache.item(path(fieldName));
        return d;
      },
      <TRecordJson>{},
    ),
  );

  const valid = computed(() => $$.every(rules, isValid));

  const error = $$.reduce(
    rules,
    (res, schema, fieldName) => {
      res[fieldName] = computed(() => !isValid(schema, fieldName));
      return res;
    },
    <Record<string, Ref<boolean>>>{},
  );

  const handle = () => {
    if (!valid.value) return;
    _.onSubmit?.(data.value);
  };

  return {
    FORM,
    valid,
    error,
    field,
    data,
    handle,
  };
};
