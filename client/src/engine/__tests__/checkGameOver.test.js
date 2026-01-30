import { checkGameOver } from "../checkGameOver";

describe("Game Over Detection", () => {

  test("detects game over on a full board with no merges", () => {
    const board = [
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 8],
    ];

    expect(checkGameOver(board)).toBe(true);
  });

  test("detects game is not over if empty tiles exist", () => {
    const board = [
      [2, 0, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 8],
    ];

    expect(checkGameOver(board)).toBe(false);
  });

  test("detects game is not over if mergeable tiles exist", () => {
    const board = [
      [2, 2, 4, 4],
      [4, 8, 16, 32],
      [64, 128, 256, 512],
      [1024, 2048, 4096, 8192],
    ];

    expect(checkGameOver(board)).toBe(false);
  });

});
