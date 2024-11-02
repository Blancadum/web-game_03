// canvas.js

const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

export { canvas, ctx };

// Función para limpiar y actualizar el canvas
export function draw(drawBall, drawPaddle, leftPaddleY, rightPaddleY, paddleWidth) {
    // Color de fondo del canvas
    ctx.fillStyle = '#ffffff'; // Fondo blanco
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Limpia y pinta el fondo del canvas

    drawBall(ctx); // Dibuja la pelota usando el contexto
    drawPaddle(ctx, 0, leftPaddleY); // Dibuja la pala izquierda
    drawPaddle(ctx, canvas.width - paddleWidth, rightPaddleY); // Dibuja la pala derecha
}
