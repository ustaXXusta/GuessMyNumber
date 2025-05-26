"use strict";

const input = document.getElementById("inp");
const btn = document.getElementById("btn");
const agn = document.getElementById("agn");
const info = document.getElementById("info");
const hs = document.getElementById("hs");
const trial = document.getElementById("trial");
const main = document.querySelector(".main");

let number;
let trialCount = 0;
let highScore = 0;

const generateNumber = (max) => {
  number = Math.floor(Math.random() * max) + 1;
  console.log(`Generated number: ${number}`);
};

generateNumber(10);

const updateTrial = () => {
  const value = Number(input.value);
  if (value < 1 || value > 10 || isNaN(value)) {
    return false;
  }
  trialCount += 1;
  trial.textContent = trialCount;
  return true;
};

const updateHighScore = () => {
  if (highScore === 0 || trialCount < highScore) {
    highScore = trialCount;
    hs.textContent = highScore;
  }
};

const resetGame = () => {
  generateNumber(10);
  trialCount = 0;
  trial.textContent = "0";
  info.textContent = "Your Guess is...";
  input.value = "";
  main.style.background = "rgba(255, 255, 255, 0.05)";
  main.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.2)";
  main.classList.remove("shake");
};

const shakeMain = () => {
  main.classList.add("shake");
  setTimeout(() => main.classList.remove("shake"), 500);
};

btn.addEventListener("click", () => {
  const value = Number(input.value);

  if (!updateTrial() || isNaN(value)) {
    info.textContent = "Please enter a number between 1 and 10";
    main.style.background = "rgba(255, 0, 0, 0.2)";
    shakeMain();
    return;
  }

  if (value === number) {
    info.textContent = "Congrats! You guessed it!";
    main.style.background = "rgba(0, 255, 0, 0.2)";
    updateHighScore();
  } else if (value < number) {
    info.textContent = "Too low! Try a bigger number";
    main.style.background = "rgba(0, 0, 255, 0.2)";
  } else {
    info.textContent = "Too high! Try a smaller number";
    main.style.background = "rgba(255, 107, 107, 0.2)";
  }
});

agn.addEventListener("click", resetGame);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    btn.click();
  }
});