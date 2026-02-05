import type { ZodType } from "zod";

import { useStoreMain } from "~/stores/use-store-main.store";
import { schemaNonSpecialChars } from "~/schemas";
import type { TJson, TRecordJson } from "~/types";

interface IUseFormOptions {
  onSubmit?: (data: TRecordJson) => void;
}

export const useForm = (
  key: string,
  rules: Record<string, ZodType>,
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
    (accum, _s, fieldName) => {
      const path_ = path(fieldName);
      accum[fieldName] = computed({
        get: () => cache.item(path_),
        set: (value) => {
          cache.push({ [path_]: value });
        },
      });
      return accum;
    },
    <Record<string, Ref<TJson>>>{},
  );

  const data = computed(() =>
    $$.reduce(
      rules,
      (d, _s, fieldName) => {
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
      res[fieldName] = computed(() => isValid(schema, fieldName));
      return res;
    },
    <Record<string, Ref<boolean>>>{},
  );

  const handle = () => {
    if (!valid.value) return;
    _.onSubmit(data.value);
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
// const form = useForm('f1', { email: schemaEmail }, { onSubmit: (data) => { access(data); } })
//   <form @submit.prevent="form.handle">
//   <input v-model="form.field.email.value" />
//   <button type="submit" :disabled="!form.valid.value">Launch instance. 🚀</button>
//   <span v-if="form.error.email.value">Invalid email. Try again.</span>
