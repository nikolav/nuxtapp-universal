import { serverTimestamp, Timestamp } from "firebase/firestore";

import type { TServerTimestap } from "~/types";

export const withTimestamp = (node: any) => ({
  ...node,
  "@": serverTimestamp(),
});

export const withTimestamps = (node: any) => ({
  ...node,
  updated_at: serverTimestamp(),
  ...("created_at" in node ? {} : { created_at: serverTimestamp() }),
});

export const ms = (node: TServerTimestap) =>
  new Timestamp(node.seconds, node.nanoseconds).toMillis();
