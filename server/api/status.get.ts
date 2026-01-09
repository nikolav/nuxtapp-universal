export default defineEventHandler((event) => {
  return {
    time: new Date().toISOString(),
    status: "ok",
  };
});
