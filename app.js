console.log("Sudoku")

const BOARD_LEN = 81;
const DIGITS = [1,2,3,4,5,6,7,8,9];

// create board
const boardDiv = document.getElementById("board");
for (let i = 0; i < BOARD_LEN; i++) {
  // <div class="square" id="i">i</div>
  let square = document.createElement("div");
  square.id = "square-"+ i.toString();
  square.classList.add("square");
  square.innerText = i;
  boardDiv.append(square)
}


// create digits
const digitsDiv = document.getElementById("digits");
for (let i = 1; i <= DIGITS.length; i++) {
  // <div class="digit" id="i">i</div>
  let digit = document.createElement("div");
  digit.id = "digit-"+ i.toString();
  digit.classList.add("digit");
  digit.innerText = i;
  digitsDiv.append(digit)
}
