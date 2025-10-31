let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let paused = false;
let pauseStart = null;
let totalPausedTime = 0;

/**
 * Démarre le chronomètre du jeu.
 */
export function startTimer() {
  startTime = Date.now();
  elapsedTime = 0;
  totalPausedTime = 0;
  paused = false;

  timerInterval = setInterval(updateElapsedTime, 1000);
}

function updateElapsedTime() {
  if (!paused) {
    elapsedTime = Math.floor((Date.now() - startTime - totalPausedTime) / 1000);
  }
}

/**
 * Met le chronomètre en pause.
 */
export function pauseTimer() {
  if (!paused) {
    paused = true;
    pauseStart = Date.now();
    clearInterval(timerInterval);
  }
}

/**
 * Reprend le chronomètre après une pause.
 */
export function resumeTimer() {
  if (paused) {
    paused = false;
    totalPausedTime += Date.now() - pauseStart;
    timerInterval = setInterval(updateElapsedTime, 1000);
  }
}

/**
 * Arrête le chronomètre et renvoie le temps total écoulé.
 */
export function stopTimer() {
  clearInterval(timerInterval);
  elapsedTime = Math.floor((Date.now() - startTime - totalPausedTime) / 1000);
  return elapsedTime;
}

/**
 * Dessine le temps écoulé dans le coin supérieur droit du canvas.
 */
export function drawTimer(ctx, canvas) {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.fillText(`Temps: ${elapsedTime}s`, canvas.width - 10, 10);
}
