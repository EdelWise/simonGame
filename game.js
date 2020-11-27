"use strict";

let gamePattern = [];
let userClickedPattern = [];
const buttonColours = [`red`, `blue`, `green`, `yellow`];
let Started = false;
let level = 0;

//whn key pressed start game
$("body").on("keydown", function (event) {
  if (event && Started === false) {
    nextSequence();
    Started = true;
  }
});

//sequence function computer generated
const nextSequence = function () {
  $("#level-title").text(`level ${level}`);

  //random numbers

  const randomNumber = Math.trunc(Math.random() * 3);
  const randomChosenColour = buttonColours[randomNumber];
  //reset
  userClickedPattern = [];

  // add random colour to arr
  gamePattern.push(randomChosenColour);
  console.log(gamePattern);

  //button animation
  $(`.${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  level += 1;
};

//user answer
$(".btn").on("click", function (event) {
  const userChosenColour = event.target.id;
  //add clicked button to arr
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  //   console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkUserAnswer(userClickedPattern.length - 1);
});

const checkUserAnswer = function (index) {
  if (gamePattern[index] === userClickedPattern[index]) {
    console.log("success!");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    } else {
    }
  } else {
    console.log("Wrong!");

    gamePattern = [];
    userClickedPattern = [];

    Started = false;
    level = 0;

    const failAudio = new Audio("sounds/wrong.mp3");
    failAudio.play();
    $("#level-title").text(`press any key to start again`);
  }
};

//play sound on click
const playSound = function (name) {
  //button sound
  const buttonSound = new Audio(`sounds/${name}.mp3`);
  buttonSound.play();
};

// clicked button animation
const animatePress = function (currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColour}`).removeClass("pressed");
  }, 200);
};

// console.log(userClickedPattern);
// console.log(gamePattern);
