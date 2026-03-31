let currentPlayer = "X";
let cells = document.querySelectorAll(".cell");
let gameActive = true;

function play(cell) {
  if (cell.innerText !== "" || !gameActive) return;

  cell.innerText = currentPlayer;

  if (checkWinner()) {
    document.getElementById("status").innerText = currentPlayer + " Wins! ";
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    document.getElementById("status").innerText = "It's a Draw ";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("status").innerText = "Player " + currentPlayer + " Turn";
}

function checkWinner() {
  const combos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return combos.some(combo => {
    const [a,b,c] = combo;
    return cells[a].innerText &&
           cells[a].innerText === cells[b].innerText &&
           cells[a].innerText === cells[c].innerText;
  });
}

function checkDraw() {
  return [...cells].every(cell => cell.innerText !== "");
}

function resetGame() {
  cells.forEach(cell => cell.innerText = "");
  currentPlayer = "X";
  gameActive = true;
  document.getElementById("status").innerText = "Player X Turn";
}