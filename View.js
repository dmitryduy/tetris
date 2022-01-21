import { ctx } from "./variables.js";

export const View = () => {
    const CELL_SIZE = 35;
    const drawPlayField = (playField) => {
        ctx.clearRect(0, 0, 1000, 1000);
        for (let y = 0; y < 20; y++) {
            for (let x = 0; x < 10; x++) {
                if (playField[y][x].type) {
                    ctx.fillStyle = playField[y][x].color;
                    ctx.fillRect(CELL_SIZE * x, CELL_SIZE * y, CELL_SIZE - 2, CELL_SIZE - 2);
                }
            }
        }
    }


    return {
        drawPlayField
    }
}