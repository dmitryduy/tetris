const canvas = document.querySelector('.tetris');
export const ctx = canvas.getContext('2d');

const nextTetraminoCanvas = document.querySelector('canvas.left-side__next-tetramino');
export const nextTetraminoctx = nextTetraminoCanvas.getContext('2d');

export const score = document.querySelector('.left-side__score');
export const rows = document.querySelector('.left-side__rows');
export const returnToHomeButton = document.querySelector('.return-to-home');
export const game = document.querySelector('.game');
export const leaderboard = document.querySelector('.leaderboard');
export const greetings = document.querySelector('.greetings');
export const leftSideName =  document.querySelector('.left-side__name');
export const table = document.querySelector('.table');

export let name = null;
export const tetraminos = [
    [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
    [
        [1, 1],
        [1, 1]
    ],
    [
        [0, 0, 0],
        [1, 0, 0],
        [1, 1, 1]
    ],
    [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0]
    ],
    [
        [0, 0, 0],
        [0, 0, 1],
        [1, 1, 1]
    ],
    [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 1]
    ]
];
export const colors = ['#00ffff', '#ffff00', '#800080', '#00ff00', '#ff0000', '#0000ff', '#ff7f00', '#7f7f7f'];
export const Piece = (type, color=null) => ({color, type});
export const aboutTimer = {
    currentLevel: 0,
    levels: [
        {
            score: 100,
            ms: 3000
        },
        {
            score: 500,
            ms: 700
        },
        {
            score: 1000,
            ms: 600
        },
        {
            score: 2000,
            ms: 500
        },
        {
            score: 5000,
            ms: 400
        },
        {
            score: 10000,
            ms: 300
        },
        {
            score: 20000,
            ms: 20
        },
        {
            score: 50000,
            ms: 10
        },
        {
            score: 100000,
            ms: 50
        },
    ],
}