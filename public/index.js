/* global sessionStorage*/
import { 
  getOptionsWithBody,
} from "./game/utils.js";

import Game from './game/Game.js';

const usernameForm = document.querySelector('#username-form');
const usernameInput = document.querySelector('#username-input');

const handleUsernameFormSubmit = async (e) => {
  e.preventDefault();
  
  // See if a user exists with the provided username
  const username = usernameInput.value;
  const getUserResponse = await fetch(`/api/users/${username}`);
  let user = await getUserResponse.json();
  
  // If not, create one
  if (!user.id) {
    const createUserResponse = await fetch('/api/users', getOptionsWithBody('POST', {username}))
    user = await createUserResponse.json();
  }
  const game = new Game(user.id);
  game.init();
}

usernameForm.addEventListener('submit', handleUsernameFormSubmit);



                                                    
