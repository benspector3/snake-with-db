import { SQUARE_SIZE } from './constants.js';

const gameContainer = document.querySelector("#game");
const board = document.querySelector('#board');
const scoreElement = document.querySelector('#score');
const highscoresList = document.querySelector('#highscores-list');
const instructions = document.querySelector('#instructions');
const usernameForm = document.querySelector('#username-form');
const usernameInput = document.querySelector('#username-input');

/* Given a gameSquare (which may be a snakeSquare or the apple), update that
 * game Square's row and column properties and then position the gameSquare on the
 * screen. 
 */
export const repositionSquare = (square, row, column) => {  
  // update the row and column properties on the square Object
  square.row = row;
  square.column = column;

  // position the square on the screen according to the row and column
  const leftOffset = (column-1) * SQUARE_SIZE + "%";
  const topOffset = (row-1) * SQUARE_SIZE + "%";
  square.style.left = leftOffset;
  square.style.top = topOffset;
}

export const removeAllChildElements = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export const toggleInstructionsAndGameContainer = () => {
  if (instructions.style.display === 'none') {
    instructions.style.display = 'initial';
    gameContainer.style.display = 'none';
  } else {
    instructions.style.display = 'none';
    gameContainer.style.display = 'flex';
  }
}

export const resetScoreElement = () => {
  scoreElement.innerHTML = "Score: 0";
}

export const updateScore = (newScore) => {
  scoreElement.innerHTML = "Score: " + newScore;
}

export const getOptionsWithBody = (method, body='') => {
  return {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  }
}

export const  submitScore = async (userId, score) => {
  await fetch(`/api/users/${userId}/scores`, getOptionsWithBody('POST', { points: score }));
  
  const response = await fetch(`/api/users/${userId}/scores`);
  const myScores = await response.json();

  highscoresList.innerHTML = '';
  myScores.forEach(({ score, date }) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${date}</span><span>${score}</span>`
    highscoresList.append(li);
  });
}

export const domUtils = {
  removeAllChildElements,
  repositionSquare,
  toggleInstructionsAndGameContainer
}

export const fetchUtils = {
  getOptionsWithBody
}