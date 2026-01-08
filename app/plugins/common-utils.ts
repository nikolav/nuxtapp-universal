import each from "lodash/each";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import transform from "lodash/transform";

import { onDebug } from "~/utils/on-debug";
//
export default defineNuxtPlugin((_nuxtapp) => {
  return {
    provide: {
      // prepends '$' to export names
      //   foo => $foo
      $: {
        // lodash
        each,
        get,
        isEmpty,
        transform,
        // local
        onDebug,
        // core, misc.
        copy: Object.assign.bind(Object),
        cloned: structuredClone.bind(null),
      },
    },
  };
});
