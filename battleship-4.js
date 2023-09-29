const rs = require('readline-sync');
const console = require('console');
const { Console } = require('console');

let board = {};
let computerBoard = {};
let boardSize = 10;
let arrayKeys = [];
let arrayHitTracker = [];
let computerArrayHitTracker = [];
let hitT;
let strike;
let battleshipsDown = 0;
let computerBattleshipsDown = 0;

const ships = [
  { name: '1', size: 2 },
  { name: '2', size: 3 },
  { name: '3', size: 3 },
  { name: '4', size: 4 },
  { name: '5', size: 5 },
];


function randomVal(boatSize) {
  let x;
  do {
    x = Math.ceil(Math.random() * (boardSize));
  } while (boardSize - (x + boatSize) < 0)
  return x;
}

function createGrid(size) {
  const grid = {};
  for (let i = 1; i <= size; i++) {
    const row = String.fromCharCode(i + 64);
    grid[row] = {};
    for (let j = 1; j <= size; j++) {
      grid[row][j] = '';
    }
  }
  return grid;
}

function placeShipRandomly(grid, size, name) {
  let isEmpty;
  do {
    let startRow = String.fromCharCode(randomVal(size) + 64);
    let startCol = randomVal(size);
    const isHorizontal = Math.random() < 0.5;
    isEmpty = 0;

    if (isHorizontal) {
      for (let i = 0; i < size; i++) {
        if (grid[startRow][startCol + i] == '') {
          isEmpty += 1;
        } else break;
      }
      for (let i = 0; i < size; i++) {
        if (isEmpty == size) {
          grid[startRow][startCol + i] = name;
        }
      }
    } else {
      for (let i = 0; i < size; i++) {
        if (grid[String.fromCharCode(startRow.charCodeAt(0) + i)][startCol] == '') {
          isEmpty += 1;
        } else break;
      }
      if (isEmpty == size) {
        for (let i = 0; i < size; i++) {
          grid[String.fromCharCode(startRow.charCodeAt(0) + i)][startCol] = name;
        }
      }
    }
  } while (isEmpty < size);
}

function checkCoordinates(grid, strike) {
  const row = strike[0];
  const col = parseInt(strike.substring(1));

  if (grid[row][col] == '') {
    console.log('You missed!')
    hitT[row][col] = 'O';
  } else if (hitT[row][col] == 'O' || hitT[row][col] == 'X') {
    console.log('You have already picked this location. Miss!')
  } 
  else if (grid[row][col] !== 'O' || grid[row][col] !== 'X') {
    arrayHitTracker[arrayHitTracker.indexOf(grid[row][col])] = 'X';
    hitT[row][col] = 'X';
    if (arrayHitTracker.includes(grid[row][col])) {
      console.log('You hit a battleship!');
    } else {
      battleshipsDown += 1;
     
      if (battleshipsDown == 0) {
        console.log('You sunk a battleship!');
      } else {
          console.log(`You sunk ${battleshipsDown} battleships! ${5 - battleshipsDown}left.`)
          hitT[row][col] = 'X';
      }
  } }
  } 



function computerAttack(grid) {
  let row = String.fromCharCode(Math.ceil(Math.random() * (boardSize)) + 64);
  let col = Math.ceil(Math.random() * (boardSize)) ;

  if (grid[row][col] == '') {
    console.log('Computer missed!');
    grid[row][col] = 'O';
  } else if (grid[row][col] !== 'O' || grid[row][col] !== 'X') {
    computerArrayHitTracker[computerArrayHitTracker.indexOf(grid[row][col])] = 'X';

    if (computerArrayHitTracker.includes(grid[row][col])) {
      console.log('Computer hit your battleship!');
    } else {
      if (computerBattleshipsDown == 0) {
        console.log('Computer sunk your battleship!');
       
      } else {
        console.log('Computer sunk another of your battleships!');
        computerBattleshipsDown += 1;
      }
    }
    grid[row][col] = 'X';
  } else if (grid[row][col] == 'O' || grid[row][col] == 'X') {
    console.log('Computer already picked this location. Miss!')
  }
  console.table(board);

}

function validateCoordinates(val) {
  if (arrayKeys.includes(val[0]) && parseInt(val.substring(1)) <= boardSize && parseInt(val.substring(1)) >= 1) {
    return true;
  } else {
    
    console.log('Not a valid coordinate. Please try again.');
    return false;
  }
}

do {
  rs.keyInPause('Press any key to start the game');
  board = createGrid(boardSize);
  computerBoard = createGrid(boardSize);
  hitT = createGrid(boardSize);

  for (const ship of ships) {
    placeShipRandomly(board, ship.size, ship.name);
    placeShipRandomly(computerBoard, ship.size, ship.name);
  }
  arrayHitTracker = Object.values(board).map(obj => Object.values(obj)).flat();
  computerArrayHitTracker = Object.values(computerBoard).map(obj => Object.values(obj)).flat();
  arrayKeys = Object.keys(board).flat();

  console.log('Your board:');
  console.table(board);
  

  while (battleshipsDown < 5 && computerBattleshipsDown < 5) {
    console.log('Enter a location to strike (e.g., "A2")');
    console.log('Your past strikes:')
    console.table(hitT);
    do {
      strike = rs.prompt().toUpperCase();
      var check = validateCoordinates(strike);
    } while (check == false);
 
      checkCoordinates(computerBoard, strike);
      if (battleshipsDown === 5) {
        console.log('You sunk all of the computer\'s battleships and won the game!');
        break;
      }
      computerAttack(board);
      if (computerBattleshipsDown === 5) {
        console.log('Computer sunk all of your battleships. You lost the game!');
        break;
      }
    
   
  }
} while (rs.keyInYN('Do you want to play again?'));