import { sendWebResponse } from "h3";
import { toWebRequest } from "h3";

import { yoga } from "#server/services/yoga";

export default defineEventHandler(async (event) => {
  const req = toWebRequest(event);
  const res = await yoga.fetch(req);
  return sendWebResponse(event, res);
});
