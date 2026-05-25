import { isPresent } from "~/utils/is-present";
import { normalizedIndex } from "~/utils/normalized-index";
import { LinkedNode } from "~/lib/linked-node";

export const useLinkedNodes = <T = unknown>(initial: T) => {
  const _initial_ = new LinkedNode(initial);

  const node = shallowRef(_initial_);

  const head = shallowReadonly(shallowRef(_initial_));
  const tail = computed(() => {
    let current = node.value;
    for (; isPresent(current.next); current = current.next);
    return current;
  });
  const isFirst = computed(() => _initial_ === node.value);
  const isLast = computed(() => tail.value === node.value);
  const size = computed(() => {
    let c = 1;
    for (
      let current = _initial_, tail_ = tail.value;
      current !== tail_;
      current = current.next!, c++
    );
    return c;
  });
  const index = computed(() => {
    let i = 0;
    for (
      let current = _initial_, node_ = node.value;
      current !== node_;
      current = current.next!, i++
    );
    return i;
  });

  const next = () => {
    if (!isLast.value) {
      node.value = node.value.next!;
    }
  };

  const prev = () => {
    if (!isFirst.value) {
      node.value = node.value.prev!;
    }
  };

  const first = () => {
    if (isFirst.value) return;
    node.value = _initial_;
  };

  const last = () => {
    if (isLast.value) return;
    node.value = tail.value;
  };

  const goto = (i: number) => {
    const pos = normalizedIndex(i, size.value);
    if (!(0 <= pos)) {
      throw new Error("error --index-out-of-bounds");
    }

    let current = _initial_;
    for (let i = 0; i < pos; current = current.next!, i++);
    node.value = current;
  };

  // add .next node to current
  const link = (payload: T) => {
    const old = node.value;
    const newNode = new LinkedNode(payload);
    newNode.prev = old;
    old.next = newNode;
    node.value = newNode;
  };

  return {
    // read
    node,
    head,
    tail,
    isFirst,
    isLast,
    size,
    index,

    // nav
    next,
    prev,
    first,
    last,
    goto,

    // add node after current
    link,
  };
};
