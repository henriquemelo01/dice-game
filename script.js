"use strict";

// Selecting Elements:
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const bntHold = document.querySelector(".btn--hold");
const btnNewGame = document.querySelector(".btn--new");
let scoreEl;
let currentEl;
let playerEl;
let score = 0;
let score1 = 0;
let score2 = 0;
let current = 0;
let current1 = 0;
let current2 = 0;
let hasHigher100 = false;

// Player Select Function
let player = "player1"; // Start
const selectPlayer = function (playerId) {
  playerEl = document.querySelector(`.player--${playerId}`);
  currentEl = document.querySelector(`#current--${playerId}`);
  scoreEl = document.querySelector(`#score--${playerId}`);
};

// Toggle player: Need refactoring
const togglePlayer = function () {
  if (player === "player1") {
    selectPlayer(0);
    playerEl.classList.remove("player--active");
    selectPlayer(1);
    playerEl.classList.add("player--active");
  } else if (player === "player2") {
    selectPlayer(1);
    playerEl.classList.remove("player--active");
    selectPlayer(0);
    playerEl.classList.add("player--active");
  }

  current = player === "player1" ? current1 : current2;
  currentEl.textContent = current;
  player = player === "player1" ? "player2" : "player1";
};

// Loading Page (Reset):
const reset = function () {
  current = 0;
  score1 = 0;
  score2 = 0;

  document.querySelector("#score--0").textContent = 0;
  document.querySelector("#score--1").textContent = 0;
  document.querySelector("#current--0").textContent = 0;
  document.querySelector("#current--1").textContent = 0;
  diceEl.classList.add("hidden");
  player = "player1";
  document.querySelector(".player--0").classList.add("player--active");
  document.querySelector(".player--1").classList.remove("player--active");
  const players = document.querySelectorAll(".player");
  players.forEach(function (player) {
    player.classList.remove("player--winner");
  });
  hasHigher100 = false;
};

// Game logic:
reset();

// Rolling dice:

btnRoll.addEventListener("click", function () {
  // Generate random dice roll
  if (hasHigher100 === false) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    // Display dice roll:
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`; // Setting atribute,using template literals

    // Display current number + score

    // Select: player section, score, current
    if (player === "player1") {
      selectPlayer(0);
      current1 += dice;
    } else if (player === "player2") {
      selectPlayer(1);
      current2 += dice;
    }

    if (dice !== 1) {
      current = player === "player1" ? current1 : current2;
      currentEl.textContent = current;
    } else if (dice === 1) {
      current1 = 0;
      current2 = 0;
      current = player === "player1" ? current1 : current2;
      currentEl.textContent = current;
      togglePlayer(); // player1
    }
  }
});

bntHold.addEventListener("click", function () {
  if (hasHigher100 === false) {
    if (player === "player1") {
      score1 += current1;
      scoreEl.textContent = score1;
      current1 = 0;
    } else if (player === "player2") {
      score2 += current2;
      scoreEl.textContent = score2;
      current2 = 0;
    }
    currentEl.textContent = 0;
  }

  hasHigher100 = score1 >= 100 || score2 >= 100 ? true : false;
  if (hasHigher100) {
    if (score1 > score2) {
      selectPlayer(0);
      playerEl.classList.add("player--winner");
    } else if (score2 > score1) {
      selectPlayer(1);
      playerEl.classList.add("player--winner");
    }
    currentEl.textContent = 0;
    diceEl.classList.add(".hide");
  } else {
    togglePlayer();
  }
});

btnNewGame.addEventListener("click", function () {
  reset();
});
