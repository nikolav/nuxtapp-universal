import type { TOrNoValue } from "~/types";

export class LinkedNode<T = unknown> {
  public prev: TOrNoValue<LinkedNode<T>>;
  public next: TOrNoValue<LinkedNode<T>>;

  constructor(public payload: T) {}
}
