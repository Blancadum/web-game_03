// paddles.js

import { canvas } from './canvas.js';
export const paddleWidth = 10;
export const paddleHeight = 100;

export let leftPaddleY = (canvas.height - paddleHeight) / 2;
export let rightPaddleY = (canvas.height - paddleHeight) / 2;
const paddleSpeed = 4;

// Movimiento de la pala del jugador
export function movePlayerPaddle(direction) {
    if (direction === "up" && leftPaddleY > 0) {
        leftPaddleY -= paddleSpeed;
    } else if (direction === "down" && leftPaddleY < canvas.height - paddleHeight) {
        leftPaddleY += paddleSpeed;
    }
}

// Movimiento de la pala del ordenador (controlada automáticamente)
export function moveComputerPaddle(ballY) {
    if (ballY < rightPaddleY + paddleHeight / 2) {
        rightPaddleY -= paddleSpeed;
    } else if (ballY > rightPaddleY + paddleHeight / 2) {
        rightPaddleY += paddleSpeed;
    }
}

// Dibuja una pala en el canvas
export function drawPaddle(ctx, x, y) {
    ctx.fillStyle = 'pink';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

