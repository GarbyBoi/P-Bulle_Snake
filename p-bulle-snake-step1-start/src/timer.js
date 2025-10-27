let startTime = null;
let elapsedTime = 0;
let timerInterval = null;

/**
 * Démarre le chronomètre du jeu.
 */
export function startTimer() {
  startTime = Date.now();
  elapsedTime = 0;

  // Met à jour le temps écoulé toutes les secondes
  timerInterval = setInterval(() => {
    elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  }, 1000);
}

/**
 * Arrête le chronomètre et renvoie le temps total écoulé (en secondes).
 * @returns {number} Temps total écoulé en secondes.
 */
export function stopTimer() {
  clearInterval(timerInterval);
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);
  return elapsedTime;
}

/**
 * Dessine le temps écoulé dans le coin supérieur droit du canvas.
 * @param {CanvasRenderingContext2D} ctx - Contexte de rendu du canvas.
 * @param {HTMLCanvasElement} canvas - Le canvas de jeu.
 */
export function drawTimer(ctx, canvas) {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillText(`Time: ${elapsedTime}s`, canvas.width - 10, 10);
}
