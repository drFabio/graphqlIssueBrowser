export type cursorType = string | null;
export interface WithCursor {
  cursor?: cursorType;
}
export type dataSearcher<T, SearchType> = (
  params: SearchType
) => T[] | Promise<[T[], cursorType]>;
export type responseFilter = (item: any) => boolean;
export type completitionChecker = (
  filteredData: any[],
  currentData?: any[]
) => boolean;

export interface makeQueryIteratorParams<
  ReturnType,
  SearchType extends WithCursor
> {
  searchParams: SearchType;
  executeSearch: dataSearcher<ReturnType, SearchType>;
  filterData?: responseFilter;
  isDone?: completitionChecker;
}
/**
 * Makes a query iterator that execute the given query
 * until no items or when isDone says is time to stop
 */
export function* makeQueryIterator<ItemType, SearchType extends WithCursor>({
  searchParams,
  executeSearch,
  filterData,
  isDone
}: makeQueryIteratorParams<ItemType, SearchType>): IterableIterator<
  ItemType[] | Promise<[ItemType[], cursorType]>
> {
  let response: ItemType[] = [];
  let [items, cursor] = yield executeSearch(searchParams);
  if (filterData) {
    response.unshift(...items.filter(filterData));
  } else {
    response = [...items];
  }
  const mustContinue = () => {
    let ret = items.length > 0;
    if (ret && isDone) {
      ret = !isDone(response, items);
    }
    return ret;
  };
  while (mustContinue()) {
    [items, cursor] = yield executeSearch({ ...searchParams, cursor });
    let dataToAdd = items;
    if (dataToAdd && dataToAdd.length) {
      if (filterData) {
        dataToAdd = items.filter(filterData);
      }
      response.push(...dataToAdd);
    }
  }
  return response;
}
