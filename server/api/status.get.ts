export default defineEventHandler(async (event) => {
  return {
    time: new Date().toISOString(),
    status: "ok",
  };
});
