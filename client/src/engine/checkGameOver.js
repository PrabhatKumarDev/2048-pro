import {move} from './move.js';
import {DIRECTIONS} from './constants.js';

export function checkGameOver(tiles){
    return !Object.values(DIRECTIONS).some(dir=>
        move(tiles,dir).moved
    );
}