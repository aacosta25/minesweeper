class Game{
	constructor(numberOfRows,numberOfColumns,numberOfBombs){
		this._board = new Board(numberOfRows,numberOfColumns,numberOfBombs);

	}

	playMove(rowIndex,columnIndex){
		this._board.flipTile(rowIndex,columnIndex);

		if(this._board.playerBoard[rowIndex][columnIndex] === 'B'){
			console.log('The game is over!');
			this._board.print();
		} else if (this._board.hasSafeTiles()){
			console.log("Congratulations, You've won!");
		} else{
			console.log("Current Board:");
			this._board.print();
		}
	}

}//end Game class 


class Board{
	constructor(numberOfRows, numberOfColumns,numberOfBombs){
		this._numberOfRows = numberOfRows;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns,numberOfBombs);

	}

	get playerBoard(){
		return this._playerBoard;
	}


	flipTile(rowIndex, columnIndex){

		if(this._playerBoard[rowIndex][columnIndex] !== ' '){
			console.log('This tile has already been flipped!');
			return;
		} else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
			this._playerBoard[rowIndex][columnIndex] = 'B';
		}else {
			this._playerBoard[rowIndex][columnIndex] === this.getNumberOfNeighborBombs(rowIndex,columnIndex);
		}

		this._numberOfTiles--;
	};//end flipTile 


	getNumberOfNeighborBombs(rowIndex,columnIndex){

		const neighborOffsets = [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]];
		const numberOfRows = this._bombBoard.length;
		const numberOfColumns = this._bombBoard[0].length;

		let numberOfBombs = 0;

		neighborOffsets.forEach(offset =>{

			const neighborRowIndex = this._rowIndex + this._offset[0];
			const neighborColumnIndex = this._columnIndex + this._offset[1];

			if (this._neighborRowIndex >= 0 && this._neighborRowIndex < this._numberOfRows && this._neighborColumnIndex >= 0 && this._neighborColumnIndex < this._numberOfColumns){
				if(this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B'){
					this._numberOfBombs++;
				}
			}
		} );// end neighborOffsets 

		return this._numberOfBombs;

	};//end getNumberOfNeighborBombs 


	hasSafeTiles(){
		return (this._numberOfTiles !== this._numberOfBombs);
	}

	print(board){
		console.log(this._board.map(row => this._row.join(' | ')).join('\n'));


	};//end print 


	static generatePlayerBoard(numberOfRows,numberOfColumns){
		let board = [];

		for (let i = 0; i < numberOfRows; i++) {
			let row = [];
			for(let j = 0; j < numberOfColumns; j++){
				row.push(' ');
			};
			board.push(row);
			
		};
		return board;

	};//end generatePlayerBoard 


	static generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs){
		let board = [];

			for (let i = 0; i < numberOfRows; i++) {
				let row = [];
				for(let j = 0; j < numberOfColumns; j++){
					row.push(null);
				};
				board.push(row);
				
			};

		let numberOfBombsPlaced = 0;

			while(numberOfBombsPlaced < numberOfBombs){
				//potential to place bombs on top of already existing bombs. This will be fixed when you learn about control flow.
				let randomRowIndex = Math.floor(Math.random() * numberOfRows) ;
				let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
				if(board[randomRowIndex][randomColumnIndex] !== 'B'){
					board[randomRowIndex][randomColumnIndex] = 'B';
				numberOfBombsPlaced++;
					
				}
				
			}
			return board;

	};//end generateBombBoard 


}//end board class 



/*let playerBoard = generatePlayerBoard(3,3);
let bombBoard = generateBombBoard(3,3,3);
console.log('Player Board: ');

printBoard(playerBoard);
console.log('Bomb Board:');

printBoard(bombBoard);

flipTile(playerBoard,bombBoard,0,0);
console.log('Updated Player Board:');
printBoard(playerBoard);*/

const g = new Game(3,3,3);
g.playMove(0,0);



