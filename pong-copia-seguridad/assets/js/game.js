// game.js

import { initializeBall, updateBallPosition, ballY, drawBall, ballSpeedX, ballSpeedY } from './ball.js';
import { drawPaddle, moveComputerPaddle, leftPaddleY, rightPaddleY, paddleWidth, paddleHeight } from './paddles.js';
import { draw } from './canvas.js';


let gameRunning = false;
let lives = 3;
let level = 1;

let timerInterval;
let secondsElapsed = 0;

function startTimer() {
    clearInterval(timerInterval); // Detiene cualquier temporizador previo
    timerInterval = setInterval(() => {
        secondsElapsed++;
        updateTimerDisplay(); // Llama a una función que actualiza la visualización del temporizador
    }, 1000); // Incrementa cada segundo
}

function stopTimer() {
    clearInterval(timerInterval); // Detiene el temporizador
}

// Actualiza la visualización del temporizador en la interfaz (si tienes un elemento para mostrarlo)
function updateTimerDisplay() {
    const minutes = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
    const seconds = String(secondsElapsed % 60).padStart(2, '0');
    const timeDisplay = document.querySelector('#timeDisplay span');
    if (timeDisplay) {
        timeDisplay.textContent = `${minutes}:${seconds}`;
    }
}

// Función para actualizar el número de vidas en la interfaz
function updateLivesDisplay() {
    const livesDisplay = document.querySelector('#playerLives span');
    if (livesDisplay) {
        livesDisplay.textContent = lives;
    }
}

// Función para actualizar el nivel en la interfaz
function updateLevelDisplay() {
    const levelDisplay = document.querySelector('#levelDisplay span');
    if (levelDisplay) {
        levelDisplay.textContent = level;
    }
}

function startGame() {
    gameRunning = true;
    initializeBall(); // Reinicia la posición de la pelota
    startTimer(); // Inicia el temporizador
    gameLoop(); // Inicia el bucle del juego
}

function stopGame() {
    gameRunning = false; // Detiene el juego
    stopTimer(); // Detiene el temporizador
}

function resetGame() {
    lives = 3;
    level = 1;
    secondsElapsed = 0; // Reinicia el temporizador visual y lógico
    updateLivesDisplay();
    updateLevelDisplay();
    startGame();
}

// Nueva función isGameRunning para verificar el estado del juego
function isGameRunning() {
    return gameRunning;
}

function gameLoop() {
    if (!gameRunning) return;
    moveComputerPaddle(ballY);
    updateBallPosition(leftPaddleY, rightPaddleY, paddleWidth, paddleHeight, onLifeLost, onGameOver);
    
    // Llama a `draw` de `canvas.js` para actualizar la vista
    draw(drawBall, drawPaddle, leftPaddleY, rightPaddleY, paddleWidth);

    requestAnimationFrame(gameLoop); // Vuelve a llamar a gameLoop en el siguiente frame
}

function onLifeLost() {
    lives--;
    updateLivesDisplay();
    stopGame();
    if (lives > 0) {
        window.showContinueButton();
    }
}

function onGameOver() {
    if (lives <= 0) {
        showGameOver(); // Muestra el modal de "Game Over"
        return true;
    }
    return false;
}

// Define showGameOver para mostrar el modal de "Game Over" o algún mensaje final
function showGameOver() {
    const gameOverModal = document.getElementById('gameOverModal');
    if (gameOverModal) {
        gameOverModal.classList.remove('hidden'); // Muestra el modal de Game Over
    }
}

setInterval(() => {
    ballSpeedX *= 1.05; // Aumenta un 5% cada 10 segundos
    ballSpeedY *= 1.05;
}, 10000); // Cada 10,000 milisegundos (10 segundos)

// Exporta todas las funciones necesarias, incluyendo isGameRunning
export { startGame, stopGame, resetGame, isGameRunning };