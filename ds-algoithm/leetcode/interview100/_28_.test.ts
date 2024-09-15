import { findStrIndexOf } from './_28_find_str';

describe('findStrIndex', () => {
  it('should return -1 for empty haystack', () => {
    expect(findStrIndexOf('', 'needle')).toBe(-1);
  });

  it('should return -1 when needle is not found in haystack', () => {
    expect(findStrIndexOf('haystack', 'notfound')).toBe(-1);
  });

  it('should return 0 when needle is found at the beginning of haystack', () => {
    expect(findStrIndexOf('needlehaystack', 'needle')).toBe(0);
  });

  it('should return correct index when needle is found in the middle of haystack', () => {
    expect(findStrIndexOf('haystackneedlehaystack', 'needle')).toBe(8);
  });

  it('should return correct index when needle is found at the end of haystack', () => {
    expect(findStrIndexOf('haystackneedle', 'needle')).toBe(8);
  });

  it('should return 0 when haystack and needle are the same', () => {
    expect(findStrIndexOf('needle', 'needle')).toBe(0);
  });

  it('should return correct index when haystack contains multiple occurrences of needle', () => {
    expect(findStrIndexOf('haystackneedlehaystackneedle', 'needle')).toBe(8);
  });

  it('leetcode case 1', () => {
    expect(findStrIndexOf('sadbutsad', 'sad')).toBe(0);
  })

  it('leetcode case 2', () => {
    expect(findStrIndexOf('leetcode', 'leeto')).toBe(-1);
  })
});

import { findStrIndexSlice } from './_28_find_str';

describe('findStrIndexSlice', () => {
  it('should return -1 for empty haystack', () => {
    expect(findStrIndexSlice('', 'needle')).toBe(-1);
  });

  it('should return -1 when needle is not found in haystack', () => {
    expect(findStrIndexSlice('haystack', 'notfound')).toBe(-1);
  });

  it('should return 0 when needle is found at the beginning of haystack', () => {
    expect(findStrIndexSlice('needlehaystack', 'needle')).toBe(0);
  });

  it('should return correct index when needle is found in the middle of haystack', () => {
    expect(findStrIndexSlice('haystackneedlehaystack', 'needle')).toBe(8);
  });

  it('should return correct index when needle is found at the end of haystack', () => {
    expect(findStrIndexSlice('haystackneedle', 'needle')).toBe(8);
  });

  it('should return 0 when haystack and needle are the same', () => {
    expect(findStrIndexSlice('needle', 'needle')).toBe(0);
  });

  it('should return correct index when haystack contains multiple occurrences of needle', () => {
    expect(findStrIndexSlice('haystackneedlehaystackneedle', 'needle')).toBe(8);
  });

  it('leetcode case 1', () => {
    expect(findStrIndexSlice('sadbutsad', 'sad')).toBe(0);
  })

  it('leetcode case 2', () => {
    expect(findStrIndexSlice('leetcode', 'leeto')).toBe(-1);
  })
});

import { findStrIndexFlag } from './_28_find_str';

describe('findStrIndexFlag', () => {
  it('should return -1 for empty haystack', () => {
    expect(findStrIndexFlag('', 'needle')).toBe(-1);
  });

  it('should return -1 when needle is not found in haystack', () => {
    expect(findStrIndexFlag('haystack', 'notfound')).toBe(-1);
  });

  it('should return 0 when needle is found at the beginning of haystack', () => {
    expect(findStrIndexFlag('needlehaystack', 'needle')).toBe(0);
  });

  it('should return correct index when needle is found in the middle of haystack', () => {
    expect(findStrIndexFlag('haystackneedlehaystack', 'needle')).toBe(8);
  });

  it('should return correct index when needle is found at the end of haystack', () => {
    expect(findStrIndexFlag('haystackneedle', 'needle')).toBe(8);
  });

  it('should return 0 when haystack and needle are the same', () => {
    expect(findStrIndexFlag('needle', 'needle')).toBe(0);
  });

  it('should return correct index when haystack contains multiple occurrences of needle', () => {
    expect(findStrIndexFlag('haystackneedlehaystackneedle', 'needle')).toBe(8);
  });

  it('leetcode case 1', () => {
    expect(findStrIndexFlag('sadbutsad', 'sad')).toBe(0);
  })

  it('leetcode case 2', () => {
    expect(findStrIndexFlag('leetcode', 'leeto')).toBe(-1);
  })
});