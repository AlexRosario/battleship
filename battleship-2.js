var rs = require('readline-sync');



// Accessing console module
const console = require('console');
const { Console } = require('console');


let board = {};
let size = 10;

function createGrid(size) {
  const grid = {};
  for (let i = 1; i <= size; i++) {
    const row = String.fromCharCode(i+ 64);
    grid[row] = {};
    for (let j = 1; j <= size; j++) {
        grid[row][j] = ''; // Set other columns to empty strings   
    }
  }
  return grid;
}


let arrayKeys = []; 
let arrayHitTracker= [];
let strike;

function placeShips(grid, size) {
  var ship1x, ship2x, ship1y, ship2y;

  do {
    ship1x = Math.ceil(Math.random() * size);
    ship2x = Math.ceil(Math.random() * size);
  } while (ship1x === ship2x);

  do {
    ship1y = String.fromCharCode(Math.ceil(Math.random() * size) + 64);
    ship2y = String.fromCharCode(Math.ceil(Math.random() * size) + 64);
  } while (ship1y === ship2y);

  grid[ship1y][ship1x] = '1';
  grid[ship2y][ship2x] = '2';
}

  function checkCoordinates(grid, strike){

    const row = strike[0];
    const col = parseInt(strike.substring(1));

    if ( grid[row][col] == 0) {
        console.log('You missed!') 
        grid[row][col]='/';
      } else if ( grid[row][col] === '1'||  grid[row][col] === '2'){  
          arrayHitTracker = arrayHitTracker.map(item => (item === grid[row][col] ? '' : item));
          grid[row][col]='*';
       
          if(arrayHitTracker.includes('1')|| arrayHitTracker.includes('2')){
            console.log('You have sunk a battleship. 1 ship remaining!');
          } else {console.log('You have sunk both battleships!'); }
      
      } else if ( grid[row][col] == '/' ||  grid[row][col] == '*') {
          console.log('You have already picked this location. Miss!')
      
      } else if (col > size){
        console.log('Not a valid coordinate.')
       }
       console.table(grid);
      } 


  function validateCoordinates(val) {
    
    for( var i = 0;i <= arrayKeys.length-1;i++){
      if (arrayKeys[i] == val ){
      return true;
        
      } else if (i == arrayKeys.length-1){
        console.log('Invalid input. Please try again.');
        return false;
      }
    }

  }
   

do{
  rs.keyInPause('Press any key to start the game');
  board = createGrid(size);
  placeShips(board, size);
    
  arrayHitTracker = Object.values(board).map(obj => Object.values(obj)).flat();
  arrayKeys = Object.keys(board).flat(); 
  console.log(arrayKeys);  
  
  console.table(board);
 

  while(arrayHitTracker.includes('1')|| arrayHitTracker.includes('2')){
  console.log('Enter a location to strike ie "A2"');
  
  do{
    strike = rs.prompt().toUpperCase();
    var check = validateCoordinates(strike[0]); 
   
  } while (check == false);
    checkCoordinates(board, strike);
    
  }

}while (rs.keyInYN('Do you want to play again?')); 
