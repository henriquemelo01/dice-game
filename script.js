"use strict";

// Selecting Elements:
const score1El = document.querySelector("#score--0");
const score2El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const current1 = document.querySelector("#current--0");

// Loading Page (Reset):
const reset = function () {
  score1El.textContent = 0;
  score2El.textContent = 0;
  diceEl.classList.add("hidden");
};

// Game logic:
reset();

// Rolling dice:
btnRoll.addEventListener("click", function () {
  // Generate random dice roll
  const dice = Math.trunc(Math.random() * 6 + 1);
  console.log(dice);

  // Display dice roll:
  diceEl.classList.remove("hidden");
  diceEl.src = `dice-${dice}.png`; // Setting atribute,using template literals
});
