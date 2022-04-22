console.log("Sudoku");

const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const BOARD_LEN = 81;
const RCB_LEN = 9;
const BOX_SIZE = 3;
 
const rowSquares = {
  // 0: [ 0, 1, 2, 3, 4, 5, 6, 7, 8],
  // 1: [ 9,10,11,12,13,14,15,16,17],
  // 2: [18,19,20,21,22,23,24,25,26],
  // 3: [27,28,29,30,31,32,33,34,35],
  // 4: [36,37,38,39,40,41,42,43,44],
  // 5: [45,46,47,48,49,50,51,52,53],
  // 6: [54,55,56,57,58,59,60,61,62],
  // 7: [63,64,65,66,67,68,69,70,71],
  // 8: [72,73,74,75,76,77,78,79,80]
};
const colSquares = {
  // 0: [ 0, 9,18,27,36,45,54,63,72],
  // 1: [ 1,10,19,28,37,46,55,64,73],
  // 2: [ 2,11,20,29,38,47,56,65,74],
  // 3: [ 3,12,21,30,39,48,57,66,75],
  // 4: [ 4,13,22,31,40,49,58,67,76],
  // 5: [ 5,14,23,32,41,50,59,68,77],
  // 6: [ 6,15,24,33,42,51,60,69,78],
  // 7: [ 7,16,25,34,43,52,61,70,79],
  // 8: [ 8,17,26,35,44,53,62,71,80]
};
const boxSquares = {
  // 0: [ 0, 1, 2, 9,10,11,18,19,20],
  // 1: [ 3, 4, 5,12,13,14,21,22,23],
  // 2: [ 6, 7, 8,15,16,172,4,25,26],
  // 3: [27,28,29,36,37,38,45,46,47],
  // 4: [30,31,32,39,40,41,48,49,50],
  // 5: [33,34,35,42,43,44,51,52,53],
  // 6: [54,55,56,63,64,65,72,73,74],
  // 7: [57,58,59,66,67,68,75,76,77],
  // 8: [60,61,62,69,70,71,78,79,80]
};

const initRows = () => {
  let rowNum = 0;
  let temp = [];
  for (let i = 0; i < BOARD_LEN; i++) {
    if (i > 0 && i % 9 === 0) {
      rowSquares[rowNum] = [...temp];
      temp = [];
      rowNum++;
    }
    temp.push(i);
  }
  rowSquares[rowNum] = [...temp];
};

const initCols = () => {
  let colNum = 0;
  let temp = [];
  for (let i = 0; i < BOARD_LEN; i++) {
    colNum = i%9;
    if(colSquares[colNum] === undefined)
    {
      colSquares[colNum] = new Array();
    }
    colSquares[colNum].push(i);
  }
};

const initBoxes = () => {
  let colNum, rowNum = 0, boxNum = 0;
  for (let i = 0; i < BOARD_LEN; i++) {
    if (i > 0 && i % 9 === 0) {
      rowNum ++;
    }
    colNum = i%9;
    const x = Math.floor(rowNum/BOX_SIZE);
    const y = Math.floor(colNum/BOX_SIZE);
    boxNum = x * BOX_SIZE + y;
    if (boxSquares[boxNum] === undefined)
    {
      boxSquares[boxNum] = new Array();
    }
    boxSquares[boxNum].push(i);
  }
};

initRows();
initCols();
initBoxes();

const highlightRCB = (index) => {
  console.log("highlightRCB for square ", index);
  
  // clear all squares
  const squares = document.querySelectorAll(".square");
  squares.forEach(function(square) {
    square.classList.remove("active", "highlight");
  });

  const rowNum = getRowBySquare(index);
  const colNum = getColumnBySquare(index);
  const boxNum = getBoxBySquare(index);
  
  //console.log("Row: "+ rowNum +" Col: "+ colNum +" Box: "+ boxNum);

  rowSquares[rowNum].forEach(function(squareIndex) {
    document.getElementById("square-"+squareIndex).classList.add("highlight");
  });
  colSquares[colNum].forEach(function(squareIndex) {
    document.getElementById("square-"+squareIndex).classList.add("highlight");
  });
  boxSquares[boxNum].forEach(function(squareIndex) {
    document.getElementById("square-"+squareIndex).classList.add("highlight");
  });

  // set active square
  document.getElementById("square-"+ index).classList.add("active");
}

// create board
const boardDiv = document.getElementById("board");
for (let i = 0; i < BOARD_LEN; i++) {
  // <div class="square" id="i">i</div>
  let square = document.createElement("div");
  square.id = "square-" + i.toString();
  square.classList.add("square");
  square.innerText = i;

  square.addEventListener("click", function () {
    highlightRCB(i);
  });

  boardDiv.append(square);
}

// create digits
const digitsDiv = document.getElementById("digits");
for (let i = 1; i <= DIGITS.length; i++) {
  let digit = document.createElement("div");
  digit.id = "digit-" + i.toString();
  digit.classList.add("digit");
  digit.innerText = i;
  digitsDiv.append(digit);
}

const getRowBySquare = (index) => {
  if (index >= 0 && index < BOARD_LEN) {
    let rowNum = 0;
    for (let i = 0; i < BOARD_LEN; i++) {
      if (i > 0 && i % 9 === 0) {
        rowNum++;
      }
      if (index === 0 || index === i) {
        return rowNum;
      }
    }
  }
  return null;
};

const getColumnBySquare = (index) => {
  if (index >= 0 && index < BOARD_LEN) {
    return index % 9;
  }
  return null;
};

const getBoxBySquare = (index) => {
  if (index >= 0 && index < BOARD_LEN) {
    const rowNum = getRowBySquare(index);
    const colNum = getColumnBySquare(index);
    const rowInt = Math.floor(rowNum / 3);
    const colInt = Math.floor(colNum / 3);

    // rowInt and colInt and resulting box number
    // 0,0 -> 0
    // 0,1 -> 1
    // 0,2 -> 2
    // 1,0 -> 3
    // 1,1 -> 4
    // 1,2 -> 5
    // 2,0 -> 6
    // 2,1 -> 7
    // 2,2 -> 8

    return rowInt * 3 + colInt;
  }
  return null;
};