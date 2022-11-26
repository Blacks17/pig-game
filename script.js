'use strict';
// Selecting elements
const player0el = document.querySelector('.player--0');
const player1el = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// // STARTING CONDITION
// // set the score to 0
// score0El.textContent = 0;
// score1El.textContent = 0;
// // hidden the dice
// diceEl.classList.add('hidden');
// // create an array for both score
// let scores = [0, 0];
// // set the current score
// let currentScore = 0;
// // set the active player
// let activePlayer = 0;
// // set the game finis or not
// let playing = true;

let scores, currentScore, activePlayer, playing;

const init = function () {
  // reset all the score
  diceEl.classList.add('hidden');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  // reset the player
  activePlayer = 0;
  // reset the current score
  currentScore = 0;
  // reset the scores array
  scores = [0, 0];
  // reset the playing status
  playing = true;

  // remove the winner
  player0el.classList.remove('player--winner');
  player1el.classList.remove('player--winner');

  // reset the effect active player
  if (!player0el.classList.contains('player--active')) {
    player0el.classList.add('player--active');
    player1el.classList.remove('player--active');
  }
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0el.classList.toggle('player--active');
  player1el.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    // 2. Display the dice
    diceEl.classList.remove('hidden');
    if (dice == 1) {
      diceEl.src = require(`./img/dice-1.png`);
    } else if (dice == 2) {
      diceEl.src = require(`./img/dice-2.png`);
    } else if (dice == 3) {
      diceEl.src = require(`./img/dice-3.png`);
    } else if (dice == 4) {
      diceEl.src = require(`./img/dice-4.png`);
    } else if (dice == 5) {
      diceEl.src = require(`./img/dice-5.png`);
    } else {
      diceEl.src = require(`./img/dice-6.png`);
    }

    // 3. Check for rolled 1
    if (dice !== 1) {
      // add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to the active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
