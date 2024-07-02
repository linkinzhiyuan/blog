import { canJump, canJump2, canJumpDp } from './_55_can_jump'

describe('55. 跳跃游戏 贪心', () => {
  it('示例一：可以到达', () => {
    expect(canJump2([2, 3, 1, 1, 4])).toBe(true)
  })
  it('示例二：不能到达', () => {
    expect(canJump2([3, 2, 1, 0, 4])).toBe(false)
  })
  it('示例四：可以到达', () => {
    expect(canJump2([1])).toBe(true)
  })
  it('示例五：可以到达', () => {
    expect(canJump2([2, 0, 0])).toBe(true)
  })
  it('示例六：可以到达', () => {
    expect(canJump2([2,5,0,0])).toBe(true)
  })
  it('示例七：可以到达', () => {
    expect(canJump2([1,2,0,1])).toBe(true)
  })
  it('示例八：可以到达', () => {
    expect(canJump2([1,1,2,2,0,1,1])).toBe(true)
  })
})

describe('55. 跳跃游戏 动态规划', () => {
  it('示例一：可以到达', () => {
    expect(canJumpDp([2, 3, 1, 1, 4])).toBe(true)
  })
  it('示例二：不能到达', () => {
    expect(canJumpDp([3, 2, 1, 0, 4])).toBe(false)
  })
  it('示例四：可以到达', () => {
    expect(canJumpDp([1])).toBe(true)
  })
  it('示例五：可以到达', () => {
    expect(canJumpDp([2, 0, 0])).toBe(true)
  })
  it('示例六：可以到达', () => {
    expect(canJumpDp([2,5,0,0])).toBe(true)
  })
  it('示例七：可以到达', () => {
    expect(canJumpDp([1,2,0,1])).toBe(true)
  })
  it('示例八：可以到达', () => {
    expect(canJumpDp([1,1,2,2,0,1,1])).toBe(true)
  })
})