// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.

// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
// I numeri nella lista delle bombe non possono essere duplicati.
// [23, 65, 1, 4,78,15,....];
// In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
// La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti.
// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

// **BONUS:**
// **2- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
// ****3- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste

// INPUT
const gridInput = document.querySelector('.grid')
const btn = document.querySelector('.play-button')
const option = document.getElementById('difficult')
// console.log(option.value);
let bomb = []
let cellnumber
// LOGICA
//creare la griglia al click del bottone 'play'
btn.addEventListener('click', function(){
    let difficult = option.value
    if (difficult === 'easy'){
        cellnumber = 49
        generateGrid(cellnumber, 'easy')
        generateBomb(cellnumber)
        addFunctionToClick('div.grid-item', handleClick)

    } else if(difficult === 'medium'){
        cellnumber = 81
        generateGrid(cellnumber, 'medium')
        generateBomb(cellnumber)
        addFunctionToClick('div.grid-item', handleClick)
    } else if(difficult === 'hard'){
        cellnumber = 100
        generateGrid(cellnumber, 'hard')
        generateBomb(cellnumber)
        addFunctionToClick('div.grid-item',handleClick)
    }


})

// functions
/**
 * Description creazione di tanti item quanti richiesti
 * @returns item
*/
function createGridItems(innerText, lvl){
    const Item = document.createElement('div')
    Item.classList.add('grid-item', lvl)
    Item.innerText = innerText
    return Item
}

/**
 * Description genera una griglia di number blocchi
*/
function generateGrid(number, lvlmode){
    gridInput.innerHTML = ''
    for (let i = 1; i <= number; i++){
        const grid = createGridItems(i, lvlmode)
        gridInput.append(grid)     
    }
}

/**
 * richiamando domelement aggiunge il click e una funzione 
 * @param {dom} domelement 
 * @param {function} functionToInsert 
 */
function addFunctionToClick(domelement, functionToInsert){
    const arrayItems = document.querySelectorAll(domelement)
    for(i = 0; i < arrayItems.length; i++){
        const currentItem = arrayItems[i]
        currentItem.addEventListener('click', functionToInsert)
    }
}

/**
 * all'elemento selezionato aggiunge il background
 */
function handleClick(){
    this.classList.add('bg-change')
    const itemContent = parseInt(this.textContent)
    console.log (itemContent)
    const normalItemArray = []
    let normalItemNumber = parseInt(cellnumber) - 16
    if (bomb.includes(itemContent)) {
        this.style.backgroundColor = 'red'
        alert('perso')
        removeEventListener('click', addFunctionToClick)
    } else if(!normalItemArray.includes(itemContent)){
        normalItemArray.push(itemContent)
        console.log(normalItemArray);
        if (normalItemArray.length === parseInt(normalItemNumber)) {
            alert(`hai vinto, hai cliccato su ${normalItemNumber} caselle senza bomba`)
            removeEventListener('click',addFunctionToClick)  
        }
    }
}

/**
 * genera un array di di numeri che saranno le posizioni delle bombe nella griglia
 * @param {number} cellsGridNumber
 * @returns bomb 
 */
function generateBomb(cellsGridNumber){
    bomb=[]
    while(bomb.length < 16){
        const num = getRndInteger(1,cellsGridNumber)
        if (!bomb.includes(num)){
            bomb.push(num)
        }
    }
    console.log(bomb);
    return bomb
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }