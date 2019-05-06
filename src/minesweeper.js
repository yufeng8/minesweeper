class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }

  playMove(rowIndex, columnIndex) {
    this._board.flipTile(rowIndex, columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('The game is over!');
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
      console.log('Congratulations!');
    } else {
      console.log("Current Board: ");
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    //this._numberOfRows = numberOfRows;
    //this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows*numberOfColumns;
    this._playerBoard = Board.generatePlayBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfColumns);
  }


  get playerBoard() {
    return this._playerBoard;
  }

  flipTile(rowIndex, columnIndex) {
    if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
      console.log('This title has already been flipped!');
      return
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    let offsets = [];
    for (let i=-1; i<=1; i++) {
      for (let j=-1; j<=1; j++) {
        if (!(i == 0 && j == 0))
          offsets.push([i,j]);
      }
    }

    let numBombs = 0;
    offsets.forEach(([i,j]) => {
      let r = rowIndex + i;
      let c = columnIndex + j;
      if (r >= 0 && r < this._bombBoard.length
          && c >= 0 && c < this._bombBoard[0].length
          && this._bombBoard[r][c] === 'B')
        numBombs++;
    });

    return numBombs;
  }

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayBoard(numberOfRows, numberOfColumns) {
    var board = [];
    for (let i = 0; i < numberOfRows; i++) {
      var row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(' ');
      }
      board.push(row);
    }
    return board;
  }

  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    var board = [];
    for (let i = 0; i < numberOfRows; i++) {
      var row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        row.push(null);
      }
      board.push(row);
    }

    // while loop has the potential to place bombs on top of already existing bombs, this can be fixed using control flow;
    var numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random(0,1)*numberOfRows);
      let randomColumnIndex = Math.floor(Math.random(0,1)*numberOfColumns);
      if (board[randomRowIndex][randomColumnIndex] !== "B") {
        board[randomRowIndex][randomColumnIndex] = "B";
        numberOfBombsPlaced++;
      }
    }

    return board;
  }
}

const g = new Game(3,3,3);
g.playMove(1,2);









/*const generatePlayBoard = (numberOfRows, numberOfColumns) => {
  var board = [];
  for (let i = 0; i < numberOfRows; i++) {
    var row = [];
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(' ');
    }
    board.push(row);
  }
  return board;
}

console.log(generatePlayBoard(3,3));

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  var board = [];
  for (let i = 0; i < numberOfRows; i++) {
    var row = [];
    for (let j = 0; j < numberOfColumns; j++) {
      row.push(null);
    }
    board.push(row);
  }

  // while loop has the potential to place bombs on top of already existing bombs, this can be fixed using control flow;
  var numberOfBombsPlaced = 0;
  while (numberOfBombsPlaced < numberOfBombs) {
    let randomRowIndex = Math.floor(Math.random(0,1)*numberOfRows);
    let randomColumnIndex = Math.floor(Math.random(0,1)*numberOfColumns);
    if (board[randomRowIndex][randomColumnIndex] !== "B") {
      board[randomRowIndex][randomColumnIndex] = "B";
      numberOfBombsPlaced++;
    }
  }

  return board;
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  let offsets = [];
  for (let i=-1; i<=1; i++) {
    for (let j=-1; j<=1; j++) {
      if (!(i == 0 && j == 0))
        offsets.push([i,j]);
    }
  }

  let numBombs = 0;
  offsets.forEach(([i,j]) => {
    let r = rowIndex + i;
    let c = columnIndex + j;
    if (r >= 0 && r < bombBoard.length
        && c >= 0 && c < bombBoard[0].length
        && bombBoard[r][c] === 'B')
      numBombs++;
  });

  return numBombs;
}*/

/*const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  let numBombs = 0;
  for (let i=-1; i<=1; i++) {
    for (let j=-1; j<=1; j++) {
      let r = rowIndex + i;
      let c = columnIndex + j;

      if ((i == 0 && j == 0)
          || r < 0 || r >= bombBoard.length
          || c < 0 || c >= bombBoard[0].length)
        continue;

      if (bombBoard[r][c] == 'B')
        numBombs++;
    }
  }

  return numBombs;
}*/

/*const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This title has already been flipped!');
    return
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

const printBoard = (board) => {
  console.log(board.map(row => row.join(' | ')).join('\n'));
};

var playerBoard = generatePlayBoard(3,4);
var bombBoard = generateBombBoard(3,4,5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 1, 1);
console.log('Updated Player Board: ');
printBoard(playerBoard);
*/
