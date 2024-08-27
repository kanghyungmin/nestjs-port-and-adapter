function isSafe(board: string[], row: number, col: number): boolean {
    for(let i=0; i< row; i++){
        if(board[i][col]=='Q') return false;
    }
    for(let i=0; i< col; i++){
        if(board[row][i]=='Q') return false;
    }

    for(let i= row-1, j=col-1; i>=0&& j>=0; i--,j--)
        if(board[i][j]=='Q') return false;

    for(let i= row-1, j=col+1; i>=0 && j>=0; i--,j++)
        if(board[i][j]=='Q') return false;



    return true
    
}
function solveNQueens(n: number): string[][] {
    const results : string[][] = [];
    const board : string[] = Array(n).fill('.'.repeat(n))

    function solve(row :number) {
        if(row == n) {
            results.push([...board])
            return;
        }
        for(let col=0; col < n; col++) {
            if(isSafe(board,row,col)) {
                board[row] = board[row].substring(0,col) +'Q' +board[row].substring(col+1)           
                solve(row+1)
                board[row] = board[row].substring(0,col) +'.' +board[row].substring(col+1)
            }

        }
    }
    solve(0)
    return results
    
}





const n = 4;
const solutions = solveNQueens(n);
console.log(`Number of solutions for ${n}-Queens: ${solutions.length}`);
solutions.forEach((solution, index) => {
    console.log(`Solution ${index + 1}:`);
    solution.forEach(row => console.log(row));
});