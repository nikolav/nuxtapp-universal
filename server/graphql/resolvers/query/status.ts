export const status = (_: unknown, args: unknown) => {
  console.log({ args });
  return $$.res({
    x: $$.get(args, "x", null),
    foo: "bar",
    dt: ((d) => `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`)(
      new Date(),
    ),
  });
};
