import {move} from './move.js';
import {DIRECTIONS} from './constants.js';

export function checkGameOver(board){
    return !Object.values(DIRECTIONS).some(dir=>
        move(board,dir).moved
    );
}