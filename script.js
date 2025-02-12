document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const message = document.getElementById("message");
    const restartBtn = document.getElementById("restart");
  
    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;
  
    const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    // Handle a cell click
    function handleCellClick(e) {
      const cell = e.target;
      const index = cell.getAttribute("data-index");
  
      // Prevent overwrite or clicks after game over
      if (board[index] !== "" || !gameActive) {
        return;
      }
  
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;
  
      if (checkWin()) {
        message.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
      }
  
      // Check for draw
      if (board.every(cell => cell !== "")) {
        message.textContent = "It's a draw!";
        gameActive = false;
        return;
      }
  
      // Switch player
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    // Check for a winning condition
    function checkWin() {
      return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] && board[a] === board[b] && board[a] === board[c];
      });
    }
  
    // Attach click event listeners to cells
    cells.forEach(cell => {
      cell.addEventListener("click", handleCellClick);
    });
  
    // Restart game functionality
    restartBtn.addEventListener("click", () => {
      board = ["", "", "", "", "", "", "", "", ""];
      gameActive = true;
      currentPlayer = "X";
      cells.forEach(cell => cell.textContent = "");
      message.textContent = `Player ${currentPlayer}'s turn`;
    });
  
    // Initialize message
    message.textContent = `Player ${currentPlayer}'s turn`;
  });
  