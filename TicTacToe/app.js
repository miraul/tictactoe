const turnText = document.getElementById("turn");
const squares = document.querySelectorAll(".square");
const gameButton = document.getElementById("game");
const player1 = "X"; // turn = true
const player2 = "O"; // turn = false

const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let turn = true;

function drawText(square) {
  //if square have text inside, return and do nothing
  if (square.innerText != "") {
    return;
  }
  // else write the player sign inside of square
  square.innerText = turn ? player1 : player2;
  turnText.innerText = `Your Turn: ${turn ? player2 : player1}`;
  checkGameStatus();
  turn = !turn;
}

function startGame() {
  // X become first player (player1) when turn becomes true
  turn = true;

  // Resetting info text
  turnText.innerText = `Your Turn: ${player1}`;

  console.log("Game Started");

  // background color changes reset
  squares.forEach((square) => (square.style.backgroundColor = "white"));

  // Pointer gets activated after a finished game ( win or draw)
  squares.forEach((square) => (square.style.pointerEvents = "auto"));

  // Game button reset after starting a new game
  gameButton.innerText = "Game started";
  gameButton.style.backgroundColor = "";
  gameButton.style.color = "black";
  gameButton.removeEventListener("click", startGame);

  // assigning drawText function to all squares
  squares.forEach((square) =>
    square.addEventListener("click", function () {
      drawText(square);
    })
  );

  // resetting all squares to null
  squares.forEach((square) => (square.innerText = ""));
}

function checkGameStatus() {
  // decide whose turn it is
  const player = turn ? player1 : player2;

  // check win -- determine it with comparing two arrays of values[] ( which is a copy of our square structure ) with winCondition[]
  const value = [];
  squares.forEach((square) => value.push(square.innerText));

  for (let i = 0; i < winCondition.length; i++) {
    let b = 0;
    for (let x = 0; x < winCondition[i].length; x++) {
      if (value[winCondition[i][x]] == player) {
        b++;
        if (b > 2) {
          console.log(`${player} wins!!`);
          turnText.innerText = `${player} wins!!`;
          // find place of winning combination then changing the combination squares background
          let ww = winCondition[i];
          for (const w of ww) {
            squares[w].style.backgroundColor = "red";
          }
          resetGame();
        }
      }
    }
  }

  // check draw status when every square is filled but no win condition is met, then reset game
  if (!value.includes("")) {
    console.log("game over, TIE");
    turnText.innerText = "No one wins!!";
    resetGame();
  }
}

function resetGame() {
  // make sure no click events fired after win or draw
  squares.forEach((square) => (square.style.pointerEvents = "none"));

  // changing game button after win or draw to start a new game
  gameButton.innerText = "START NEW GAME";
  gameButton.style.backgroundColor = "black";
  gameButton.style.color = "white";
  gameButton.addEventListener("click", startGame);
}

startGame();
