let directionQueue = [];

/**
 * Gère le changement de direction du serpent en fonction de l'entrée de l'utilisateur
 * et maintient une file d'attente pour les mouvements rapides.
 *
 * @param {KeyboardEvent} event - L'événement clavier
 * @param {string} currentDirection - Direction actuelle du serpent
 */
export function handleDirectionInput(event, currentDirection) {
  const lastDirection = directionQueue.length > 0
      ? directionQueue[directionQueue.length - 1]
      : currentDirection;

  const newDirection = handleDirectionChange(event, lastDirection);

  if (newDirection !== lastDirection) {
    directionQueue.push(newDirection);
  }
}

/**
 * Récupère et vide la prochaine direction dans la queue
 * @param {string} currentDirection - Direction actuelle
 * @returns {string} - Nouvelle direction du serpent
 */
export function getNextDirection(currentDirection) {
  if (directionQueue.length > 0) {
    return directionQueue.shift();
  }
  return currentDirection;
}

/**
 * Vérifie et retourne la nouvelle direction selon les touches pressées
 *
 * Cette fonction prévient le serpent de se retourner directement sur lui-même.
 *
 * @param {KeyboardEvent} event - L'événement clavier
 * @param {string} currentDirection - La direction actuelle
 * @returns {string} - La nouvelle direction si valide, sinon la direction actuelle
 */
export function handleDirectionChange(event, currentDirection) {
  if (event.key === "ArrowLeft" && currentDirection !== "RIGHT") {
    return "LEFT";
  } else if (event.key === "ArrowUp" && currentDirection !== "DOWN") {
    return "UP";
  } else if (event.key === "ArrowRight" && currentDirection !== "LEFT") {
    return "RIGHT";
  } else if (event.key === "ArrowDown" && currentDirection !== "UP") {
    return "DOWN";
  }
  return currentDirection; 
}
