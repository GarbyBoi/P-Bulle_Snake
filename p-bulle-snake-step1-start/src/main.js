import { initSnake, moveSnake, drawSnake } from "./snake.js";
import { generateFood, drawFood } from "./food.js";
import { handleDirectionInput, getNextDirection } from "./controls.js";
import { checkCollision, checkWallCollision } from "./collision.js";
import { drawScore } from "./score.js";
import { startTimer, stopTimer, drawTimer, pauseTimer, resumeTimer } from "./timer.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const gameSpeed = 110;
let snake;
let food;
let direction = "RIGHT";
let score = 0;
let gameInterval;
let totalTime = 0;
let paused = false;

/**
 * Initialise et démarre une nouvelle partie
 */
function startGame() {
  snake = initSnake();
  food = generateFood(box, canvas);
  score = 0;
  direction = "RIGHT";
  totalTime = 0;
  startTimer();
  gameInterval = setInterval(draw, gameSpeed);
}

/**
 * Dessine et met à jour le jeu : mouvement du serpent, nourriture, collisions, rendu
 */
function draw() {
  if (paused) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Mise à jour de la direction via la queue
  direction = getNextDirection(direction);

  // Déplacement du serpent
  const head = moveSnake(snake, direction, box);

  // Gestion de la nourriture
  if (head.x === food.x && head.y === food.y) {
    score++;
    food = generateFood(box, canvas);
  } else {
    snake.pop();
  }

  // Gestion des collisions
  if (checkCollision(head, snake) || checkWallCollision(head, canvas, box)) {
    endGame();
    return; // stoppe draw() ici
  }

  // Dessin
  drawSnake(ctx, snake, box);
  drawFood(ctx, food, box);
  drawScore(ctx, score);
  drawTimer(ctx, canvas);
}

/**
 * Affiche l'écran de fin de partie et arrête la boucle
 */
function endGame() {
  clearInterval(gameInterval);
  totalTime = stopTimer();

  // Fond blanc
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Texte principal
  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  ctx.font = "36px Arial, sans-serif";
  ctx.fillText("Game Over !", canvas.width / 2, canvas.height / 2 - 35);

  // Score
  ctx.font = "24px Arial, sans-serif";
  ctx.fillText(`Ton score : ${score}`, canvas.width / 2, canvas.height / 2 + 5);
  ctx.fillText(`En: ${totalTime}s`, canvas.width / 2, canvas.height / 2 + 35);

  // Instruction
  ctx.font = "18px Arial, sans-serif";
  ctx.fillText("Appuie sur F5 pour rejouer", canvas.width / 2, canvas.height / 2 + 70);
}


/**
 * Bascule entre pause et reprise.
 */
function togglePause() {
  if (!paused) {
    paused = true;
    clearInterval(gameInterval);
    pauseTimer();
    drawPauseOverlay();
  } else {
    paused = false;
    resumeTimer();
    gameInterval = setInterval(draw, gameSpeed);
  }
}

/**
 * Dessine un rectangle semi-transparent avec "Pause" au centre.
 */
function drawPauseOverlay() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "36px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Pause", canvas.width / 2, canvas.height / 2);
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    togglePause();
  } else {
    handleDirectionInput(event, direction);
  }
});


// Gestion du clavier
document.addEventListener("keydown", (event) => {
  handleDirectionInput(event, direction);
});

// Démarre le jeu
startGame();
