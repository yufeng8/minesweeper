'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    //this._numberOfRows = numberOfRows;
    //this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfColumns);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This title has already been flipped!');
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
      this._numberOfTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var offsets = [];
      for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
          if (!(i == 0 && j == 0)) offsets.push([i, j]);
        }
      }

      var numBombs = 0;
      offsets.forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            i = _ref2[0],
            j = _ref2[1];

        var r = rowIndex + i;
        var c = columnIndex + j;
        if (r >= 0 && r < _this._bombBoard.length && c >= 0 && c < _this._bombBoard[0].length && _this._bombBoard[r][c] === 'B') numBombs++;
      });

      return numBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this._numberOfBombs;
    }
  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayBoard',
    value: function generatePlayBoard(numberOfRows, numberOfColumns) {
      var board = [];
      for (var i = 0; i < numberOfRows; i++) {
        var row = [];
        for (var j = 0; j < numberOfColumns; j++) {
          row.push(' ');
        }
        board.push(row);
      }
      return board;
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var board = [];
      for (var i = 0; i < numberOfRows; i++) {
        var row = [];
        for (var j = 0; j < numberOfColumns; j++) {
          row.push(null);
        }
        board.push(row);
      }

      // while loop has the potential to place bombs on top of already existing bombs, this can be fixed using control flow;
      var numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        var randomRowIndex = Math.floor(Math.random(0, 1) * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random(0, 1) * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== "B") {
          board[randomRowIndex][randomColumnIndex] = "B";
          numberOfBombsPlaced++;
        }
      }

      return board;
    }
  }]);

  return Board;
}();