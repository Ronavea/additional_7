module.exports = function solveSudoku(matrix) { 
//Табличный метод
//создаю копию массива matrix
//записываю число от 1 до 9 в пустые ячейки

  let matrixCopy = new Array();
  
  for(let col = 0; col < 9; col++) {
    matrixCopy[col] = [];
    for(let row = 0; row < 9; row++) {
      if(matrix[col][row] === 0) {
        matrixCopy[col][row] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      }else{
        matrixCopy[col][row] = matrix[col][row];
      }
    }
  }

  let square = new Array();
  const qdr = (col,row) => {
    //создаю квадраты 3х3
    let q = 0, r = 0, colz = 0, rowz = 0;
    for(q = 0; q < 9; q++) {
      square[q] = [];
      for(let col = colz; col < 3+colz; col++) {
        for(let row = rowz; row < 3+rowz; row++) {
          square[q][r] = matrix[col][row];
          r++;
        }
      }
      r = 0;
      rowz += 3;
      if(rowz > 6) {
        colz += 3; rowz = 0;
      }
    }
  }

  const searchRowColumnSquare = (col,row) => {
    //поиск в рядах
    for(let n = 0; n < 9; n++) {
      if(matrix[col][n] != 0) {
        if(matrixCopy[col][row].indexOf(matrix[col][n]) != -1) {
           matrixCopy[col][row].splice(matrixCopy[col][row].indexOf(matrix[col][n]), 1);
        }
      }
    }
 
    //поиск в столбцах
    for(let n = 0; n < 9; n++) {
      if(matrix[n][row] != 0) {
        if(matrixCopy[col][row].indexOf(matrix[n][row]) != -1) {
           matrixCopy[col][row].splice(matrixCopy[col][row].indexOf(matrix[n][row]), 1);
        }
      }
    }

    //поиск в квадрате 3х3
    qdr(col,row);
    q = Math.floor(col/3)*3 + Math.floor(row/3);

    for(let r = 0; r < 9; r++) {
      if(matrix[q][r] != 0) {
        if(matrixCopy[col][row].indexOf(square[q][r]) != -1) {
           matrixCopy[col][row].splice(matrixCopy[col][row].indexOf(square[q][r]), 1);
        }
      }
    }
  }

  const one = (col,row) => {
    if (matrixCopy[col][row].length == 1) {
        matrix[col][row] = matrixCopy[col][row][0];
    }
  }

  const run = () => {
    for(let col = 0; col < 9; col++) {
      for(let row = 0; row < 9; row++) {
        if(matrix[col][row] == 0) {
          searchRowColumnSquare(col,row);
          one(col,row);  
        }
      }
    }
  }
  
  let count = 30;
  while(count--) {
    run();
  }

return matrixCopy;
}
