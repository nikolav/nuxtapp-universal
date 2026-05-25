import each from "lodash/each";
import every from "lodash/every";
import first from "lodash/first";
import get from "lodash/get";
import hasPath from "lodash/has";
import isEmpty from "lodash/isEmpty";
import isFunction from "lodash/isFunction";
import isString from "lodash/isString";
import keys from "lodash/keys";
import last from "lodash/last";
import noop from "lodash/noop";
import omit from "lodash/omit";
import once from "lodash/once";
import pick from "lodash/pick";
import reduce from "lodash/reduce";
import sample from "lodash/sample";
import set from "lodash/set";
import some from "lodash/some";
import transform from "lodash/transform";
import trim from "lodash/trim";
import trimEnd from "lodash/trimEnd";
import unset from "lodash/unset";
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
import { configItem } from "~/utils/config-item";
import { normalizedIndex } from "~/utils/normalized-index";
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
          each,
          every,
          first,
          get,
          hasPath,
          isEmpty,
          isFunction,
          isString,
          keys,
          last,
          noop,
          omit,
          once,
          pick,
          reduce,
          sample,
          set,
          some,
          transform,
          trim,
          trimEnd,
          unset,
          values,
          // local
          normalizedIndex,
          config: configItem,
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
