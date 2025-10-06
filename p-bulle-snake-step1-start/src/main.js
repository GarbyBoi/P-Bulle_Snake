import { initSnake, moveSnake, drawSnake } from "./snake.js";
import { generateFood, drawFood } from "./food.js";
import { handleDirectionInput, getNextDirection } from "./controls.js";
import { checkCollision, checkWallCollision } from "./collision.js";
import { drawScore } from "./score.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const gameSpeed = 170;
let snake;
let food;
let direction = "RIGHT";
let score = 0;
let gameInterval;

/**
 * Initialise et démarre une nouvelle partie
 */
function startGame() {
  snake = initSnake();
  food = generateFood(box, canvas);
  score = 0;
  direction = "RIGHT";

  gameInterval = setInterval(draw, gameSpeed);
}

/**
 * Dessine et met à jour le jeu : mouvement du serpent, nourriture, collisions, rendu
 */
function draw() {
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
}

/**
 * Affiche l'écran de fin de partie et arrête la boucle
 */
function endGame() {
  clearInterval(gameInterval);

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

  // Instruction
  ctx.font = "18px Arial, sans-serif";
  ctx.fillText("Appuie sur F5 pour rejouer", canvas.width / 2, canvas.height / 2 + 40);
}

// Gestion du clavier
document.addEventListener("keydown", (event) => {
  handleDirectionInput(event, direction);
});

// Démarre le jeu
startGame();
