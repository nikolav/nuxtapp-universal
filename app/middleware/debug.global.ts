import { onDebug } from "~/utils/on-debug";

export default defineNuxtRouteMiddleware((to, from) => {
  onDebug({ "mw:debug": { to, from } });
});
