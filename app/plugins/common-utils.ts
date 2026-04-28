import get from "lodash/get";
import set from "lodash/set";
import hasPath from "lodash/has";
import unset from "lodash/unset";
import each from "lodash/each";
import transform from "lodash/transform";
import isEmpty from "lodash/isEmpty";
import isString from "lodash/isString";
import trim from "lodash/trim";
import noop from "lodash/noop";
import reduce from "lodash/reduce";
import some from "lodash/some";
import every from "lodash/every";
import once from "lodash/once";
import isFunction from "lodash/isFunction";
import omit from "lodash/omit";
import pick from "lodash/pick";
import keys from "lodash/keys";
import values from "lodash/values";

import { v4 as uuid } from "uuid";
import parseBoolean from "@eturino/ts-parse-boolean";
import { nanoid } from "nanoid";

import { onDebug } from "~/utils/on-debug";
import { hasOwn } from "~/utils/core-has-own";
import { to$ } from "~/utils/to-obs";
import { resolved } from "~/utils/resolved";
import { error$$ } from "~/utils/error-obs";
import { value$$ } from "~/utils/to-value-obs";
import { deepmerge } from "~/utils/deepmerge";
import { StatusResult } from "~/utils/status-result";
import { parseShell } from "~/utils/parse-shell";
//
export default defineNuxtPlugin({
  name: "utils",
  enforce: "pre",
  setup: () => {
    return {
      provide: {
        // prepends '$' to export names
        //   foo => $foo
        $: {
          // lodash
          keys,
          values,
          omit,
          pick,
          once,
          isFunction,
          some,
          every,
          reduce,
          trim,
          noop,
          each,
          get,
          isEmpty,
          transform,
          set,
          unset,
          hasPath,
          isString,
          // local
          parseShell,
          res: StatusResult.init.bind(StatusResult),
          deepmerge,
          value$$,
          error$$,
          to$,
          resolved,
          onDebug,
          hasOwn,
          // core, misc.
          Math,
          copy: Object.assign.bind(Object),
          cloned: structuredClone.bind(null),
          // 3rd party
          nanoid,
          uuid,
          parseBoolean,
        },
      },
    };
  },
});
