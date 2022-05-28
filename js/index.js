/* Button actions */
const btnChronometer = document.getElementById("time-chronometer");
const btnTimer = document.getElementById("time-timer");
const btnPomodoro = document.getElementById("time-pomodoro");
const maintTittle = document.getElementById("timer-tittle");
const container = document.getElementById("timer--container");

// Chronometer
let spanHours = document.getElementById("hours");
let spanMinutes = document.getElementById("minutes");
let spanSeconds = document.getElementById("seconds");
let milisecondsSpan = document.getElementById("miliseconds");
let playButton = document.getElementById('play-button');
let pauseButton = document.getElementById('pause-button');

// Timer
let inputHours = document.getElementById("inpHour");
let inputMinutes = document.getElementById("inpMinutes");
let inputSeconds = document.getElementById("inpSeconds");

let timeInterval;
let hoursValue = 0,
    minutesValue = 0
    secondsValue = 0;
    milisecondsValue = 0;

let play = true;
let newPlay = true;

let interval = 100;

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

    if(milisecondsSpan) {
      milisecondsSpan.textContent = '00';
    }
  }
};

const clearTimerInterval = () => {
  if(timeInterval) {
    clearInterval(timeInterval);
  }
}

const startChronometerInterval = () => {
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


const removeAddClasses = (showPlay = true) => {
  if(showPlay) {
    playButton.classList.remove('timer--button__hiden');
    pauseButton.classList.add('timer--button__hiden');
  } else {
    playButton.classList.add('timer--button__hiden');
    pauseButton.classList.remove('timer--button__hiden');
  }
}

const startTimerInterval = () => {
  secondsValue--;
  spanSeconds.textContent = secondsValue < 0 ? "59" : format(secondsValue);

  if(hoursValue === 0 && minutesValue === 0 && secondsValue === 0) {     
    play = true; 
    removeAddClasses(play);
    clearTimerInterval();
    return;
  }

  if(secondsValue < 0) {
    secondsValue = 59;
    minutesValue--;
    spanMinutes.textContent = format(minutesValue);
  }
  if(minutesValue < 0 && hoursValue > 0) {
    minutesValue = 59;
    hoursValue--,
    spanHours.textContent = format(hoursValue);
  }
}

const onClickPlayPause = () => {
  if(play) {
    reset();
    start(startChronometerInterval, 100);
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
  start(startChronometerInterval, 100);
}

const onClickPlayPauseTimer = () => {
  
  if(play) {
    reset();
    hoursValue = parseInt(inputHours.value) || 0;
    minutesValue = parseInt(inputMinutes.value) || 0;
    secondsValue = parseInt(inputSeconds.value) || 0;
    interval = 1000;

    if(hoursValue === 0 && minutesValue === 0 && secondsValue === 0) return;

    spanHours.textContent = format(hoursValue);
    spanMinutes.textContent = format(minutesValue);
    spanSeconds.textContent = format(secondsValue);

    start(startTimerInterval);
    newPlay = true;
  } else {
    clearTimerInterval();
    newPlay = false;
  }
  play = !play;
  removeAddClasses(play);
}

const resetItems = () => {
  // Chronometer 
  spanHours = document.getElementById("hours");
  spanMinutes = document.getElementById("minutes");
  spanSeconds = document.getElementById("seconds");
  milisecondsSpan = document.getElementById("miliseconds");
  playButton = document.getElementById('play-button');
  pauseButton = document.getElementById('pause-button');

  // Timer
  inputHours = document.getElementById("inpHour");
  inputMinutes = document.getElementById("inpMinutes");
  inputSeconds = document.getElementById("inpSeconds");

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
      <span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span><span id="miliseconds">00</span>
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
  <p class="timer"><span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span><span id="miliseconds" hidden>00</span>
  </p>

  <form class="timer--form" action="">
    <label for="inpHour"></label>
    <input type="number" name="hours" id="inpHour" placeholder="00" max="24" min="0">
    <span>:</span>
    <label for="inpMinutes"></label>
    <input type="number" name="minutes" id="inpMinutes" placeholder="00" max="60" min="0">
    <span>:</span>
    <label for="inpSeconds"></label>
    <input type="number" name="seconds" id="inpSeconds" placeholder="00" max="60" min="0">
  </form>

  <section class="timer-buttons--container">
    <button
      id="pause-button"
      class="timer--button timer--button__hiden"
      onclick="onClickPlayPauseTimer()"
    >
      <span> <i id="play-pause" class="fa-solid fa-pause"></i> </span>
    </button>

    <button
      id="play-button"
      class="timer--button"
      onclick="onClickPlayPauseTimer()"
    >
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