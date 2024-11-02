// ball.js

import { canvas } from './canvas.js';

export let ballX = canvas.width / 2;
export let ballY = canvas.height / 2;
export let ballSpeedX = Math.random() < 0.5 ? 2 : -2; // Exporta ballSpeedX
export let ballSpeedY = (Math.random() * 2 - 1) * 3; // Exporta ballSpeedY
const ballRadius = 10;

// Inicializa la posición de la pelota en el centro del canvas, ajustando la velocidad en función del nivel
export function initializeBall(level = 1) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = (Math.random() < 0.5 ? 2 : -2) * (1 + level * 0.1); // Ajuste en función del nivel
    ballSpeedY = ((Math.random() * 2 - 1) * 3) * (1 + level * 0.1); // Ajuste en función del nivel
}

// Actualiza la posición de la pelota y maneja colisiones
export function updateBallPosition(leftPaddleY, rightPaddleY, paddleWidth, paddleHeight, onLifeLost, onGameOver) {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Colisión con los bordes superior e inferior
    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Colisiones con las palas
    if (ballX - ballRadius < paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
        handlePaddleCollision("left", leftPaddleY, paddleHeight, paddleWidth);
    } else if (ballX + ballRadius > canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
        handlePaddleCollision("right", rightPaddleY, paddleHeight, paddleWidth);
    }

    // Verifica si la pelota sale por los lados (pérdida de vida)
    if (ballX - ballRadius < 0 || ballX + ballRadius > canvas.width) {
        onLifeLost();
        if (onGameOver()) {
            return;
        }
        initializeBall(); // Reinicia la pelota en el centro
    }
}

// Maneja la colisión de la pelota con una pala
function handlePaddleCollision(paddle, paddleY, paddleHeight, paddleWidth) {
    const maxBounceAngle = Math.PI / 4;
    let impactPoint = (ballY - (paddleY + paddleHeight / 2)) / (paddleHeight / 2);
    impactPoint = Math.max(-1, Math.min(1, impactPoint));

    let bounceAngle = impactPoint * maxBounceAngle;
    ballSpeedY = Math.sin(bounceAngle) * Math.abs(ballSpeedX);
    ballSpeedX = -ballSpeedX * 1.05;

    // Ajuste para evitar que la pelota se quede atrapada en la pala
    ballX = paddle === "left" ? paddleWidth + ballRadius : canvas.width - paddleWidth - ballRadius;
}

// Dibuja la pelota en el canvas
export function drawBall(ctx) {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
}
