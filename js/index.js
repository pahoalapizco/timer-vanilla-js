/* Button actions */
const btnChronometer = document.getElementById("time-chronometer");
const btnTimer = document.getElementById("time-timer");
const btnPomodoro = document.getElementById("time-pomodoro");
const maintTittle = document.getElementById("timer-tittle");
const container = document.getElementById("timer--container");

// Chronometer
let spanHours = document.getElementById("hours");
let spanMinutes = document.getElementById("minuts");
let spanSeconds = document.getElementById("seconds");
let milisecondsSpan = document.getElementById("miliseconds");
let playButton = document.getElementById('play-button');
let pauseButton = document.getElementById('pause-button');

let timeInterval;
let hoursValue = 0,
    minutesValue = 0
    secondsValue = 0;
    milisecondsValue = 0;

let play = true;
let newPlay = true;

let interval = 100;
// Reverse trimer
let revHours = 0,
    revMinuts = 1;
    revSeconds = 18;

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
const cbChronometerInterval = () => {
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
}
const start = (cb) => {
  timeInterval = setInterval(cb, interval);
}

const startTimer = () => {
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
    start(cbChronometerInterval, 100);
    newPlay = true;
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
  start(cbChronometerInterval, 100);
}

const resetItems = () => {
  // Chronometer  
  spanHours = document.getElementById("hours");
  spanMinutes = document.getElementById("minuts");
  spanSeconds = document.getElementById("seconds");
  milisecondsSpan = document.getElementById("miliseconds");
  playButton = document.getElementById('play-button');
  pauseButton = document.getElementById('pause-button');
  onClickStop();
}

const onClickChronometer = () => {
  btnChronometer.classList.add('active');
  btnTimer.classList.remove('active');
  btnPomodoro.classList.remove('active');
  interval = 100;
  // Esto solo es por practicar y aprender JS Vanilla (PD. No es una goodpractice >.<)
  container.innerHTML = `
    <h1>Chronometer</h1>
    <p class="timer">
      <span id="hours">00</span>:<span id="minuts">00</span>:<span id="seconds">00</span><span id="miliseconds">00</span>
    </p>

    <section class="timer-buttons--container">
      <button id="pause-button" class="timer--button timer--button__hiden" onclick="onClickPlayPause()"> 
        <span> <i id="play-pause" class="fa-solid fa-pause"></i> </span>
      </button>

      <button id="play-button" class="timer--button" onclick="onClickPlayPause()"> 
        <span> <i id="play-pause" class="fa-solid fa-play"></i> </span>
      </button>

      <button class="timer--button" onclick="onClickStop()"> 
        <span> <i class="fa-solid fa-stop"></i> </span>
      </button>

      <button class="timer--button" onclick="onClickRestart()"> 
        <span> <i class="fa-solid fa-arrow-rotate-left"></i> </span>
      </button>
    </section>
  `;
  resetItems();
}

const onClickTimer = () => {
  btnTimer.classList.add('active');
  btnChronometer.classList.remove('active');
  btnPomodoro.classList.remove('active');
  interval = 1000;

  container.innerHTML = `
    <h1>Timer</h1>
    <p class="timer">
      <span id="hours">00</span>:<span id="minuts">00</span>:<span id="seconds">00</span>
    </p>

    <section class="timer-buttons--container">
      <button id="pause-button" class="timer--button timer--button__hiden" onclick="onClickPlayPause()"> 
        <span> <i id="play-pause" class="fa-solid fa-pause"></i> </span>
      </button>

      <button id="play-button" class="timer--button" onclick="onClickPlayPause()"> 
        <span> <i id="play-pause" class="fa-solid fa-play"></i> </span>
      </button>

      <button class="timer--button" onclick="onClickStop()"> 
        <span> <i class="fa-solid fa-stop"></i> </span>
      </button>

      <button class="timer--button" onclick="onClickRestart()"> 
        <span> <i class="fa-solid fa-arrow-rotate-left"></i> </span>
      </button>
    </section>
  `;
  resetItems();
}

const onClickPomodoro = () => {
  btnPomodoro.classList.add('active');
  btnTimer.classList.remove('active');
  btnChronometer.classList.remove('active');

}