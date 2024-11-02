// index.js

import { startGame, resetGame } from './game.js';
import { initializeControls } from './controls.js';

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById('startButton'); // Botón "Empezar a Jugar"
    const continueButton = document.getElementById('continueButton'); // Botón "Seguir jugando"
    const restartButton = document.getElementById('restartButton');
    if (restartButton) {
    restartButton.addEventListener('click', () => {
        document.getElementById('gameOverModal').classList.add('hidden'); // Oculta el modal
        resetGame(); // Reinicia el juego desde el principio
        showButton(startButton); // Muestra el botón "Empezar a Jugar" nuevamente
    });
}
// Oculta todos los botones inicialmente
    function hideAllButtons() {
        if (startButton) startButton.classList.add('hidden');
        if (continueButton) continueButton.classList.add('hidden');
        if (restartButton) restartButton.classList.add('hidden');
    }

    // Muestra solo el botón especificado, si no es null
    function showButton(button) {
        hideAllButtons();
        if (button) {
            button.classList.remove('hidden');
        }
    }

    // Configuración del botón "Empezar a Jugar" para iniciar el juego
    if (startButton) {
        startButton.addEventListener('click', () => {
            showButton(null); // Oculta todos los botones
            startGame(); // Inicia el juego
        }, { once: true });
    }

    // Función para mostrar el botón "Seguir jugando" solo cuando se pierde una vida
    function showContinueButton() {
        showButton(continueButton); // Muestra solo el botón "Seguir jugando"
        if (continueButton) {
            continueButton.addEventListener('click', () => {
                showButton(null); // Oculta todos los botones
                startGame(); // Continua el juego sin reiniciar las vidas ni el nivel
            }, { once: true }); // Asegura que el evento solo se registre una vez
        }
    }

    // Configuración del botón "Reiniciar" en el modal de Game Over
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            const gameOverModal = document.getElementById('gameOverModal');
            if (gameOverModal) gameOverModal.classList.add('hidden'); // Oculta el modal de Game Over
            resetGame(); // Reinicia el juego desde el principio
            showButton(startButton); // Muestra el botón "Empezar a Jugar" nuevamente
        });
    }

    // Inicializa los controles para el movimiento de las palas y pausar el juego
    initializeControls();

    // Exporta showContinueButton para poder llamarlo desde game.js cuando se pierda una vida
    window.showContinueButton = showContinueButton; // Hace la función accesible globalmente

    // Muestra el botón "Empezar a Jugar" al cargar la página
    showButton(startButton);
});