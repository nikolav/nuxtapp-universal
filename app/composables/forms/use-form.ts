import type { ZodType } from "zod";

import { useStoreMain } from "~/stores";
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
  const storeMain = useStoreMain();
  const FORM = `${useAppConfig().keys.KEY_FORMS}:${schemaNonSpecialChars.parse(key)}`;
  const _ = $$.copy(<IUseFormOptions>{}, { onSubmit: $$.noop }, options);

  // getter/setter for each field
  const field = $$.reduce(
    rules,
    (accum, _s, fieldName) => {
      const path = `${FORM}.${fieldName}`;
      accum[fieldName] = computed({
        get: () => storeMain.item(path),
        set: (value) => {
          storeMain.push({ [path]: value });
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
        d[fieldName] = storeMain.item(`${FORM}.${fieldName}`);
        return d;
      },
      <TRecordJson>{},
    ),
  );

  const valid = computed(() =>
    $$.every(
      rules,
      (schema, fieldName) =>
        schema.safeParse(storeMain.item(`${FORM}.${fieldName}`)).success,
    ),
  );

  const error = computed(() =>
    $$.reduce(
      rules,
      (res, schema, fieldName) => {
        res[fieldName] = schema.safeParse(
          storeMain.item(`${FORM}.${fieldName}`),
        ).success;
        return res;
      },
      <Record<string, boolean>>{},
    ),
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
