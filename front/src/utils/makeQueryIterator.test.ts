import { cursorType } from '../types';

import { makeQueryIterator } from './makeQueryIterator';
import { runIterationUtilCompletion } from './runIterationUtilCompletion';

interface MockItem {
  value: any;
}
interface MockSearchType {
  cursor?: cursorType;
  param: any;
}
const defaultSearchParams = { param: Symbol('MockParam') };
const mockCursor = 'mockCursor';

const defaultExpectedValue: MockItem[] = [...Array(30).keys()].map((value: number) => ({
  value,
}));
const iterationsResponse = [
  defaultExpectedValue.slice(0, 10),
  defaultExpectedValue.slice(10, 20),
  defaultExpectedValue.slice(20, 30),
];
const defaultExpectedCalls = iterationsResponse.length + 1;
type executSearchRepsonse = [MockItem[], cursorType];
const defaultExecuteSearch = jest.fn();

describe('makeQueryIterator', () => {
  beforeEach(() => {
    defaultExecuteSearch.mockReset();
    iterationsResponse.forEach(response => {
      defaultExecuteSearch.mockImplementationOnce(() =>
        Promise.resolve([response, mockCursor] as executSearchRepsonse),
      );
    });
    defaultExecuteSearch.mockImplementationOnce(() => Promise.resolve([[], null]));
  });
  it('Return all data until empty if not filtered', async () => {
    const iter = makeQueryIterator<MockItem, MockSearchType>({
      searchParams: defaultSearchParams,
      executeSearch: defaultExecuteSearch,
    });
    const result = await runIterationUtilCompletion<MockItem>(iter);
    expect(defaultExecuteSearch).toHaveBeenCalledTimes(defaultExpectedCalls);
    expect(result).toEqual(defaultExpectedValue);
  });
  it('Return only filtered data if filter', async () => {
    const filterData = (item: MockItem) => item.value % 2 === 0;
    const iter = makeQueryIterator<MockItem, MockSearchType>({
      searchParams: defaultSearchParams,
      executeSearch: defaultExecuteSearch,
      filterData,
    });
    const result = await runIterationUtilCompletion<MockItem>(iter);
    expect(defaultExecuteSearch).toHaveBeenCalledTimes(defaultExpectedCalls);
    expect(result).toEqual(defaultExpectedValue.filter(filterData));
  });
  it('Fails if execute search fails', async () => {
    const mockError = new Error('mockError');
    const executeSearch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve([iterationsResponse[0], mockCursor] as executSearchRepsonse))
      .mockImplementationOnce(() => Promise.reject(mockError));
    const iter = makeQueryIterator<MockItem, MockSearchType>({
      searchParams: defaultSearchParams,
      executeSearch,
    });
    let thrownError = null;
    try {
      await runIterationUtilCompletion<MockItem>(iter);
    } catch (err) {
      thrownError = err;
    }
    expect(executeSearch).toHaveBeenCalledTimes(2);
    expect(thrownError).toEqual(mockError);
  });
  it('Consider isDone function to stop iteration', async () => {
    const executeSearch = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve([iterationsResponse[0], mockCursor] as executSearchRepsonse))
      .mockImplementationOnce(() => Promise.resolve([iterationsResponse[1], mockCursor] as executSearchRepsonse));
    const isDone = jest
      .fn()
      .mockImplementationOnce(() => false)
      .mockImplementationOnce(() => true);
    const iter = makeQueryIterator<MockItem, MockSearchType>({
      searchParams: defaultSearchParams,
      executeSearch,
      isDone,
    });
    const result = await runIterationUtilCompletion<MockItem>(iter);
    expect(executeSearch).toHaveBeenCalledTimes(2);
    expect(result).toEqual([...iterationsResponse[0], ...iterationsResponse[1]]);
  });
});
