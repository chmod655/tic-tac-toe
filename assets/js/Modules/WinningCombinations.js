
/**
 * Essas Duas Constantes são apenas classes que iram
 *  serão adicionadas no decorrer do turnos de jogo
 * 
 * X - será sempre escolhido por padrão pelo (jogador 1) e
 *  circulo pelo (jogador 2)
 */
export const PLAYER_X_CLASS = 'x'
export const PLAYER_O_CLASS = 'circle'

/**
 * Já essa são todas as combinações possíves para ganhar 
 * o jogo fora delas é empate!
*/
export const WINNING_COMBINATIONS = [
    // HORIZONTAL
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // VERTICAL
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // CROSS
    [0, 4, 8],
    [2, 4, 6]
]
/**
 * Essas variaveis estão sendo exportadas para o arquivo que contem as funções e eventos!  
*/ 