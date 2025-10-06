import { initSnake, moveSnake, drawSnake } from "./snake.js";
import { generateFood, drawFood } from "./food.js";
import { handleDirectionChange } from "./controls.js";
import { checkCollision, checkWallCollision } from "./collision.js";
import { drawScore } from "./score.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const gameSpeed = 170;
const directionQueue = [];//gère 2 moves en même temps dans le même intervale

let snake;
let food;
let direction = "RIGHT";
let score = 0;
let gameInterval; // Variable pour stocker l'identifiant de l'intervalles

document.addEventListener("keydown", (event) => {
  const lastDirection = directionQueue.length > 0 ? directionQueue[directionQueue.length - 1] : direction;
  const newDirection = handleDirectionChange(event, lastDirection);
  //gère les double mouvements dans le même intervale
  if (newDirection !== lastDirection) {
    directionQueue.push(newDirection);
  }
});

function startGame() {
  snake = initSnake();
  food = generateFood(box, canvas);

  gameInterval = setInterval(draw, gameSpeed); // Stockage de l'identifiant de l'intervalle
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (directionQueue.length > 0) {
  direction = directionQueue.shift();//gère les mouvements dans l'ordre
}
  const head = moveSnake(snake, direction, box);

  //si la tête et la nouritures partage les mêmes cordonnées, +1 de score et nouvelle pomme, pas de pop le snake grandi
  if (head.x === food.x && head.y === food.y) {
    score++; 
    food = generateFood(box, canvas);
  } 
  else {
    snake.pop();
  }

  //arrête la partie en cas de collision vaec le corps ou le mur (si true ou true)
  if (checkCollision(head, snake) || checkWallCollision(head, canvas, box)) {
    clearInterval(gameInterval); // interrompt la partie
    alert("Game Over! Your score: " + score);
    return; // interrompt draw()
  }

  drawSnake(ctx, snake, box);
  drawFood(ctx, food, box);
  drawScore(ctx, score);
}

startGame();
