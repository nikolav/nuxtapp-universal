export default defineEventHandler((event) => {
  console.log(`@request:server [${getRequestURL(event)}]`);
});
