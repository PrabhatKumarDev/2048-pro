import { DIRECTIONS } from './constants.js';

// Helper: compress + merge a row/column 
function processLine(line) {
    const filtered = line.filter(n => n !== 0);

    const result = [];
    let score = 0;

    for (let i = 0; i < filtered.length; i++) {
        if (filtered[i] === filtered[i + 1]) {
            const merged = filtered[i] * 2;
            result.push(merged);
            score += merged;
            i++;
        }
        else {
            result.push(filtered[i]);
        }
    }

    while (result.length < line.length) result.push(0);

    return { line: result, score };
}

// Move function

export function move(board, direction) {
    let score = 0;
    let moved = false;
    const size = board.length;
    let newBoard = board.map((r) => [...r]);

    const apply=(getter,setter)=>{
        for(let i=0;i<size;i++){
            const line=getter(i);
            const {line:processed,score:gained}=processLine(line);
            if(!arraysEqual(line,processed)) moved=true;
            score+=gained;
            setter(i,processed);
        }
    };

    if(direction===DIRECTIONS.LEFT){
        apply(
            i=>newBoard[i],
            (i,line) => { newBoard[i] = line; }
        );
    }

    if(direction===DIRECTIONS.RIGHT){
        apply(
            i=>[...newBoard[i]].reverse(),
            (i,line) => { newBoard[i] = line.reverse(); }
        );
    }

    if(direction===DIRECTIONS.UP){
        apply(
            i=>newBoard.map(row=>row[i]),
            (i,line)=> line.forEach((v,r)=>newBoard[r][i]=v)
        )
    }

    if(direction===DIRECTIONS.DOWN){
        apply(
            i=>newBoard.map(row=>row[i]).reverse(),
            (i,line)=> line.reverse().forEach((v,r)=>newBoard[r][i]=v)
        )
    }

    return {board:newBoard,score,moved};
}

function arraysEqual(a,b){
    return a.every((v,i)=>v==b[i]);
}