import { canJumpII } from "./_45_can_jump_II";

describe('45. 跳跃游戏 II', () => {
  it('情况一：', () => {
    expect(canJumpII([2,3,1,1,4])).toBe(2);
  });
  it('情况二：', () => {
    expect(canJumpII([2,3,0,1,4])).toBe(2);
  });
})