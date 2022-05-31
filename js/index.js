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

// Pomodoro
let pomodoroCircles = document.getElementsByClassName("pomodoro--circle");
let pomodoroText = document.getElementById("pomodoro--text");
let totalTasks = 0,
    totalBreaks = 0;
const MAX_TASKS = 4,
      MAX_BREAKS = 3,
      TIME_TAKS = 25,
      TIME_BREAKS = 5;
let isTask = true,
    isBreak = false;

// Generic
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
  
    spanMinutes.textContent = '00';
    spanSeconds.textContent = '00';

    if(milisecondsSpan) {
      milisecondsSpan.textContent = '00';
    }

    if(spanHours) {
      spanHours.textContent = '00';
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

const taskCompleted = (compleate) => {
  const totalCircles = totalTasks + totalBreaks;
  if(compleate) {
    const position = totalCircles;
    pomodoroCircles[position].classList.add('pomodoro__completed');
  } else {
    for(let i = 0; i <= totalCircles; i++) {
      pomodoroCircles[i].classList.remove('pomodoro__completed');
    }
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

const startPomodoroInterval = () => {  
  secondsValue--;
  spanSeconds.textContent = secondsValue < 0 ? "59" : format(secondsValue);

  if(totalTasks === MAX_TASKS && totalBreaks === MAX_BREAKS) {     
    play = true; 
    removeAddClasses(play);
    clearTimerInterval();
    spanSeconds.textContent = "00"
    spanMinutes.textContent = "00"
    pomodoroText.innerText = "Well done, you finished! 🎊🔥";
    return;
  } else if(totalTasks === 0 && totalBreaks === 0) {
    taskCompleted(true);
  }

  if(secondsValue < 0) {
    secondsValue = 59;
    minutesValue--;
    spanMinutes.textContent = format(minutesValue);
  }

  if(minutesValue < 0) {
    if(isTask) {
      minutesValue = TIME_BREAKS;
      isTask = false;
      isBreak = true;
      totalTasks++;
      pomodoroText.innerText = "Take a break! 😴 ";
    } else if(isBreak) {
      minutesValue = TIME_TAKS;
      isTask = true;
      isBreak = false;
      totalBreaks++;
      pomodoroText.innerText = "Let's work 🚀";
    }    
    spanMinutes.textContent = format(minutesValue);
    taskCompleted(true);
  }
}

const onClickPlayPause = () => {
  if(play) {
    reset();
    start(startChronometerInterval);
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
  start(startChronometerInterval);
}

const onClickPlayPauseTimer = () => {  
  if(play) {
    reset();
    hoursValue = hoursValue || parseInt(inputHours.value) || 0;
    minutesValue = minutesValue || parseInt(inputMinutes.value) || 0;
    secondsValue = secondsValue || parseInt(inputSeconds.value) || 0;
    interval = 1000;

    if(hoursValue === 0 && minutesValue === 0 && secondsValue === 0) return;

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

const onClickPlayPausePomodoro = () => {
  if(play) {
    reset();
    minutesValue = TIME_TAKS;
    secondsValue = 0;
    interval = 1000;

    start(startPomodoroInterval);
    newPlay = true;
    pomodoroText.innerText = "Let's work 🚀";
  } else {
    pomodoroText.innerText = "";
    clearTimerInterval();
    newPlay = false;
  }
  play = !play;
  removeAddClasses(play);
}

const onClickCancelPomodoro = () => {
  removeAddClasses(play);
  clearTimerInterval();
  taskCompleted(false);
  pomodoroText.innerText = "";
  reset();
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

  // Pomodoro
  pomodoroCircles = document.getElementsByClassName("pomodoro--circle");
  pomodoroText = document.getElementById("pomodoro--text");
  totalTasks = 0,
  totalBreaks = 0;
  isTask = true,
  isBreak = false;

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
  clearTimerInterval();
}

const onClickTimer = () => {
  btnTimer.classList.add('active');
  btnChronometer.classList.remove('active');
  btnPomodoro.classList.remove('active');
  interval = 1000;

  container.innerHTML = `
  <h1>Timer</h1>
  <p class="timer"><span id="hours">00</span>:<span id="minutes">00</span>:<span id="seconds">00</span>
  </p>
  <form class="timer--form" action="">
    <label for="inpHour"></label>
    <input type="number" name="hours" id="inpHour" placeholder="00" max="24" min="0">
    <span>:</span>
    <label for="inpMinutes"></label>
    <input type="number" name="minutes" id="inpMinutes" placeholder="00" max="59" min="0">
    <span>:</span>
    <label for="inpSeconds"></label>
    <input type="number" name="seconds" id="inpSeconds" placeholder="00" max="59" min="0">
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
  </section>
  `;
  resetItems();
  clearTimerInterval();
}

const onClickPomodoro = () => {
  btnPomodoro.classList.add('active');
  btnTimer.classList.remove('active');
  btnChronometer.classList.remove('active');
  
  container.innerHTML = `
    <h1> Pomodoro </h1>
    <section class="pomodoro--counter">
      <div class="pomodoro--task pomodoro--circle"></div>
      <div class="pomodoro--break pomodoro--circle"></div>
      <div class="pomodoro--task pomodoro--circle"></div>
      <div class="pomodoro--break pomodoro--circle"></div>
      <div class="pomodoro--task pomodoro--circle"></div>
      <div class="pomodoro--break pomodoro--circle"></div>
      <div class="pomodoro--task pomodoro--circle"></div>
    </section>
    <p id="pomodoro--text"></p>

    <p class="timer"><span id="minutes">00</span>:<span id="seconds">00</span>
    </p>

    <section class="timer-buttons--container">
      <button
        id="pause-button"
        class="timer--button timer--button__hiden"
        onclick="onClickPlayPausePomodoro()"
      >
        <span> <i id="play-pause" class="fa-solid fa-pause"></i> </span>
      </button>

      <button
        id="play-button"
        class="timer--button"
        onclick="onClickPlayPausePomodoro()"
      >
        <span> <i id="play-pause" class="fa-solid fa-play"></i> </span>
      </button>

      <button class="timer--button" onclick="onClickStop()">
        <span> <i class="fa-solid fa-stop"></i> </span>
      </button>

      <button class="timer--button" onclick="onClickCancelPomodoro()">
        <span> <i id="play-pause" class="fa-solid fa-x"></i> </span>
      </button>

    </section>
  `
  resetItems();
  clearTimerInterval();
}