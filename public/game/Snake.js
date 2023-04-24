import { repositionSquare } from "./utils.js";
import { STARTING_COLUMN, STARTING_ROW } from "./constants.js";

class Snake {
  constructor(board) {
    this.board = board;
    this.body = [];
    this.head = this.grow(STARTING_ROW, STARTING_COLUMN);
    this.head.setAttribute('id', 'snake-head');
  }

  grow(row, column) {
    // make the snakeSquare jQuery Object and append it to the board
    let snakeSquare = document.createElement('div');
    snakeSquare.setAttribute('class', 'snakeSquare');
    this.board.appendChild(snakeSquare);
  
    // set the position of the snake on the screen
    repositionSquare(snakeSquare, row, column);
    
    // add snakeSquare to the end of the body Array and set it as the new tail
    this.body.push(snakeSquare);
    this.tail = snakeSquare;
    
    return snakeSquare;
  }

  move() {
    this.head.movingID = (this.head.movingID || 0 ) + 1
    // starting at the tail, each snakeSquare moves to the (row, column) position
    // of the snakeSquare that comes before it. The head is moved separately
    for (let i = this.body.length - 1; i >= 1; i--) {
      let snakeSquare = this.body[i];
      let nextSnakeSquare = this.body[i - 1];
  
      snakeSquare.direction = nextSnakeSquare.direction;
  
      repositionSquare(snakeSquare, nextSnakeSquare.row, nextSnakeSquare.column);
    }
    
    /* this.snake.head.nextDirection is set using keyboard input and only changes if the
    next direction is perpendicular to this.snake.head.direction. This prevents the 
    this.snake from turning back on itself if multiple commands are issued before the
    next udpate.
    
    this.snake.head.direction is then only set once at the moment the this.snake is prepared
    to move forward
    */
    this.head.direction = this.head.nextDirection;
    if (this.head.direction === "left") { this.head.column--; }
    else if (this.head.direction === "right") { this.head.column++; }
    else if (this.head.direction === "up") { this.head.row--; }
    else if (this.head.direction === "down") { this.head.row++; }
    
    repositionSquare(this.head, this.head.row, this.head.column);
  }
}

export default Snake;