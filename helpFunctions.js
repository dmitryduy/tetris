import { game, leaderboard, score } from "./variables.js";

export const showRecordTable = () => {
    let recordTable = JSON.parse(localStorage.getItem('recordTable'));
    game.classList.add('hide');
    leaderboard.classList.remove('hide');

    const table = document.querySelector('.table');
    const fragment = document.createDocumentFragment();

    recordTable.sort((a, b) => b.score - a.score).forEach(item => {

        const row = document.createElement('div');
        row.className = `row ${item.name === name ? 'my-result' : ''}`;

        const nameSpan = document.createElement('span');
        nameSpan.textContent = item.name;
        nameSpan.className = `name ${item.name === name ? 'my-result' : ''}`;

        const score = document.createElement('span');
        score.textContent = item.score;
        score.classList.add('score');

        row.appendChild(nameSpan);
        row.appendChild(score);
        fragment.appendChild(row);
    })
    table.appendChild(fragment);
}

export const updateScore = value => {

    const table = JSON.parse(localStorage.getItem('recordTable'));
    const newTable = table.map(item => item.name === name && +score.textContent > item.score ? {
        ...item,
        score: item.score + value
    } : item);
    localStorage.setItem('recordTable', JSON.stringify(newTable));
}

export const setTimer = (game, view, keyHandler, ms) => {
    const timer = setInterval(() => {
        if (game.moveDown()) {
            clearInterval(timer);
            showRecordTable();
            removeEventListener('keydown', keyHandler);

        }
        view.drawPlayField(game.getPlayField());
    }, ms);
    return timer;
}
