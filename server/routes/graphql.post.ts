// import { toWebRequest, sendWebResponse } from "h3";
import { yoga } from "#server/services/yoga";

export default defineEventHandler(async (event) =>
  sendWebResponse(event, await yoga.fetch(toWebRequest(event))),
);
