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

import parseBoolean from "@eturino/ts-parse-boolean";

import { onDebug } from "~/utils/on-debug";
import { coreHasOwn } from "~/utils/core-has-own";
import { to$ } from "~/utils/to-obs";
import { resolved } from "~/utils/resolved";
import { error$$ } from "~/utils/error-obs";
import { value$$ } from "~/utils/to-value-obs";
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
          error$$,
          to$,
          resolved,
          onDebug,
          hasOwn: coreHasOwn,
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
