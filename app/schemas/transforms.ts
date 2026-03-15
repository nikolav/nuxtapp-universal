import { z } from "zod";
import type { Models } from "appwrite";

import type { TOrNoValue, TRecordJson } from "~/types";

export const transformAppwriteDoc = z.transform(
  (d: TOrNoValue<Models.DefaultRow>) =>
    d
      ? <TRecordJson>{
          ...d,
          id: d.$id,
          data: JSON.parse(d.data ?? "{}"),
          created_at: d.$createdAt,
          updated_at: d.$updatedAt,
        }
      : <TRecordJson>{},
);
