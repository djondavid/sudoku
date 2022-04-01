console.log("Sudoku");

const BOARD_LEN = 81;
const DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// create board
const boardDiv = document.getElementById("board");
for (let i = 0; i < BOARD_LEN; i++) {
  // <div class="square" id="i">i</div>
  let square = document.createElement("div");
  square.id = "square-" + i.toString();
  square.classList.add("square");
  square.innerText = i;
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
    const rowInt = Math.floor(rowNum/3);
    const colInt = Math.floor(colNum/3);
    
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

console.log(getBoxBySquare(8));