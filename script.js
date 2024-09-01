const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const statusDisplay = document.getElementById('status');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusDisplay.textContent = `${currentPlayer} wins!`;
            return true;
        }
    }
    if (!board.includes('')) {
        statusDisplay.textContent = 'It\'s a tie!';
        return true;
    }
    return false;
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (board[index] || checkWinner()) return;
    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer);
    if (checkWinner()) return;
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
