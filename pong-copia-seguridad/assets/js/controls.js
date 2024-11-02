// controls.js

import { movePlayerPaddle } from './paddles.js';
import { startGame, stopGame, isGameRunning } from './game.js';

function initializeControls() {
    // Controla las flechas para mover la pala del jugador
    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp") {
            movePlayerPaddle("up");
        } else if (event.key === "ArrowDown") {
            movePlayerPaddle("down");
        }
    });

    // Controla la tecla "p" para pausar o reanudar el juego
    document.addEventListener("keydown", (event) => {
        if (event.key === "p" || event.key === "P") {
            if (isGameRunning()) {
                stopGame();
            } else {
                startGame();
            }
        }
    });
}

export { initializeControls };