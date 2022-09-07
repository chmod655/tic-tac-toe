/**
 * Esse arquivo importado trás as classes do player e combinações de estado de jogo!
 */
import {
    PLAYER_X_CLASS,
    PLAYER_O_CLASS,
    WINNING_COMBINATIONS
} from "./Modules/WinningCombinations.js"

/**
 * Pegando os elementos do DOM
 * */
const elements = {
    cells: document.querySelectorAll('[data-cell]'),
    board: document.querySelector('#board'),
    winMessage: document.querySelector('#winningMessage'),
    winMessageText: document.querySelector('#winningMessageText'),
    restartButton: document.querySelector('#restartButton')
}


/** 
 * Variaveis 
 *  Essa variavel vai verificar se o player é um circulo ou não
 * no caso ele é false por padrão ou seja o player1 sempre ira ser X a não ser se for true
 */
let isPlayer_O_Turn = false


//  Destruct
const {
    cells,
    winMessage,
    winMessageText,
    board,
    restartButton
} = elements

/** 
 * Functions
*/
//  Essa Função vai trocar de turno
// se o jogador x jogou o turno ira para o jogador o
function swapTurns() {

    /**
     * Se for true vai ser false se false, true
     * ----------------------------------------
     * A troca de turno funciona dessa maneira
     * se o jogador X jogou é esperado que isPlayer_O_Turn se
     * realmente false!
     * logo então sabendo disso essa função re-atribui 
     * isPlayer_O_Turn com ela mesma so que o usando o sinal (!NOT)
     * ---------------------------
     * dessa maneira criando de vez a cada jogada
     */
    isPlayer_O_Turn = !isPlayer_O_Turn
}

// Marca o lugar
function placeMark(cell, currentClass) {

    /**
     * como currentClass é uma variavel em 
     * handleCellClick que retorna ou PLAYER_O_CLASS/PLAYER_X_CLASS
     * ele recebe o nome da classe e com esse nome que é ou 'X' ou 'CIRCLE'
     * ele pega esse parametro e adiciona no DOM
     */
    cell.classList.add(currentClass)

    // essa função coloca os simbolos dependendo de quais players são
}

//  Essa função adiciona hover no quadro do jogo da velha
function setBoardHoverClass() {

    board.classList.remove(PLAYER_X_CLASS)
    board.classList.remove(PLAYER_O_CLASS)

    if(isPlayer_O_Turn) board.classList.add(PLAYER_O_CLASS)
    else board.classList.add(PLAYER_X_CLASS)
}

// verifica se alguém ganhou
function checkWin(currentClass) { 

    /** testa se ao menos um dos elementos no 
    * array passa no teste implementado pela função atribuída e retorna um valor true ou false
    * Link MDN: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    * Esse metodo (.some) vai verificar se tem alguma combinação  
    * -------------------------------------------------------
    *  1- eu uso some para testar se alguma combinção bate com 
    *   as cells
    * 
    *  2- se todas combinações cells[i] tem a class currentClass
    *   ele vai nada mais nada menos que ver se existe a mesma class
    *   x ou o para todas as combinações de WINN
    * se tiver é algum dos players ganham o jogo
    */
    return WINNING_COMBINATIONS.some(combinations => {
        return combinations.every(index => {
            return cells[index].classList.contains(currentClass)
        })   
    })
 }

//  Essa função termina o jogo caso : alguém ganhe ou aconteça um empate
function endGame(draw) {

    /**
     * se draw for true
     * o jogo é dado como empatado
     */
    if (draw) winMessageText.innerText = `It's a draw!`

    /**
     * agora se o jogo não foi empatado é por que alguém ganhou
     * então para saber quem ganhou, passei um operador ternário verificando se quem ganhou foi
     * X ou O
     * claro ele vai retornar um bool
     * e se true circulo
     * caso false x 
     */
    else winMessageText.innerText = `Player with ${isPlayer_O_Turn ? `O's` : `X's`} wins!`

    // Nessa linha ele vai adicionar a classe que irá mostrar a mensagem!
    winMessage.classList.add('show')
}

// Essa função verifica se houve algum empate
function isDraw() {

    // array.every(callBack)
    // testa se todos os elementos do array passam pelo teste implementado pela função fornecida
    return [...cells].every(cell => {

        // Aqui estou verificando se a classe existe no attr classe no elemento 
        return cell.classList.contains(PLAYER_X_CLASS)
            || cell.classList.contains(PLAYER_O_CLASS)
    })
}

//  Essa função lida com eventos de click
// onde quem ira marcar e se alguem ganhou ou empatou
function handleCellClick(e) {

    // Pega o evento
    const cell = e.target

    // Se for true é (O) se não (X)
    const currentClass = isPlayer_O_Turn ?
        PLAYER_O_CLASS : PLAYER_X_CLASS

    // Para marcar o lugar é passado o evento e a classe atual 
    // que é true para circle e false para x
    // Resumindo: (PlayerX: false, PlayerO: true)
    placeMark(cell, currentClass)

    /**
     * Essa primeira condição irá checar se alguém ganhou,
     * dependendo da resposta de checkWin() ele dará false
    */
    if (checkWin(currentClass)) endGame(false)

    /**
     * se for empate termina o jogo
    */
    else if (isDraw()) endGame(true)

    /** 
     * ja se o jogo não der resposta à alguns de cima ele continua a trocar de turno
     * 
     * */
    else {
        swapTurns()
        setBoardHoverClass()
    }
}

/**
 * Toda vez que chamada removerá as classes player e
 * eventos relacionados a [cell]
 * */
function startGame() {

    // O jogador vai ser x
    isPlayer_O_Turn = false

    cells.forEach(cell => {

        cell.classList.remove(PLAYER_X_CLASS)
        cell.classList.remove(PLAYER_O_CLASS)

        cell.removeEventListener('click', handleCellClick)

        /** 
         * Inicia o evento apenas uma vez quando usado a opção
         *  {once : true} que por padrão é false
         * se desejar saber sobre achei esse topico otimo falando sobre
         * https://dev.to/js_bits_bill/addeventlistener-once-js-bits-565d
         */
        cell.addEventListener('click', handleCellClick, { once: true })
    })
    setBoardHoverClass()
    winMessage.classList.remove('show')
}

restartButton.addEventListener('click', startGame)
startGame()