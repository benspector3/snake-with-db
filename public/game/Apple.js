import { repositionSquare } from "./utils.js";

class Apple {
  static createApple(randomPosition) {
    const apple = document.createElement('div')
    apple.setAttribute('id', 'apple')
    board.appendChild(apple);

    // get a random available position on the board and position the apple
    repositionSquare(apple, randomPosition.row, randomPosition.column);
    return apple;
  }
}

export default Apple;