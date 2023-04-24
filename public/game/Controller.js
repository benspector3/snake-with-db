import { KEY } from "./constants.js";

export default class Controller {

  constructor(snake) {
    this.snake = snake;
    this.xDown = null;
    this.yDown = null;
  }

  start() {
    document.body.addEventListener('keydown', (e) => this.setNextDirection(e));
    document.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    document.addEventListener('touchmove', (e) => this.handleTouchMove(e));
  }

  stop() {
    document.body.removeEventListener('keydown', this.setNextDirection);
    document.removeEventListener('touchstart', this.handleTouchStart);
    document.removeEventListener('touchmove', this.handleTouchMove);
  }
  
  
  /* Touch Controls */
  handleTouchStart(evt) {                               
    this.xDown = evt.touches[0].clientX;                                      
    this.yDown = evt.touches[0].clientY;                                      
  }                                               
  
  handleTouchMove(evt) {                             
    if ( ! this.xDown || ! this.yDown ) {
      return;
    }
    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;
    
    var xDiff = this.xDown - xUp;
    var yDiff = this.yDown - yUp;
    
    /* choose the most significant */
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
      if (this.snake.head.direction !== "left" && this.snake.head.direction !== "right") {
        this.snake.head.nextDirection = xDiff > 0 ? "left" : "right";
      }
    }
    else {
      if (this.snake.head.direction !== "up" && this.snake.head.direction !== "down") {
        this.snake.head.nextDirection = yDiff > 0 ? "up" : "down";
      }
    }
    
    /* reset values */
    this.xDown = null;
    this.yDown = null;                                             
  }
  
  /* Triggered when keybord input is detected. Sets the snake head's nextDirection
  * property when an arrow key is pressed. Only perpendicular movement is allowed
  */
  setNextDirection(event) {
    let keyPressed = event.which;
    
    /* only set the next direction if it is perpendicular to the current direction */
    if (this.snake.head.direction !== "left" && this.snake.head.direction !== "right") {
      if (keyPressed === KEY.LEFT) { this.snake.head.nextDirection = "left"; }
      if (keyPressed === KEY.RIGHT) { this.snake.head.nextDirection = "right"; }
    }
    
    if (this.snake.head.direction !== "up" && this.snake.head.direction !== "down") {
      if (keyPressed === KEY.UP) { this.snake.head.nextDirection = "up"; }
      if (keyPressed === KEY.DOWN) { this.snake.head.nextDirection = "down"; }
    }
  }
}