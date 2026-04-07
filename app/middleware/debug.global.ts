import { onDebug } from "~/utils/on-debug";

export default defineNuxtRouteMiddleware((to, from) => {
  onDebug({ "middleware:debug": { to, from } });
});
