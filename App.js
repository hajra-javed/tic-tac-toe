const gameBoard = (() => {
    let array = [];
    let player;
    let [player1, player2] = ['', ''];
    let turns;
    const changePlayer = () => player = (player === 'X' ? 'O' : 'X');
    const getPlayer = () => player;
    const incrementTurns = () => turns++;
    const getArray = () => array;

    const start = () => {
        const overlay = document.querySelector('.overlay');
        overlay.style.display = 'none';
        array = ['', '', '', '', '', '', '', '', ''];
        turns = 0;
        player = 'X';
        player1 = prompt("Player 1's name: ", player1);
        player2 = prompt("Player 2's name: ", player2);
        if (player1 === '' || player1 === null) {
            player1 = 'X';
        }
        if (player2 === '' || player2 === null) {
            player2 = 'O';
        }

        displayController.initialize(player1, player2);
    };

    const arrayIsEqual = (a, b) => {
        if (a[0] === b[0] && a[1] === b[1] && a[2] === b[2]) {
            return true;
        } else {
            return false;
        }
    };

    const check = () => {
        incrementTurns();
        if (
            arrayIsEqual([array[0], array[1], array[2]], [player, player, player]) ||
            arrayIsEqual([array[3], array[4], array[5]], [player, player, player]) ||
            arrayIsEqual([array[6], array[7], array[8]], [player, player, player]) ||
            arrayIsEqual([array[0], array[3], array[6]], [player, player, player]) ||
            arrayIsEqual([array[1], array[4], array[7]], [player, player, player]) ||
            arrayIsEqual([array[2], array[5], array[8]], [player, player, player]) ||
            arrayIsEqual([array[0], array[4], array[8]], [player, player, player]) ||
            arrayIsEqual([array[2], array[4], array[6]], [player, player, player])
        ) {
            const winner = player === 'X' ? player1 : player2
            displayController.endGame(`${winner} won the game!`)

        } else if (turns === 9) {
            displayController.endGame('Its a tie!');
        }

    };

    return { start, getArray, changePlayer, getPlayer, check };
})();

const displayController = (() => {
    const squares = document.querySelectorAll('.square');
    const left = document.querySelector('.left');
    const right = document.querySelector('.right');
    const overlay = document.querySelector('.overlay');
    const message = document.querySelector('.message > div');

    const initialize = (player1, player2) => {
        const left = document.querySelector('.left > .name');
        const right = document.querySelector('.right > .name');
    
        left.textContent = player1;
        right.textContent = player2;
        switchPlayer('X');

        squares.forEach(square => square.textContent = '');
    };

    const update = (index) => {
        squares[index].textContent = gameBoard.getArray()[index];
        if (gameBoard.getPlayer() === 'O') {
            squares[index].style.color = 'black';
        } else {
            squares[index].style.color = 'hotpink';
        }
        gameBoard.check();
        gameBoard.changePlayer();
        switchPlayer(gameBoard.getPlayer());
    };

    const switchPlayer = (player) => {
        if (player === 'O') {
            left.style.color = 'transparent';
            right.style.color = 'black';
        } else {
            left.style.color = 'hotpink';
            right.style.color = 'transparent';
        }
    }

    const endGame = (displayMessage) => {
        left.style.color = 'transparent';
        right.style.color = 'transparent';
        message.textContent = displayMessage;
        overlay.style.display = 'block';
    }

    for (let i = 0; i < 9; i++) {
        squares[i].addEventListener('click', () => {
            // console.log(gameBoard.array);
            if (gameBoard.getArray()[i] === '') {
                gameBoard.getArray()[i] = gameBoard.getPlayer();
                displayController.update(i);
            } else {
                alert("Square already filled!")
            }
        })
    };

    return { initialize, update, endGame };
})();


// for (let i = 0; i < 9; i++) {
//     squares[i].addEventListener('click', () => {
//         // console.log(gameBoard.array);
//         if (gameBoard.getArray()[i] === '') {
//             gameBoard.getArray()[i] = gameBoard.getPlayer();
//             displayController.update(i);
//         } else {
//             alert("Square already filled!")
//         }
//     })
// };

const restart = document.querySelector('.restart');
restart.addEventListener('click', () => {
    gameBoard.start();
})

gameBoard.start();