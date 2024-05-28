document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const restartButton = document.getElementById("restart-button");
    const startButton = document.getElementById("startButton");
    const playerNameInput = document.getElementById("playerName");
    const gameArea = document.getElementById("gameArea");
    const playerScoreElement = document.getElementById("playerscore");
    const computerScoreElement = document.getElementById("computerscore");
    const drawsElement = document.getElementById("draws");

    let currentPlayer = "X";
    let isGameActive = false;
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let playerScore = 0;
    let computerScore = 0;
    let draws = 0;

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];

    function handlePlayerMove(cellIndex) {
        if (!isGameActive || gameState[cellIndex] !== "") {
            return;
        }

        
        gameState[cellIndex] = currentPlayer;
        cells[cellIndex].textContent = currentPlayer;

        // Check for win or draw
        if (checkWin()) {
            endGame(`${currentPlayer === 'X' ? playerNameInput.value.trim() : 'Computer'} wins!`);
        } else if (checkDraw()) {
            endGame("It's a draw!");
        } else {
           
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            const nextPlayer = currentPlayer === "X" ? playerNameInput.value.trim() : "Computer";
            status.textContent = `${nextPlayer}'s turn`;
      if (currentPlayer === "O") {
                setTimeout(handleComputerMove, 500);
            }
        }
    }
    function handleComputerMove() {
        if (!isGameActive) {
            return;
        }        
        const computerMove = getComputerMove();
        handlePlayerMove(computerMove);
    }
    function getComputerMove() {
        
        const emptyCells = gameState.reduce((acc, val, index) => {
            if (val === "") {
                acc.push(index);
            }
            return acc;
        }, []);
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return (
                gameState[a] !== "" &&
                gameState[a] === gameState[b] &&
                gameState[b] === gameState[c]
            );
        });
    }

    function checkDraw() {
        return gameState.every(cell => cell !== "");
    }

    function endGame(message) {
        if (message.includes("wins")) {
            const winner = currentPlayer === "X" ? playerNameInput.value.trim() : "Computer";
            status.textContent = `${winner} wins!`;
            if (winner === playerNameInput.value.trim()) {
                playerScore++;
                playerScoreElement.textContent = `Player: ${playerScore}`;
            } else {
                computerScore++;
                computerScoreElement.textContent = `Computer: ${computerScore}`;
            }
        } else {
            status.textContent = message;
            draws++;
            drawsElement.textContent = `Draws: ${draws}`;
        }
        isGameActive = false;
    }

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => handlePlayerMove(index));
    });

    restartButton.addEventListener("click", () => {
        gameState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
        });
        currentPlayer = "X";
        isGameActive = true;
        status.textContent = `${playerNameInput.value.trim()}'s turn`;

   
        currentPlayer = Math.random() < 0.5 ? "X" : "O";
        const nextPlayer = currentPlayer === "X" ? playerNameInput.value.trim() : "Computer";
        status.textContent = `${nextPlayer}'s turn`;
        if (currentPlayer === "O") {
            setTimeout(handleComputerMove, 500);
        }
    });
    startButton.addEventListener("click", () => {
        const playerName = playerNameInput.value.trim();
        if (playerName === "") {
            alert("Please enter your name to start the game.");
            return;
        }
        currentPlayer = "X"; 
        gameArea.style.display = "flex";
        startButton.disabled = true;
        status.textContent = `Welcome, ${playerName}! ${playerName}'s turn`;
        isGameActive = true; 

      
        currentPlayer = Math.random() < 0.5 ? "X" : "O";
        const nextPlayer = currentPlayer === "X" ? playerNameInput.value.trim() : "Computer";
        status.textContent = `${nextPlayer}'s turn`;
        if (currentPlayer === "O") {
            setTimeout(handleComputerMove, 500);
        }
    });
});
