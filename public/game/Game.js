import Snake from './Snake.js';
import Apple from './Apple.js';
import { ROWS, COLUMNS } from './constants.js';
import { 
  toggleInstructionsAndGameContainer,
  resetScoreElement,
  updateScore,
  removeAllChildElements,
  submitScore
} from './utils.js';
import Controller from './Controller.js'

class Game {
  constructor(userId) {
    this.score = 0;
    this.board = document.querySelector('#board');
    this.snake;
    this.apple;
    this.userId = userId;
    this.updateInterval;
    this.controller;
  }

  getRandomAvailablePosition() {
    let spaceIsAvailable;
    let randomPosition = {};
    
    /* Generate random positions until one is found that doesn't overlap with the snake */
    while (!spaceIsAvailable) {
      randomPosition.column = Math.ceil(Math.random() * COLUMNS);
      randomPosition.row = Math.ceil(Math.random() * ROWS);
      spaceIsAvailable = true;
      
      for (let i = 0; i < this.snake.body.length; i++) {
        let snakeSquare = this.snake.body[i];
        if (snakeSquare.row === randomPosition.row && snakeSquare.column === randomPosition.column) {
          spaceIsAvailable = false;
        }
      }
    }
    
    return randomPosition;
  }

  init() {
    toggleInstructionsAndGameContainer();
    
    // set this.score to 0
    resetScoreElement();
    this.score = 0;

    // initialize the this.snake's body and head
    this.snake = new Snake(this.board);
    
    // initialize the first this.apple
    this.apple = Apple.createApple(this.getRandomAvailablePosition());
    
    // start update interval
    this.updateInterval = setInterval(() => this.update(), 100);
    
    this.controller = new Controller(this.snake);
    this.controller.start();
  }

  update() {
    this.snake.move();
    
    if (this.hasCollidedWithApple()) {
      this.handleAppleCollision();
    }
    
    if (this.hasCollidedWithSnake() || this.hasHitWall()) {
      this.endGame();
    }
  }

  
  
  hasCollidedWithApple() {
    return this.snake.head.row === this.apple.row && this.snake.head.column === this.apple.column;
  }
  
  handleAppleCollision() {
    // increase the this.score and update the this.score DOM element
    this.score++;
    updateScore(this.score);
    
    // Remove existing Apple and create a new one
    this.apple.remove();
    this.apple = Apple.createApple(this.getRandomAvailablePosition());
    
    // calculate the location of the next snakeSquare based on the current
    // position and direction of the tail, then create the next snakeSquare
    let row = this.snake.tail.row;
    let column = this.snake.tail.column;
    if (this.snake.tail.direction === "left") { column++; }
    else if (this.snake.tail.direction === "right") { column--; }
    else if (this.snake.tail.direction === "up") { row++; }
    else if (this.snake.tail.direction === "down") { row--; }
    this.snake.grow(row, column);
  }
  
  hasCollidedWithSnake() {
    for (let i = 1; i < this.snake.body.length; i++) {
      if (this.snake.head.row === this.snake.body[i].row && this.snake.head.column === this.snake.body[i].column) {
        return true;
      }
    }
  }
  
  hasHitWall() {
    return this.snake.head.row > ROWS || this.snake.head.row < 1 || this.snake.head.column > COLUMNS || this.snake.head.column < 1;
  }
  
  async endGame() {
    // stop update function from running
    clearInterval(this.updateInterval);
    this.controller.stop();
  
    // clear board of all elements
    removeAllChildElements(this.board);
    
    await submitScore(this.userId, this.score);
    
    // restart the game after 500 ms
    setTimeout(() => toggleInstructionsAndGameContainer(), 500);
  }
}

export default Game;