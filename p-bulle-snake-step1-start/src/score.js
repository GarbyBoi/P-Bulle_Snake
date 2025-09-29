/**
 * Dessine le score sur le canvas.
 *
 * Cette fonction affiche le score actuel du jeu dans le coin supérieur gauche du canvas.
 * Le score est affiché en noir avec une police Arial de 20px.
 *
 * @param {CanvasRenderingContext2D} ctx - Le contexte de rendu 2D du canvas utilisé pour dessiner.
 * @param {number} score - Le score à afficher, qui est un entier.
 */
export function drawScore(ctx, score) {
  ctx.fillStyle = "black";           // couleur du texte
  ctx.font = "20px Arial";           // police et taille
  ctx.textAlign = "left";            // alignement à gauche
  ctx.textBaseline = "top";          // alignement vertical en haut
  ctx.fillText(`Score: ${score}`, 10, 10);  // position dans le coin supérieur gauche (10px, 10px)
}
