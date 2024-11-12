import { gameOfLife } from "./289.生命游戏";

describe('gameOfLife function', () => {
  it('should return correct value for valid board', () => {
    const board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]];
    gameOfLife(board);
    expect(board).toEqual([[0,0,0],[1,0,1],[0,1,1],[0,1,0]]);
  });

  it('should return correct value for invalid board', () => {
    const board = [[1,1],[1,0]];
    gameOfLife(board);
    expect(board).toEqual([[1,1],[1,1]]);
  });
});
