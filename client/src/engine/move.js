import { DIRECTIONS } from './constants.js';

const BOARD_SIZE = 4; // define board size

let tileId = 0;

// Create a new tile object
export function createTile(value, row, col, isMerged = false) {
  return { value, id: tileId++, row, col, isMerged };
}

// Helper: convert 2D board to tile objects
export function boardToTiles(board) {
  const tiles = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      tiles.push(createTile(board[r][c], r, c));
    }
  }
  return tiles;
}

// Helper: convert tiles back to 2D board (optional)
export function tilesToBoard(tiles) {
  const board = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(0));
  tiles.forEach(t => board[t.row][t.col] = t.value);
  return board;
}

// Process a line (row or column) for merge logic
function processLine(line) {
  const values = line.map(t => t.value).filter(v => v !== 0);
  const result = [];
  const mergedIndices = [];
  let score = 0;

  let i = 0;
  while (i < values.length) {
    if (values[i] === values[i + 1]) {
      const mergedValue = values[i] * 2;
      result.push(mergedValue);
      mergedIndices.push(result.length - 1);
      score += mergedValue;
      i += 2;
    } else {
      result.push(values[i]);
      i += 1;
    }
  }

  while (result.length < BOARD_SIZE) result.push(0);

  return { line: result, score, mergedIndices };
}

// Main move function
export function move(tiles, direction) {
  let moved = false;
  let newTiles = [];
  let score = 0;

  // Create a 2D grid of tiles
  const grid = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
  tiles.forEach(t => grid[t.row][t.col] = t);

  // Process each row/column
  for (let i = 0; i < BOARD_SIZE; i++) {
    let line;
    let reversed = false;

    if (direction === DIRECTIONS.LEFT) line = [...grid[i]];
    if (direction === DIRECTIONS.RIGHT) {
      line = [...grid[i]].reverse();
      reversed = true;
    }
    if (direction === DIRECTIONS.UP) line = grid.map(row => row[i]);
    if (direction === DIRECTIONS.DOWN) {
      line = grid.map(row => row[i]).reverse();
      reversed = true;
    }

    // Fill empty tiles
    line = line.map(t => t || createTile(0, 0, 0));

    const { line: newValues, score: gainedScore, mergedIndices } = processLine(line);
    score += gainedScore;

    newValues.forEach((val, idx) => {
      let row, col;
      if (direction === DIRECTIONS.LEFT) {
        row = i;
        col = idx;
      } else if (direction === DIRECTIONS.RIGHT) {
        row = i;
        col = BOARD_SIZE - 1 - idx; // correct reverse index
      } else if (direction === DIRECTIONS.UP) {
        row = idx;
        col = i;
      } else if (direction === DIRECTIONS.DOWN) {
        row = BOARD_SIZE - 1 - idx; // correct reverse index
        col = i;
      }

      const isMerged = mergedIndices.includes(idx);
      const oldTile = line[idx];
      if (val !== oldTile.value) moved = true;

      newTiles.push(createTile(val, row, col, isMerged));
    });
  }

  return { newTiles, moved, score };
}
