const cloned_ = globalThis.structuredClone.bind(null);
export const cloned = <T = any>(
  node: T,
  options?: globalThis.StructuredSerializeOptions,
) => cloned_(node, options);
