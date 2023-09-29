var rs = require('readline-sync');
const console = require('console');
const { Console } = require('console');
let board = {};
let boardSize = 10;
let arrayKeys = []; // Represent rows in object based grid
let arrayHitTracker= []; // Easier tracking of what ships are available.
let strike;
let battleshipsDown = 0;

const ships = [
  {name: '1', size : 2},
  {name: '2', size : 3},
  {name: '3', size : 3},
  {name: '4', size : 4},
  {name: '5', size : 5},
]


function randomVal (boatSize){   //Random value generator that keeps coordinates within the boundaries of the grid.
  let x;
  do{
    x = Math.ceil(Math.random() * (boardSize ));
  } while(boardSize - (x + boatSize) < 0 )
    return x
 } 


function createGrid(size) {
  const grid = {};
  for (let i = 1; i <= size; i++) {
    const row = String.fromCharCode(i+ 64);
    grid[row] = {};
    for (let j = 1; j <= size; j++) {
        grid[row][j] = ''; // Set  columns to empty strings   
    }
  }
  return grid;
}


function placeShipRandomly(grid, size, name) {
  let isEmpty; //Counts empty spaces prior to initiating ship placement to ensure there are will be no overlap. 
 
  do {
    let startRow = String.fromCharCode(randomVal(size) + 64); // Row and column prior starting coordinates
    let startCol = randomVal(size);
    const isHorizontal = Math.random() < 0.5; // Randomly choose horizontal or vertical placement
    
    isEmpty = 0;
    
    if (isHorizontal) {
      for (let i = 0; i < size; i++) {
        if(grid[startRow][startCol + i] == ''){
          isEmpty+=1;
      } else break;
    }
  
    for (let i = 0; i < size; i++) {
      if(isEmpty == size){
      grid[startRow][startCol + i] = name;
      } 
    } 
     
    }else {
      for (let i = 0; i < size; i++) {
        if(grid[ String.fromCharCode(startRow.charCodeAt(0) + i)][startCol] == ''){
          isEmpty+=1;
        } else break;
      }

      if(isEmpty == size){
        for (let i = 0; i < size; i++) {
          grid[ String.fromCharCode(startRow.charCodeAt(0) + i)][startCol] = name; 
        }
      }
    }
  } while(isEmpty < size );
  }


function checkCoordinates(grid, strike){
    const row = strike[0];
    const col = parseInt(strike.substring(1));
    
    if ( grid[row][col] == '') {  //When an empty space is hit, it marks it with 'O'
      console.log('You missed!') 
      grid[row][col]='O';
   } else if ( grid[row][col] !== 'O'||  grid[row][col] !== 'X'){    // Checks for hit or miss symbols
       arrayHitTracker[arrayHitTracker.indexOf(grid[row][col])] = 'X'; // Replaces number of ship with  an 'X 'before conditional below
       
      if(arrayHitTracker.includes(grid[row][col])){ //Tracks hits available on ship.
        console.log('You hit a battleship!');
     } else {
          if (battleshipsDown == 0){
             console.log('You sunk a battleship!'); 
             battleshipsDown += 1;
          } else { 
            console.log('You sunk another battleship!');
            battleshipsDown += 1;
          }   
     }   
      grid[row][col]='X';
      
   } else if ( grid[row][col] == 'O' ||  grid[row][col] == 'X') {  //all strikes are teacked by 'O' or 'X'
          console.log('You have already picked this location. Miss!')
    
   } else if (col > size){
        console.log('Not a valid coordinate.')
       }
       console.table(grid);
  } 



  function validateCoordinates(val) {    
      if (arrayKeys.includes(val[0]) && parseInt(val.substring(1)) <= boardSize && parseInt(val.substring(1)) >= 1){
      return true;   
      } else {
        console.log('Invalid input. Please try again.');
        return false;
      }
    }
  
/************************************************************************************************/


do{
  rs.keyInPause('Press any key to start the game');
  board = createGrid(boardSize);
  
  
  for (const ship of ships) {
    placeShipRandomly(board, ship.size, ship.name);
  }
  arrayHitTracker = Object.values(board).map(obj => Object.values(obj)).flat();
  arrayKeys = Object.keys(board).flat(); 
    
  console.table(board);
 
  while(arrayHitTracker.includes('1')|| arrayHitTracker.includes('2')|| arrayHitTracker.includes('3')|| arrayHitTracker.includes('4')|| arrayHitTracker.includes('5')){
  console.log('Enter a location to strike ie "A2"');
  
  do{
    strike = rs.prompt().toUpperCase();
    var check = validateCoordinates(strike); 
   
  } while (check == false);
    checkCoordinates(board, strike);
    if(battleshipsDown === 5){
      console.log('You sunk all of the battleships and won the game!');
    }
  }

}while (rs.keyInYN('Do you want to play again?')); 
