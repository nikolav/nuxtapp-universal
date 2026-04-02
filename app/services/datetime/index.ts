import dayjs from "dayjs";

export class DatetimeService {
  // #ISO-8601 duration strings
  //   'P[n]Y[n]M[n]W[n]DT[n]H[n]M[n]S'

  static readonly FORMAT = {
    d: "DD-MM-YYYY",
    D: "YYYY-MM-DD",
  };
  static readonly dayjs = dayjs;

  // @@
  utcnow(template?: string) {
    return dayjs.utc().format(template);
  }
}
