import { setNumberPages } from "../setNumberPages";

describe.each([
  [10, 5, 1],
  [20, 10, 1],
  [15, 7, 2],
  [5, 10, 1],
])("setNumberPages(%i, %i)", (total, max, expected) => {
  test('returns ${expected} for total ${total} and max ${max}', () => {
    const result = setNumberPages({ total, max });
    expect(result).toBe(expected);
  });
});