import { move } from "../move";
import { DIRECTIONS } from "../constants";

describe("Move function tests", () => {

  test("merges identical tiles correctly to the left", () => {
    const board = [
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const { board: newBoard, score } = move(board, DIRECTIONS.LEFT);

    expect(newBoard[0]).toEqual([4, 0, 0, 0]);
    expect(score).toBe(4);
  });

  test("does not double merge in one move", () => {
    const board = [
      [2, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const { board: newBoard } = move(board, DIRECTIONS.LEFT);

    expect(newBoard[0]).toEqual([4, 2, 0, 0]);
  });

  test("detects when board actually changes", () => {
    const board = [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const { moved } = move(board, DIRECTIONS.LEFT);

    expect(moved).toBe(false);
  });

  test("merges identical tiles correctly to the right", () => {
    const board = [
      [0, 2, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const { board: newBoard, score } = move(board, DIRECTIONS.RIGHT);

    expect(newBoard[0]).toEqual([0, 0, 0, 4]);
    expect(score).toBe(4);
  });

  test("merges tiles correctly upwards", () => {
    const board = [
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const { board: newBoard, score } = move(board, DIRECTIONS.UP);

    expect(newBoard[0][0]).toBe(4);
    expect(score).toBe(4);
  });

  test("merges tiles correctly downwards", () => {
    const board = [
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const { board: newBoard, score } = move(board, DIRECTIONS.DOWN);

    expect(newBoard[3][0]).toBe(4);
    expect(score).toBe(4);
  });

  test("multiple merges in one move", () => {
    const board = [
      [2, 2, 4, 4],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];

    const { board: newBoard, score } = move(board, DIRECTIONS.LEFT);

    expect(newBoard[0]).toEqual([4, 8, 0, 0]);
    expect(score).toBe(12);
  });

  test("board does not change when move is impossible", () => {
    const board = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2048, 4096],
      [8192, 16384, 32768, 65536],
    ];

    const { moved } = move(board, DIRECTIONS.LEFT);

    expect(moved).toBe(false);
  });

});
