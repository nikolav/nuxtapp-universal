import { yoga } from "#server/services/yoga";

export default defineNitroPlugin((nitroApp) => {
  void yoga;
  console.log({ "@yoga:init": yoga });
});
