const cells = document.querySelectorAll('td');

let currentPlayer = "X";

let turn = 'X';

// Function to play a turn
function play(square) {
  // Return if the square is already filled
  if (square.innerHTML !== '') {
    return;
  }
  
  // Fill the square with the current player's symbol
  square.innerHTML = turn;
  
  // Switch turns and update the message
  if (turn === 'X') {
    turn = 'O';
    document.getElementById('turn').innerHTML = "O's Turn";
  } else {
    turn = 'X';
    document.getElementById('turn').innerHTML = "X's Turn";
  }
}

const handleClick = function(event) {
  event.target.textContent = currentPlayer;
  currentPlayer = (currentPlayer === "X") ? "O" : "X";
};

cells.forEach(function(cell) {
  cell.addEventListener("click", handleClick);
});


for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', function(event) {
    // update the cell with the current player's symbol
    event.target.textContent = currentPlayer;

    // switch players
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  });
}

const checkForWin = function() {
  // check rows
  for (let i = 0; i < 9; i += 3) {
    if (cells[i].textContent === cells[i + 1].textContent && cells[i].textContent === cells[i + 2].textContent) {
      return cells[i].textContent;
    }
  }

  // check columns
  for (let i = 0; i < 3; i++) {
    if (cells[i].textContent === cells[i + 3].textContent && cells[i].textContent === cells[i + 6].textContent) {
      return cells[i].textContent;
    }
  }

  // check diagonals
  if (cells[0].textContent === cells[4].textContent && cells[0].textContent === cells[8].textContent) {
    return cells[0].textContent;
  }
  if (cells[2].textContent === cells[4].textContent && cells[2].textContent === cells[6].textContent) {
    return cells[2].textContent;
  }

  // no winner
  return null;
};


const checkForDraw = function() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === '') {
      return false;
    }
  }
  return true;
};

const gameOver = function(winner) {
  let message = '';
  if (winner) {
    message = `${winner} has won!`;
  } else {
    message = 'It is a draw!';
  }

  // Create the alert element
  let alert = document.createElement('div');
  alert.classList.add('alert', 'alert-info');
  alert.innerHTML = message;

  // Add the alert to the page
  document.body.appendChild(alert);

  // Remove the alert after 3 seconds
  setTimeout(function() {
    document.body.removeChild(alert);
  }, 3000);
};


const onClick = function(event) {
  // update the cell with the current player's symbol
  event.target.textContent = currentPlayer;

  // check for a win
  let winner = checkForWin();
  if (winner) {
    gameOver(winner);
  } else if (checkForDraw()) {
    gameOver();
  } else {
    // switch players
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  }
};

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', onClick);
}

const resetButton = document.querySelector('button');
resetButton.addEventListener('click', function() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
  }
});


