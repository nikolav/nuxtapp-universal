export default defineNuxtPlugin(() => {
  return {
    provide: {
      $$: {
        copy: Object.assign,
      },
    },
  };
});
