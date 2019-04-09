import { cursorType } from "../types";

export async function runIterationUtilCompletion<T>(
  iterator: IterableIterator<T[] | Promise<[T[], cursorType]>>
): Promise<T[]> {
  let { done, value } = iterator.next();
  let resp = await value;
  while (!done) {
    ({ done, value } = iterator.next(resp));
    resp = await value;
  }
  return resp as T[];
}
