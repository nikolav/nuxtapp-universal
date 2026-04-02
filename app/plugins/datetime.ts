import dayjs from "dayjs";
import "dayjs/locale/sr";
import "dayjs/locale/sr-cyrl";
import "dayjs/locale/en";

import { filter, map } from "rxjs/operators";

import { TOKEN_appEmitter$ } from "~/keys";
import { onDebug } from "~/utils/on-debug";

// core plugins
import plugin_advancedFormat from "dayjs/plugin/advancedFormat";
import plugin_customParseFormat from "dayjs/plugin/customParseFormat";
import plugin_isBetween from "dayjs/plugin/isBetween";
import plugin_localizedFormat from "dayjs/plugin/localizedFormat";
import plugin_relativeTime from "dayjs/plugin/relativeTime";
import plugin_timezone from "dayjs/plugin/timezone";
import plugin_updateLocale from "dayjs/plugin/updateLocale";
import plugin_utc from "dayjs/plugin/utc";

// // Nice-to-have in many apps
// import isoWeek from "dayjs/plugin/isoWeek";
// import quarterOfYear from "dayjs/plugin/quarterOfYear";

// .etc
// import plugin_objectSupport from "dayjs/plugin/objectSupport";
// import plugin_weekday from "dayjs/plugin/weekday";
// import plugin_dayOfYear from "dayjs/plugin/dayOfYear";
// import plugin_weekOfYear from "dayjs/plugin/weekOfYear";
// import plugin_weekYear from "dayjs/plugin/weekYear";
// import plugin_minMax from "dayjs/plugin/minMax";
import plugin_duration from "dayjs/plugin/duration";
// import plugin_toObject from "dayjs/plugin/toObject";
// import plugin_isSameOrBefore from "dayjs/plugin/isSameOrBefore";
// import plugin_isSameOrAfter from "dayjs/plugin/isSameOrAfter";
// import plugin_isLeapYear from "dayjs/plugin/isLeapYear";
// import plugin_isToday from "dayjs/plugin/isToday";

let _extended = false;

if (!_extended) {
  dayjs.extend(plugin_advancedFormat);
  dayjs.extend(plugin_customParseFormat);
  dayjs.extend(plugin_isBetween);
  dayjs.extend(plugin_localizedFormat);
  dayjs.extend(plugin_relativeTime);
  dayjs.extend(plugin_timezone);
  dayjs.extend(plugin_updateLocale);
  dayjs.extend(plugin_utc);

  // extend:etc
  // dayjs.extend(plugin_objectSupport);
  // dayjs.extend(plugin_weekday);
  // dayjs.extend(plugin_dayOfYear);
  // dayjs.extend(plugin_weekOfYear);
  // dayjs.extend(plugin_weekYear);
  // dayjs.extend(plugin_minMax);
  dayjs.extend(plugin_duration);
  // dayjs.extend(plugin_toObject);
  // dayjs.extend(plugin_isSameOrBefore);
  // dayjs.extend(plugin_isSameOrAfter);
  // dayjs.extend(plugin_isLeapYear);
  // dayjs.extend(plugin_isToday);

  _extended = true;
}

import { DatetimeService } from "~/services/datetime";

export default defineNuxtPlugin({
  name: "datetime",
  dependsOn: ["emitters"],
  setup: (_nuxtApp) => {
    // sync dayjs locale with i18n
    inject(TOKEN_appEmitter$)!
      .pipe(
        filter(
          (e) => e.type === (<any>useAppConfig().events).EVENT_LOCALE_CHANGE,
        ),
        map((e) => <string>e.payload),
      )
      .subscribe((locale) => {
        dayjs.locale(locale);
        onDebug({ "locale:switch:dayjs": locale });
      });

    return {
      provide: {
        dt: new DatetimeService(),
      },
    };
  },
});
