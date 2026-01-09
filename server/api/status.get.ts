export default defineEventHandler(async (event) => {
  const cache = useStorage("redis");

  const cackeMain = await cache.getItem("main");

  return {
    cackeMain,
    time: new Date().toISOString(),
    status: "ok",
  };
});
