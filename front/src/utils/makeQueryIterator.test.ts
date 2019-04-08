import { makeQueryIterator, cursorType } from "./makeQueryIterator";

describe("makeQueryIterator", () => {
  interface MockItem {
    value: any;
  }
  interface MockSearchType {
    cursor?: cursorType;
    param: any;
  }
  //   const defaultIsDone = jest.fn(() => true);
  const defaultSearchParams = { param: Symbol("MockParam") };
  const mockCursor = "mockCursor";
  const defaultMockItems: MockItem[] = [...Array(10).keys()].map(
    (value: number) => ({
      value
    })
  );
  const defaultMockItems2: MockItem[] = [...Array(10).keys()].map(
    (value: number) => ({
      value: value + 10
    })
  );
  type executSearchRepsonse = [MockItem[], cursorType];
  type executeSearchType = (
    params: MockSearchType
  ) => Promise<executSearchRepsonse>;
  const defaultExecuteSearch: executeSearchType = jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve([defaultMockItems, mockCursor] as executSearchRepsonse)
    )
    .mockImplementationOnce(() =>
      Promise.resolve([defaultMockItems2, mockCursor] as executSearchRepsonse)
    )
    .mockImplementationOnce(() => Promise.resolve([[], null]));

  it("Return all data if not filtered", async () => {
    const iter = makeQueryIterator<MockItem, MockSearchType>({
      searchParams: defaultSearchParams,
      executeSearch: defaultExecuteSearch
    });
    let { done, value } = iter.next();
    let resp = await value;
    while (!done) {
      ({ done, value } = iter.next(resp));
      resp = await value;
    }
    expect(defaultExecuteSearch).toHaveBeenCalledTimes(3);
    const expected = [...defaultMockItems, ...defaultMockItems2];
    expect(resp).toEqual(expected);
  });
  it.todo("Return only filtered data if filter");
  it.todo("Fails if execute search fails");
  it.todo("Goes until no more items if no isDone function is passed");
  it.todo("Consider isDone function to stop iteration");
});
