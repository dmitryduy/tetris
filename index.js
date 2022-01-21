import {
    score,
    ctx,
    returnToHomeButton,
    rows,
    game,
    leaderboard,
    aboutTimer,
    greetings,
    leftSideName,
    table
} from './variables.js'
import { View } from "./View.js";
import { Game } from "./Game.js";
import { setTimer, showRecordTable } from "./helpFunctions.js";


const startGame = () => {
    let isWorking = false;
    const game = Game();
    game.addNewTetramino();
    const view = View();
    view.drawPlayField(game.getPlayField());

    const keyHandler = e => {

        switch (e.key) {
            case 'ArrowLeft':
                game.moveLeft();
                view.drawPlayField(game.getPlayField());
                break;
            case 'ArrowRight':
                game.moveRight();
                view.drawPlayField(game.getPlayField())
                break;
            case 'ArrowDown':
                // game loose
                if (!isWorking) {
                    isWorking = true;
                    if (game.moveDown()) {
                        ctx.clearRect(0, 0, 1000, 1000);
                        removeEventListener('keydown', keyHandler);
                        clearInterval(timer);
                        clearInterval(helperTimer)
                        showRecordTable();
                    }
                    view.drawPlayField(game.getPlayField());
                    setTimeout(() => isWorking = false, 16);
                }
                break;
            case 'ArrowUp':
                game.rotate();
                view.drawPlayField(game.getPlayField());
        }
    }
    let timer = setTimer(game, view, keyHandler, 1000);
    const helperTimer = setInterval(() => {
        if (aboutTimer.currentLevel < aboutTimer.levels.length - 1
            && aboutTimer.levels[aboutTimer.currentLevel].score < +score.textContent) {
            aboutTimer.currentLevel++;
            clearInterval(timer);
            timer = setTimer(game, view, keyHandler, aboutTimer.levels[aboutTimer.currentLevel].ms);
        }
    }, 100);


    window.addEventListener('keydown', keyHandler);

}


const startGameButton = document.querySelector('.start-game');

startGameButton.addEventListener('click', () => {
    name = document.querySelector('.my-name').value;
    if (!name) return;
    game.classList.remove('hide');
    greetings.classList.add('hide');
    leftSideName.textContent = name;
    let recordTable = JSON.parse(localStorage.getItem('recordTable'));

    if (!recordTable) {
        localStorage.setItem('recordTable', JSON.stringify([{name, score: 0}]));
    } else {
        const tempName = recordTable.find(item => item.name === name);
        const record = document.querySelector('.left-side__record');
        if (tempName) {
            record.textContent = tempName.score;
        } else {
            localStorage.setItem('recordTable', JSON.stringify([...recordTable, {name, score: 0}]));
        }
    }
    startGame();
});

returnToHomeButton.addEventListener('click', () => {
    game.classList.add('hide');
    greetings.classList.remove('hide');
    leaderboard.classList.add('hide');

    table.textContent = '';
    score.textContent = '0';
    rows.textContent = '0';
    aboutTimer.currentLevel = 0;
})

