var rs = require('readline-sync');

const console = require('console');
const { Console } = require('console');


let board = {
  'A': { 1: '', 2: '', 3: '' },
  'B': { 1: '', 2: '', 3: '' },
  'C': { 1: '', 2: '', 3: '' },
};

let arrayK = [Object.keys(board)].flat(); 
let array= [];
let strike;

function placeShips(grid){
  var ship1x = Math.ceil(Math.random() * 3);
  
  do {
      var ship2x = Math.ceil(Math.random() * 3);
    } while (ship1x == ship2x);
    
  var ship1y =String.fromCharCode( Math.ceil(Math.random() * 3) + 64);
  var ship2y =String.fromCharCode( Math.ceil(Math.random() * 3) + 64);
  
  grid[ship1y][ship1x] = '1';
  grid[ship2y][ship2x] = '2';
  }


  function validateCoordinates(val) {
    for( var i = 0;i <= arrayK.length-1;i++){
      if (arrayK[i] == val ){
      return true;   
      } else if (i == arrayK.length-1){
        console.log('Invalid input. Please try again.');
        return false;
      }
    }
  }
   

  function checkCoordinates(grid, strike){

      if ( grid[strike[0]][strike[1]/1] == 0) {
        console.log('You missed!') 
        grid[strike[0]][strike[1]/1]='/';
    
      } else if ( grid[strike[0]][strike[1]/1] === '1'||  grid[strike[0]][strike[1]/1] === '2'){
          grid[strike[0]][strike[1]/1]='*';
          array = [Object.values(grid.A),Object.values(grid.B),Object.values(grid.C)].flat();
          
          if(array.includes('1')|| array.includes('2')){
            console.log('You have sunk a battleship. 1 ship remaining!');
          } else {console.log('You have sunk both battleships!'); }
      
      } else if ( grid[strike[0]][strike[1]/1] == '/' ||  grid[strike[0]][strike[1]/1] == '*') {
          console.log('You have already picked this location. Miss!')
      
      } else if ([strike[1]/1] > 3){
        console.log('Not a valid coordinate.')
       }
       console.table(grid);
      } 

do{
  rs.keyInPause('Press any key to start the game');
  board = {
    'A': { 1: '', 2: '', 3: '' },
    'B': { 1: '', 2: '', 3: '' },
    'C': { 1: '', 2: '', 3: '' },
  };
  placeShips(board);
  array = [Object.values(board.A),Object.values(board.B),Object.values(board.C)].flat();     
   
  console.table(board);
 

  while(array.includes('1')|| array.includes('2')){
  console.log('Enter a location to strike ie "A2"');
  
  do{
    strike = rs.prompt().toUpperCase();
    var check = validateCoordinates(strike[0]); 
   
  } while (check == false);
    checkCoordinates(board, strike);
    
  }

}while (rs.keyInYN('Do you want to play again?')); 

   