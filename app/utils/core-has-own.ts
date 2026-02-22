const has_ = Function.prototype.call.bind(Object.prototype.hasOwnProperty);
export const coreHasOwn = <TNode = unknown, TKey = any>(
  node: TNode,
  key: TKey,
) => <boolean>has_(Object(node), key);

export const hasOwn = coreHasOwn;
