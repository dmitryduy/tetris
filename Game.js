import {tetraminos, colors, Piece, nextTetraminoctx, score, rows} from "./variables.js";
import {updateScore} from "./helpFunctions.js";

export const Game = () => {
    const getTetramino = () => ({
        posX: 3,
        posY: 0,
        body: tetraminos[Math.floor(Math.random() * tetraminos.length)],
        color: colors[Math.floor(Math.random() * colors.length)]
    });
    const nextTetraminos = [getTetramino()];
    const getPlayField = () => playField;

    let playField = [];
    let lose = false;
    let activeTetramino = getTetramino();

    const fillPlayField = () => {
        for (let i = 0; i < 20; i++) {
            playField.push(Array(10).fill(Piece(0)));
        }
    }

    fillPlayField();


    const isValid = (x, y) => !!(playField[y] && playField[y][x] && playField[y][x].type !== 1);

    const gameOver = () => {
        lose = true;
        playField = [];
        fillPlayField();
    }

    const drawNextTetramino = () => {
        for (let y = 0; y < 20; y++) {
            const {body, color} = nextTetraminos[0];
            nextTetraminoctx.clearRect(0, 0, 1000, 1000);
            for (let y = 0; y < body.length; y++) {
                for (let x = 0; x < body.length; x++) {
                    if (body[y][x]) {
                        nextTetraminoctx.fillStyle = color;
                        nextTetraminoctx.fillRect(35 * x, 35 * y, 35 - 2, 35 - 2);
                    }
                }
            }
        }
    }
    drawNextTetramino();

    const addNewTetramino = () => {
        const {body, posX, posY, color} = activeTetramino;
        for (let y = 0; y < body.length; y++) {
            for (let x = 0; x < body.length; x++) {
                if (body[y][x] && !isValid(posX + x, posY + y)) {
                    gameOver();
                    return;
                }
            }
        }

        for (let y = 0; y < body.length; y++) {
            for (let x = 0; x < body.length; x++) {
                if (body[y][x]) {
                    playField[posY + y][posX + x] = Piece(2, color);
                }
            }
        }
    }

    const removeFullLine = () => {
        let fullLine = true;
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 10; x++) {
                if (playField[y][x].type !== 1) {
                    fullLine = false;

                }
            }
            if (fullLine) {
                playField.splice(y, 1);
                playField.unshift(Array(10).fill(Piece(0)));
                score.textContent = +score.textContent + 100 + '';
                rows.textContent = +rows.textContent + 1 + '';
                updateScore(100);

            }
            fullLine = true;
        }

    }

    const fixedTetramino = () => {
        const {body, posX, posY, color} = activeTetramino;
        for (let y = 0; y < body.length; y++) {
            for (let x = 0; x < body.length; x++) {
                if (body[y][x]) {
                    playField[posY + y][posX + x] = Piece(1, color);
                }
            }
        }

        activeTetramino = nextTetraminos[0];
        nextTetraminos.shift();
        nextTetraminos.push(getTetramino());
        removeFullLine();
        addNewTetramino();
        drawNextTetramino();
        score.textContent = +score.textContent + 10 + '';
        updateScore(10);
    }

    const removePreviousPosition = callback => {
        for (let y = 0; y < activeTetramino.body.length; y++) {
            for (let x = 0; x < activeTetramino.body.length; x++) {
                if (activeTetramino.body[y][x]) {
                    playField[activeTetramino.posY + y][activeTetramino.posX + x] = Piece(0);
                }
            }
        }

        callback();

        for (let y = 0; y < activeTetramino.body.length; y++) {
            for (let x = 0; x < activeTetramino.body.length; x++) {
                if (activeTetramino.body[y][x]) {
                    playField[activeTetramino.posY + y][activeTetramino.posX + x] = Piece(2, activeTetramino.color);
                }
            }
        }
    }
    const move = (addToPosX, addToPosY) => {
        for (let y = 0; y < activeTetramino.body.length; y++) {
            for (let x = 0; x < activeTetramino.body.length; x++) {
                if (activeTetramino.body[y][x] &&
                    !isValid(activeTetramino.posX + x + addToPosX, activeTetramino.posY + y + addToPosY)) {
                    addToPosY && fixedTetramino();
                    return;
                }
            }
        }

        removePreviousPosition(() => {
            activeTetramino.posY += addToPosY;
            activeTetramino.posX += addToPosX;
        });

    }

    const moveDown = () => {
        move(0, 1);
        if (lose) {
            return true;
        }
    }

    const moveLeft = () => {
        move(-1, 0);
    }

    const moveRight = () => {
        move(1, 0);
    }

    const rotate = () => {
        const newArr = [];
        const {body, posX, posY} = activeTetramino;
        for (let i = 0; i < body.length; i++) {
            newArr.push(Array(body.length).fill(Piece(0)));
        }
        for (let y = 0; y < body.length; y++) {
            for (let x = 0; x < body.length; x++) {
                newArr[x][y] = body[body.length - 1 - y][x];
            }
        }

        for (let y = 0; y < body.length; y++) {
            for (let x = 0; x < body.length; x++) {
                if (newArr[y][x] && !isValid(posX + x, posY + y)) {
                    return;
                }
            }
        }

        removePreviousPosition(() => {
            activeTetramino.body = newArr;
        });
    }


    return {
        getPlayField,
        addNewTetramino,
        moveDown,
        moveLeft,
        moveRight,
        rotate,
    }
}