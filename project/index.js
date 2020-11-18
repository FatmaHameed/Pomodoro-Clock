'use strict';

// /**
//   In this week 's project you'll be making a Pomodoro Clock!
//   A user can specify how many minutes the timer should be set, and with a click on the play button it starts counting down!If the user wants to pause the timer, they can do so by clicking the pause button.

//   If the timer is running, the user can 't change the session length anymore
//   Use at least 3 functions
//   Display minutes and seconds
//   If the timer finishes the timer should be replaced by the message: Time 's up!
//  *
//  */

const play = document.querySelector('.fa-play');
const pause = document.getElementById('pause');
let stop;
// document.querySelector('.fa-stop');
// console.log(stop);

const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const timeControl = document.querySelector('p');
const timeUp = document.getElementById('time-up');
const timeDown = document.getElementById('time-down');

// store a references to a timer variables:

let startTimer;

// Set default time
let timeControlNo = 25;
timeControl.innerText = timeControlNo;

// Create an event listener and a function to call timer function (count down) every 1 seconds

function changePlayIcon() {
  play.classList.replace('fa-play', 'fa-stop');
}
function changeStopIconAndResetTime() {
  changePlayIcon();
  stop = document.querySelector('.fa-stop');
  stop.classList.replace('fa-stop', 'fa-play');
  minutes.innerText = timeControlNo;
  seconds.innerText = '00';
  timeControl.innerText = 25;
  pauseTimer();
  startTimer = undefined;
}

play.addEventListener('click', function start() {
  changePlayIcon();

  if (startTimer === undefined) {
    startTimer = setInterval(timer, 1000);
  } else {
    // Disable the play button while running
    // pauseTimer();
    changeStopIconAndResetTime();
  }
});

// Create an event listener and a function to pause count down every 1 seconds
pause.addEventListener('click', function pauseTime() {
  pauseTimer();
  startTimer = undefined;
  stop = document.querySelector('.fa-stop');
  stop.classList.replace('fa-stop', 'fa-play');
});

// Create a function to count down the timer

function timer() {
  // count down
  if (seconds.innerText != 0) {
    seconds.innerText--;
  } else if (minutes.innerText != 0 && seconds.innerText == 0) {
    seconds.innerText = 59;
    minutes.innerText--;
  }

  if (seconds.innerText <= 9) {
    seconds.innerText = '0' + seconds.innerText;
  }
  if (minutes.innerText == 0 && seconds.innerText == 0) {
    minutes.innerText = 'Time is up';
    seconds.innerText = '!';
    document.getElementById('colon').innerText = '';
    pauseTimer();
  }
}

// pause function to clear intervals
function pauseTimer() {
  clearInterval(startTimer);
}

// to increase or decrease the time
function setTimeUp() {
  if (startTimer === undefined) {
    minutes.innerText++;
    timeControlNo = minutes.innerText;
    timeControl.innerText = timeControlNo;
    if (timeControlNo <= 9) {
      return (timeControl.innerText = `0${timeControlNo}`);
    }
  }
}

timeUp.addEventListener('click', setTimeUp);

function setTimeDown() {
  if (startTimer === undefined) {
    minutes.innerText--;
    timeControlNo = minutes.innerText;
    timeControl.innerText = timeControlNo;
    if (timeControlNo <= 0) {
      timeControlNo = 0;
      timeControl.innerText = timeControlNo;
    }
    if (timeControlNo <= 9) {
      return (timeControl.innerText = `0${timeControlNo}`);
    }
  }
}

timeDown.addEventListener('click', setTimeDown);
