import { summaryRanges } from './228.汇总区间';

describe('summaryRanges', () => {
  it('should return empty array for empty input', () => {
    expect(summaryRanges([])).toEqual([]);
  });

  it('should return single element for single element array', () => {
    expect(summaryRanges([1])).toEqual(['1']);
  });

  it('should return non-consecutive numbers as separate ranges', () => {
    expect(summaryRanges([1, 3, 5])).toEqual(['1', '3', '5']);
  });

  it('should ignore duplicate numbers', () => {
    expect(summaryRanges([1, 2, 3])).toEqual(['1->3']);
  });

  it('should handle large input array', () => {
    expect(summaryRanges([1, 2, 3, 4, 5, 7, 8, 9])).toEqual(['1->5', '7->9']);
  });

  it('should handle edge cases (negative numbers, zero)', () => {
    expect(summaryRanges([-1, 0, 1, 2, 3])).toEqual(['-1->3']);
  });
});


import { summaryRangesPoint } from './228.汇总区间';

describe('summaryRangesPoint', () => {
  it('should return empty array for empty input', () => {
    expect(summaryRangesPoint([])).toEqual([]);
  });

  it('should return single element for single element array', () => {
    expect(summaryRangesPoint([1])).toEqual(['1']);
  });

  it('should return non-consecutive numbers as separate ranges', () => {
    expect(summaryRangesPoint([1, 3, 5])).toEqual(['1', '3', '5']);
  });

  it('should ignore duplicate numbers', () => {
    expect(summaryRangesPoint([1, 2, 3])).toEqual(['1->3']);
  });

  it('should handle large input array', () => {
    expect(summaryRangesPoint([1, 2, 3, 4, 5, 7, 8, 9])).toEqual(['1->5', '7->9']);
  });

  it('should handle edge cases (negative numbers, zero)', () => {
    expect(summaryRangesPoint([-1, 0, 1, 2, 3])).toEqual(['-1->3']);
  });
});
