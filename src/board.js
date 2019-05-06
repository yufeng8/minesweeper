export class Board {
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
