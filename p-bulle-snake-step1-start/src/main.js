import { initSnake, moveSnake, drawSnake } from "./snake.js";
import { generateFood, drawFood } from "./food.js";
import { handleDirectionChange } from "./controls.js";
import { checkCollision, checkWallCollision } from "./collision.js";
import { drawScore } from "./score.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const gameSpeed = 200;
let snake;
let food;
let direction = "RIGHT";
let score = 0;
let gameInterval; // Variable pour stocker l'identifiant de l'intervalle

document.addEventListener("keydown", (event) => {
  direction = handleDirectionChange(event, direction);
});

function startGame() {
  snake = initSnake();
  food = generateFood(box, canvas);

  gameInterval = setInterval(draw, gameSpeed); // Stockage de l'identifiant de l'intervalle
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const head = moveSnake(snake, direction, box);

  //si la tête et la nouritures partage les mêmes cordonnées, +1 de score et nouvelle pomme, pas de pop le snake grandi
  if (head.x === food.x && head.y === food.y) {
    score++; 
    food = generateFood(box, canvas);
  } 
  else {
    snake.pop(); //bouge normalement
  }
  drawSnake(ctx, snake, box);
  drawFood(ctx, food, box)
}

startGame();
