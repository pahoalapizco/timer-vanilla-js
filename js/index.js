const spanHours = document.getElementById("hours");
const spanMinutes = document.getElementById("minuts");
const spanSeconds = document.getElementById("seconds");
const milisecondsSpan = document.getElementById("miliseconds");
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');

let timeInterval;
let hoursValue = 0,
    minutesValue = 0
    secondsValue = 0;
    milisecondsValue = 0;

let play = true;
let newPlay = true;

const format = (value) => ('0'+value).slice(-2);
const reset = () => {  
  if(newPlay) {
    hoursValue = 0,
    minutesValue = 0
    secondsValue = 0;
    milisecondsValue = 0;
  
    spanHours.textContent = '00';
    spanMinutes.textContent = '00';
    spanSeconds.textContent = '00';
    milisecondsSpan.textContent = '00';
  }
};

const clearTimerInterval = () => {
  if(timeInterval) {
    clearInterval(timeInterval);
  }
}

const start = () => {
  timeInterval = setInterval(() => {
    milisecondsValue++;
    milisecondsSpan.textContent = format(milisecondsValue);
    
    if(milisecondsValue === 60) {
      milisecondsValue = 0;
      secondsValue++;
      spanSeconds.textContent = format(secondsValue);
    }

    if(secondsValue === 60) {
      secondsValue = 0;
      minutesValue++;
      spanMinutes.textContent = format(minutesValue);
    }
    if(minutesValue === 60) {
      minutesValue = 0;
      hoursValue++,
      spanHours.textContent = format(hoursValue);
    }
  }, 100);
}
const removeAddClasses = (showPlay = true) => {
  if(showPlay) {
    playButton.classList.remove('timer--button__hiden');
    pauseButton.classList.add('timer--button__hiden');
  } else {
    playButton.classList.add('timer--button__hiden');
    pauseButton.classList.remove('timer--button__hiden');
  }
}

const onClickPlayPause = () => {
  if(play) {
    reset();
    start();
  } else {
    clearTimerInterval();
    newPlay = false;
  }
  play = !play;
  removeAddClasses(play);
}

const onClickStop = () => {
  removeAddClasses(true);
  reset();
  clearTimerInterval();
  newPlay = true;
}

const onClickRestart = () => {
  removeAddClasses(false);
  clearTimerInterval();
  reset();
  start();
}