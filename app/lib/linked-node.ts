import type { TOrNoValue, TRecordJson } from "~/types";

export class LinkedNode<TPayload = TRecordJson> {
  public prev: TOrNoValue<LinkedNode<TPayload>>;
  public next: TOrNoValue<LinkedNode<TPayload>>;

  constructor(public payload: TPayload) {}
}
