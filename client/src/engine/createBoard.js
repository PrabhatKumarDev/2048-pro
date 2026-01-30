import {spawnTile} from './spawnTile.js';

export function createBoard(size=4){
    let board=Array.from({length:size},()=>
    Array(size).fill(0)
    );
    board=spawnTile(board);
    board=spawnTile(board);

    return board;
}