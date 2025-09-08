/**
 * Initialise le serpent au début du jeu.
 *
 * Cette fonction crée le serpent en tant que tableau contenant un seul segment,
 * positionné à une position de départ définie sur la grille.
 *
 * @returns {Array<{x: number, y: number}>} - Un tableau contenant un objet représentant la position du premier segment du serpent.
 */
export function initSnake() {
  const box = 20; //longueure d'une case
  const startX = 5 * box; // position de départ en X (5 cases * taille d'une case = 100px)
  const startY = 5 * box; // position de départ en Y (5 cases * taille d'une case = 100px)
  

  // serpent avec 3 segments : tête + 2 segments de queue
  const snake = [
    { x: startX, y: startY },          // tête
    { x: startX - box, y: startY },    // segment 1
    { x: startX - 2 * box, y: startY } // segment 2
  ];

   return snake;
}

/**
 * Déplace le serpent dans la direction actuelle.
 *
 * Cette fonction calcule la nouvelle position de la tête du serpent en fonction
 * de la direction actuelle (gauche, haut, droite, bas). Le reste du corps du serpent
 * suit la tête. La fonction retourne un objet représentant la nouvelle position de la tête du serpent.
 *
 * @param {Array<{x: number, y: number}>} snake - Le tableau représentant le serpent, où chaque élément est un segment avec des coordonnées `x` et `y`.
 * @param {string} direction - La direction actuelle du mouvement du serpent ("LEFT", "UP", "RIGHT", ou "DOWN").
 * @param {number} box - La taille d'une case de la grille en pixels, utilisée pour déterminer la distance de déplacement du serpent.
 * @returns {{x: number, y: number}} - Un objet représentant les nouvelles coordonnées `x` et `y` de la tête du serpent après le déplacement.
 */
export function moveSnake(snake, direction, box) {

  //copie de la tête
  const head = { ...snake[0] }; 

  //direction
  if (direction === "LEFT") head.x -= box;
  if (direction === "UP") head.y -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "DOWN") head.y += box;

  snake.unshift(head);

  return head;

}

/**
 * Dessine le serpent sur le canvas.
 *
 * Cette fonction parcourt chaque segment du serpent et le dessine sur le canvas en utilisant
 * un rectangle coloré. La tête du serpent est dessinée dans une couleur différente des autres segments
 * pour la distinguer visuellement. Chaque segment est dessiné à sa position actuelle sur la grille,
 * avec une taille déterminée par la valeur de `box`.
 *
 * @param {CanvasRenderingContext2D} ctx - Le contexte de rendu 2D du canvas utilisé pour dessiner.
 * @param {Array<{x: number, y: number}>} snake - Un tableau représentant le serpent, où chaque élément est un segment avec des coordonnées `x` et `y`.
 * @param {number} box - La taille d'une case de la grille en pixels, utilisée pour déterminer la taille de chaque segment du serpent.
 */
export function drawSnake(ctx, snake, box) {
  for (let i = 0; i < snake.length; i++) {
    if (i === 0) {
      ctx.fillStyle = "green"; // tête plus foncée
    } else {
      ctx.fillStyle = "lightgreen"; // queue plus clair
    }
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
}

