import { productExceptSelf, productExceptSelf2 } from './_238_.product_except_self'

describe('238. 除自身以外数组的乘积', () => {
  it('正常情况 [1,2,3,4]', () => {  
    expect(productExceptSelf2([1,2,3,4])).toEqual([24,12,8,6])
  })
})

describe('238. 除自身以外数组的乘积', () => {
  it('正常情况 [1,2,3,4,5]', () => {
    expect(productExceptSelf2([1,2,3,4,5])).toEqual([120,60,40,30,24])
  })
})

describe('238. 除自身以外数组的乘积', () => {
  it('正常情况 [-1,1,0,-3,3]', () => {
    expect(productExceptSelf2([-1,1,0,-3,3])).toEqual([0,0,9,0,0])
  })
})

describe('238. 除自身以外数组的乘积', () => {
  it('正常情况 [0,0]', () => {
    expect(productExceptSelf2([0,0])).toEqual([0,0])
  })
})

describe('238. 除自身以外数组的乘积', () => {
  it('正常情况 [1]', () => {
    expect(productExceptSelf2([1])).toEqual([1])
  })
  it('should return an empty array for an empty input', () => {
    expect(productExceptSelf2([])).toEqual([]);
  });

  it('should return the input array for a single element input', () => {
    expect(productExceptSelf2([1])).toEqual([1]);
  });

  it('should return the correct output for a two-element input', () => {
    expect(productExceptSelf2([1, 2])).toEqual([2, 1]);
  });

  it('should return the correct output for a multiple-element input', () => {
    expect(productExceptSelf2([1, 2, 3, 4])).toEqual([24, 12, 8, 6]);
  });

  it('should return the correct output for an input with zero', () => {
    expect(productExceptSelf2([1, 2, 0, 4])).toEqual([0, 0, 8, 0]);
  });

  it('should return the correct output for an input with negative numbers', () => {
    expect(productExceptSelf2([-1, 2, -3, 4])).toEqual([-24, 12, -8, 6]);
  });

  it('should return the correct output for an input with large numbers', () => {
    expect(productExceptSelf2([100, 200, 300, 400])).toEqual([24000000, 12000000, 8000000, 6000000]);
  });
})