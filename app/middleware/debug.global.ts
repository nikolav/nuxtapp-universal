export default defineNuxtRouteMiddleware((to, from) => {
  console.log({
    "middleware:debug": {
      from,
      to,
    },
  });
});
