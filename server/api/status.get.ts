export default defineEventHandler(async (event) =>
  $$.res({
    status: "ok",
    time: new Date().toISOString(),
  }),
);
