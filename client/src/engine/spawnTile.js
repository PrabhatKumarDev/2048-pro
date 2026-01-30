export function spawnTile(board){
    const emptyCells=[];
    
    board.forEach((row,c)=>{
        row.forEach((cell,r)=>{
            if(cell==0){
                emptyCells.push([r,c]);
            }
        });
    });

    if(!emptyCells.length) return board;
    
    const [row,col]=emptyCells[Math.floor(Math.random()*emptyCells.length)];

    const value=Math.random()<0.9?2:4;

    const newBoard=board.map((r)=>[...r]);
    newBoard[row][col]=value;

    return newBoard;
}