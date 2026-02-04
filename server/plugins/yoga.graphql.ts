import { yoga } from "../services/yoga";

export default defineNitroPlugin(() => {
  // ensure module is loaded at boot
  void yoga;
});
