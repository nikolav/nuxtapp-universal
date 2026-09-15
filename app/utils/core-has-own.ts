import { isPresent } from "~/utils/is-present";

const has_ = Function.prototype.call.bind(Object.prototype.hasOwnProperty);

export const coreHasOwn = <TNode = unknown, TKey = any>(
  node: TNode,
  key: TKey,
) => (isPresent(node) ? <boolean>has_(Object(node), key) : false);

export const hasOwn = coreHasOwn;
