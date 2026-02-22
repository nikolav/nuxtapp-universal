import { serverTimestamp } from "firebase/firestore";

export const withTimestamp = (node: any) => ({
  ...node,
  "@": serverTimestamp(),
});

export const withTimestamps = (node: any) => ({
  ...node,
  updated_at: serverTimestamp(),
  ...("created_at" in node ? {} : { created_at: serverTimestamp() }),
});
