import get from "lodash/get";
import set from "lodash/set";
import hasPath from "lodash/has";
import unset from "lodash/unset";
import each from "lodash/each";
import transform from "lodash/transform";
import isEmpty from "lodash/isEmpty";
import isString from "lodash/isString";
import noop from "lodash/noop";

import parseBoolean from "@eturino/ts-parse-boolean";

import { onDebug } from "~/utils/on-debug";
import { coreHasOwn } from "~/utils/core-has-own";
import { to$ } from "~/utils/to-obs";
//
export default defineNuxtPlugin({
  name: "utils",
  setup: () => {
    return {
      provide: {
        // prepends '$' to export names
        //   foo => $foo
        $: {
          // lodash
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
          onDebug,
          hasOwn: coreHasOwn,
          to$,
          // core, misc.
          copy: Object.assign.bind(Object),
          cloned: structuredClone.bind(null),
          // 3rd party
          parseBoolean,
        },
      },
    };
  },
});
