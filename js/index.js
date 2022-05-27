/* Button actions */

const btnChronometer = document.getElementById("time-chronometer");
const btnTimer = document.getElementById("time-timer");
const btnPomodoro = document.getElementById("time-pomodoro");
const maintTittle = document.getElementById("timer-tittle");

const onClickChronometer = () => {
  btnChronometer.classList.add('active');
  btnTimer.classList.remove('active');
  btnPomodoro.classList.remove('active');

  maintTittle.innerText = "Chronometer";
}

const onClickTimer = () => {
  btnTimer.classList.add('active');
  btnChronometer.classList.remove('active');
  btnPomodoro.classList.remove('active');

  maintTittle.innerText = "Timer";
}

const onClickPomodoro = () => {
  btnPomodoro.classList.add('active');
  btnTimer.classList.remove('active');
  btnChronometer.classList.remove('active');

  maintTittle.innerText = "Pomodoro";
}